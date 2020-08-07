import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { usePagination } from './Pagination.component.js';
import Paginator from "./Paginator.js";

function Products() {
  
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

  useEffect(() => {
    axios.get(`/products?page=${serverPage}&limit=40`).then((res) => {
      console.log(res.data.products.docs);
      setData(res.data.products.docs);
      setIsLoading(false);
    })
  }, [ serverPage]);

  useEffect(() => {
    setItemsList(data);
  }, [ data ]);

  const listProducts = pageItems.map((product) => {
    return (
      // <div className="media" key={product._id}>
      //   <img
      //     src="../../public/Gravatar-icon.png"
      //     alt="placeholder for image"
      //     className="mr-3"
      //   />
      //   <div className="media-body">
      //     <h5 className="mt-0">{product.name}</h5>
      //     <br />
      //     <h6 className="mt-0">{product.price}</h6>
      //     <p>{product.description}</p>
      //   </div>
      // </div>
      <div className="col-md-6 col-lg-4 col-xl-3">
        <div className="card text-center card-product">
          <div className="card-product__img">
            <img className="card-img" src="../../public/Gravatar-icon.png" alt="" />
            <ul className="card-product__imgOverlay">
              <li><button><i className="ti-search"></i></button></li>
              <li><button><i className="ti-shopping-cart"></i></button></li>
              <li><button><i className="ti-heart"></i></button></li>
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
