import React from 'react';
import "./style.scss";

const Header = ({title, cover}) => (
	<header className="masthead" style={ { backgroundImage: `url(${cover})`}}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="site-heading">
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
);

export default Header;
