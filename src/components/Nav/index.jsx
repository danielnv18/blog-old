import React from 'react';
import Link from 'gatsby-link';
import "./style.scss";

const Nav = ({siteTitle}) => (
	<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
	  	<Link to="/" className="navbar-brand">{siteTitle}</Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fa fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
				<Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
				<Link to="/about" className="nav-link">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
);

export default Nav;
