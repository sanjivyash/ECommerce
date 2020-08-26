import React, { useState, useEffect, useContext } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import { ReactLoading } from "react-loading";
import axios from "axios";
import { S3, WAFRegional } from "aws-sdk";
import { CartContext } from "../App";

export default function DetailsComponent(props) {
  const { state, dispatch } = useContext(CartContext);
  const Id = process.env.REACT_APP_ID;
  const secret = process.env.REACT_APP_SECRET;
  const BucketName = process.env.REACT_APP_BUCKET_NAME;

  const s3 = new S3({
    accessKeyId: Id,
    secretAccessKey: secret,
  });

  const location = useLocation();
  const [imagesB, setImagesB] = useState([]);
  const [product, SetProduct] = useState({});
  const [useless, setUseless] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [length, setLength] = useState(0);

  function handleLoading() {
    console.log("Image loaded");
    setLoaded(true);
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    async function getProduct() {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/product?productId=${searchParams.get(
          "productId"
        )}`
      );
      console.log(res.data);
      setLength(() => res.data.product.images.length);
      let imageBlocks = [];
      const images = res.data.product.images;

      const getImages = images.map(async (image) => {
        let params = {
          Bucket: BucketName,
          Key: image,
        };
        try {
          const data = await s3.getObject(params).promise();
          const buf = await Buffer.from(data.Body);
          const base64 = buf.toString("base64");
          return base64;
        } catch (err) {
          console.log(err);
        }
      });

      try {
        imageBlocks = await Promise.all(getImages);
        console.log("Resolved");
        console.log(imageBlocks);
        await setImagesB(imageBlocks);
        res.data.product.thumbnail =
          "data:/image/jpeg;base64," + res.data.product.thumbnail;
        await SetProduct(res.data.product);
      } catch (err) {
        console.log(err);
      }
    }
    (async () => {
      await getProduct();
    })();
  }, [location]);

  useEffect(() => {
    console.log(loaded, length);
    console.log(`ImagesB\n ${imagesB.toString()}`);
    setUseless((useless) => useless + 1);
  }, [loaded, length]);

  return (
    <div className="product_image_area">
      <div className="container">
        {!loaded && <div>Please Wait...</div>}
        <div className="row s_product_inner">
          <div className="col-lg-6">
            <div
              style={{ display: "block", overflow: "hidden" }}
              className="owl-carousel owl-theme s_Product_carousel"
            >
              {imagesB.map((base64) => (
                <div key={Date.now()} className="single-prd-item">
                  <img
                    className="img-fluid"
                    alt=""
                    src={`data:/image/jpeg;base64,${base64}`}
                    onLoad={handleLoading}
                    onError={() => console.log("Image not loaded")}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="s_product_text">
              <h3>{product.name}</h3>
              <h2>&#8377; {product.price}</h2>
              <ul className="list">
                <li>
                  <a className="active" href="#">
                    <span>Category</span> : Household
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Availibility</span> :{" "}
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </a>
                </li>
              </ul>
              <p>{product.description}</p>
              <a
                style={{ textDecoration: "none" }}
                className="button primary-btn"
                onClick={() => {
                  dispatch({
                    type: "increase",
                    payload: { ...product },
                  });
                }}
              >
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
