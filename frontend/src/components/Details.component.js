import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

function Products() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      // console.log(res.data);
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  const listProducts = data.map((product) => {
    return (
      <div className="media">
        <img
          src="../../public/Gravatar-icon.png"
          alt="placeholder for image"
          className="mr-3"
        />
        <div className="media-body">
          <h5 className="mt-0">{product.name}</h5>
          <br />
          <h6 className="mt-0">{product.price}</h6>
          <p>{product.description}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="justify-content-center">Main Products Page</h1>
      {isLoading && <ReactLoading type="bubbles" color="#444" />}
      {listProducts}
    </div>
  );
}

export default Products;
