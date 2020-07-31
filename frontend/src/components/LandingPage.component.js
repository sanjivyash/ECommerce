import React from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {

    return (
        <div>
            <div className="jumbotron">
                <h1 className="display-4"><b>Welcome to Our Website</b></h1>
                <p className="lead">This is a placeholder for the content. For more info, click the Info button below.</p>
                <hr className="my-4" />
                <p>For seeing the products page, click on the button below.</p>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <Link to="/products">
                                <button className="btn btn-primary btn-lg" >See Products</button>
                            </Link>
                        </div>
                        <div className="col-sm-3">
                            {'  '}
                            <Link to="/about">
                                <button className="btn btn-outline-info btn-lg">Learn More</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
