import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { S3 } from "aws-sdk";

export default function DetailsComponent(props) {
  const Id = process.env.REACT_APP_ID || "AKIAITWLM2HH3ZTL7NWQ";
  const secret =
    process.env.REACT_APP_SECRET || "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";
  const BucketName = process.env.REACT_APP_BUCKET_NAME || "p5enterprizes2020";

  //   const Id = process.env.REACT_APP_ID;
  //   const secret = process.env.REACT_APP_SECRET;
  //   const BucketName = process.env.REACT_APP_BUCKET_NAME;

  const s3 = new S3({
    accessKeyId: Id,
    secretAccessKey: secret,
  });

  const match = useRouteMatch();
  const {
    params: { productId },
  } = match;
  const [product, SetProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let imageBlocks = [];

  useEffect(() => {
    async function imageManip() {
      imageBlocks = [];

      console.log(productId);
      const result = await axios.get(
        `http://localhost:5000/product?productId=${productId}`
      );
      console.log(result.data);
      const images = result.data.product.images;
      const getImages = images.map(async (image, index) => {
        let params = {
          Bucket: BucketName,
          Key: image,
        };
        try {
          const data = await s3.getObject(params).promise();
          const buf = await Buffer.from(data.Body);
          const base64 = buf.toString("base64");
          return (
            <div key={index} className="single-prd-item">
              <img
                className="img-fluid"
                alt=""
                src={`data:/image/jpeg;base64,` + base64}
              />
            </div>
          );
        } catch (err) {
          console.log(err);
        }
      });
      imageBlocks = await Promise.all(getImages);
      SetProduct(result.data.product);
      setIsLoading(false);
    }
    imageManip();
  }, []);

  return (
    <div className="product_image_area">
      <div className="container">
        <div className="row s_product_inner">
          <div className="col-lg-6">
            <div className="owl-carousel owl-theme s_Product_carousel">
              {imageBlocks}
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="s_product_text">
              <h3>{product.name}</h3>
              <h2>{product.price}</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
