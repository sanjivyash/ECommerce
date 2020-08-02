import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Footer() {
    return (
		<footer id="footer_main" className="page-footer font-small bg-primary pt-4">
			<div className="footer-area">
				<div className="container">
					<div className="row section_gap">
						<div className="col-lg-3 col-md-6 col-sm-6">
							<div className="single-footer-widget tp_widgets">
								<h4 className="footer_title large_title text-uppercase">Footer</h4>
								<p>
									Footer Contents Placeholder
								</p>
							</div>
						</div>
						<div className="offset-lg-1 col-lg-2 col-md-6 col-sm-6">
							<div className="single-footer-widget tp_widgets">
								<h4 className="footer_title">Quick Links</h4>
								<ul className="list">
									<li><a href="#">Home</a></li>
									<li><a href="#">Shop</a></li>
									<li><a href="#">Contact</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-6 col-sm-6">
							<div className="single-footer-widget instafeed">
								<h4 className="footer_title">Gallery</h4>
								<ul className="list instafeed d-flex flex-wrap">
									<li><img src="img/gallery/r1.jpg" alt="" /></li>
									<li><img src="img/gallery/r2.jpg" alt="" /></li>
									<li><img src="img/gallery/r3.jpg" alt="" /></li>
									<li><img src="img/gallery/r5.jpg" alt="" /></li>
									<li><img src="img/gallery/r7.jpg" alt="" /></li>
									<li><img src="img/gallery/r8.jpg" alt="" /></li>
								</ul>
							</div>
						</div>
						<div className="offset-lg-1 col-lg-3 col-md-6 col-sm-6">
							<div className="single-footer-widget tp_widgets">
								<h4 className="footer_title">Contact Us</h4>
								<div className="ml-40">
									<p className="sm-head">
										<span className="fa fa-location-arrow"></span>
										Head Office
									</p>
									<p>123, Main Street, Your City</p>
		
									<p className="sm-head">
										<span className="fa fa-phone"></span>
										Phone Number
									</p>
									<p>
										+123 456 7890 <br />
										+123 456 7890
									</p>
		
									<p className="sm-head">
										<span className="fa fa-envelope"></span>
										Email
									</p>
									<p>
										free@infoexample.com <br />
										www.infoexample.com
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
    );
}

export default Footer;