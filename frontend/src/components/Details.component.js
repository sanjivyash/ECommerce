import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { ReactLoading } from 'react-loading';
import axios from 'axios';
import { S3, WAFRegional } from 'aws-sdk';
import { CartContext } from '../App';

export default function DetailsComponent(props){

    const {state, dispatch} = useContext(CartContext);
    const Id = process.env.REACT_APP_ID ;
    const secret = process.env.REACT_APP_SECRET ;
    const BucketName = process.env.REACT_APP_BUCKET_NAME ;

    const s3 = new S3({
        accessKeyId: Id,
        secretAccessKey: secret,
    });

    const location = useLocation();
    const [imagesB, setImagesB] = useState([]);
    const [product, SetProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        async function getProduct(){
            const res = await axios.get(`http://localhost:5000/product?productId=${searchParams.get('productId')}`);
            console.log(res.data);

            let imageBlocks = [];
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
                    return(<div key={image} className="single-prd-item">
                        <img className="img-fluid" alt="" src={`data:/image/jpeg;base64,` + base64} />
                    </div>)
                } catch(err){
                    console.log(err);
                }
            });

            try{
                imageBlocks = await Promise.all(getImages);
                console.log(imageBlocks);
                await setImagesB(imageBlocks);
                await SetProduct(res.data.product);
                await setIsLoading(false);
            } catch(err){
                console.log(err);
            }
        }
        (async() => {
            await getProduct();
        })();
    }, [ location ]);
    

    return (
        <div className="product_image_area">
            <div className="container">
                {isLoading && (<div>Please Wait...</div>)}
                <div className="row s_product_inner">
                    <div className="col-lg-6">
                        <div className="owl-carousel owl-theme s_Product_carousel">
                            {!isLoading && imagesB}
                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                        <div className="s_product_text">
                            <h3>{product.name}</h3>
                            <h2>&#8377; {product.price}</h2>
                            <ul className="list">
                                <li><a className="active" href="#"><span>Category</span> : Household</a></li>
                                <li><a href="#"><span>Availibility</span> : {(product.quantity>0) ? 'In Stock' : 'Out of Stock' }</a></li>
                            </ul>
                            <p>{product.description}</p>
                            <a style={{textDecoration: "none"}} className="button primary-btn" onClick={() => {
                                dispatch({ type: "increase", payload: {
                                    productId: product.productId,
                                    price: product.price,
                                    description: product.description,
                                    name: product.name,
                                    quantity: product.quantity,
                                } });
                            }}>Add to Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}