import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { usePagination } from './Pagination.component.js';
import Paginator from "./Paginator.js";
import { CartContext } from "../App.js";
import { S3 } from 'aws-sdk';

function Products() {
  
  const Id = process.env.REACT_APP_ID || 'AKIAITWLM2HH3ZTL7NWQ';
  const secret = process.env.REACT_APP_SECRET || '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';
  const BucketName = process.env.REACT_APP_BUCKET_NAME || 'p5enterprizes2020';

  const s3 = new S3({
    accessKeyId: Id,
    secretAccessKey: secret,
  });

  const { state, dispatch } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const {
    setItemsList, 
    setCurrentPage,
    currentPage,
    totalPages,
    pageItems
  } = usePagination([], 4);
  const [data, setData] = useState([]);
  const [serverPage, setServerPage] = useState(1);

  // function getImage()

  useEffect(() => {
      const result = axios.get(`/products?page=${serverPage}&limit=40`).then((res) => {
          console.log(res.data.products.docs);
          res.data.products.docs.forEach(async (element) => {
            const data = await s3.getObject({
              Bucket: BucketName || 'p5enterprizes2020',
              Key: element.images[0],
            }).promise();
            let buf = await Buffer.from(data.Body);
            let base64 = await buf.toString('base64');
            element.images[0]="data:/image/jpeg;base64," + base64;
          });
          setData(res.data.products.docs);
          setIsLoading(false);
        }) 
  }, [ serverPage]);

  useEffect(() => {
    setItemsList(data);
  }, [ data ]);

  const listProducts = pageItems.map((product) => {
    return (
      <div  key={product.productId} className="col-md-6 col-lg-4 col-xl-3">
        <div className="card text-center card-product">
          <div className="card-product__img">
            <img className="card-img" src={product.images[0]} alt="" />
            <ul className="card-product__imgOverlay">
              <li><button><i className="ti-search"></i></button></li>
              <li><button onClick={() => {
                console.log(product.images[0]);
                dispatch({ type: "increase", payload: product });
              }}><i className="ti-shopping-cart"></i></button></li>
            </ul>
          </div>
          <div className="card-body">
            <p>{product.productId}</p>
            <h4 className="card-product__title">{product.name}</h4>
            <p className="card-product__price">{product.price}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className="section-margin calc-60px">
      <div className="container">
        <div className="section-intro pb-60px">
          <h2>Main <span className="section-intro__style">Product</span></h2>
        </div>
        {isLoading && <ReactLoading type="bubbles" color="#444" />}
        <div className="row">
          {listProducts}
        </div>
      </div>
      <div className="mx-auto" style={{ width: "200px" }}>
        <Paginator 
        totalPages={totalPages} 
        currentPage={currentPage}
        serverPage={serverPage}
        PageChangeHandler={setCurrentPage} 
        ServerPageHandler={setServerPage} /> 
      </div>
    </section>
  );
}

export default Products;
