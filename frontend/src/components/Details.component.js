import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

function Products() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/products?page=1&limit=3").then((res) => {
      console.log(res.data);
      setData(res.data.products.docs);
      setIsLoading(false);
    });
  }, []);

  const listProducts = data.map((product) => {
    return (
      <div className="media" key={product._id}>
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
