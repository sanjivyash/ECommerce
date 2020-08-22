import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { S3 } from 'aws-sdk';

export default function DetailsComponent(props){
    

    const Id = process.env.REACT_APP_ID || 'AKIAITWLM2HH3ZTL7NWQ';
    const secret = process.env.REACT_APP_SECRET || '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';
    const BucketName = process.env.REACT_APP_BUCKET_NAME || 'p5enterprizes2020';

    const s3 = new S3({
        accessKeyId: Id,
        secretAccessKey: secret,
    });

    const match = useRouteMatch();
    const { params: {productId} } = match;
    const [product, SetProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let imageBlocks = [];

    useEffect(() => {
        console.log(productId);
        const result = axios.get(`/product?productId=${productId}`).then(async (res) => {
            console.log(res.data.product);
            const images = res.data.product.images;
            const getImages = images.map(async (image, index) => {
                let params = {
                    Bucket: BucketName,
                    Key: image,
                };
                try{
                    const data = await s3.getObject(params).promise();
                    const buf = await Buffer.from(data.Body);
                    const base64 = buf.toString('base64');
                    res.data.product.images[index] = base64;
                } catch(err){
                    console.log(err);
                }
            });
            await Promise.all(getImages);
            SetProduct(res.data.product);
            setIsLoading(false);
        });

    }, [ productId ]);

    useEffect(() => {
        if(product.images){
            imageBlocks = product.images.map((image) => {
                return (
                    <div key={product.productId}  className="single-prd-item">
                        <img className="img-fluid" alt="" src={`data:/image/jpeg;base64,` + image} />
                    </div>
                );
            });
        }
    }, [ ])

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