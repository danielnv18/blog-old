import React from 'react';
import Navigation from './navigation';

const Header = ({ siteTitle, type }) => (
  <header
    className="site-header outer"
    style={
      type === 'post' || type === 'tag' || type === 'page'
        ? null
        : { backgroundImage: `url(/images/front.jpg)` }
    }
  >
    <div className="inner">
      {type === 'tag' ? <Navigation type={type} /> : null}
      {type === 'post' || type === 'page' ? null : (
        <div className="site-header-content">
          <h1 className="site-title">{siteTitle}</h1>
          <h2 className="site-description">Blog</h2>
        </div>
      )}
      {type === 'tag' ? null : <Navigation type={type} />}
    </div>
  </header>
);

export default Header;
