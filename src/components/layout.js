import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, Link } from 'gatsby';

import Header from './header';
import '../css/screen.css';

const Layout = ({ children, type }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
          <body className={`${type}-template`} />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} type={type} />
        <main className="site-main outer" id="site-main">
          <div className="inner">{children}</div>
        </main>
        <footer className="site-footer outer">
          <div className="site-footer-content inner">
            <section className="copyright">
              <Link to="/">{data.site.siteMetadata.title}</Link> © 2017 -{' '}
              {new Date().getFullYear()}
            </section>
            <nav className="site-footer-nav">
              <Link to="/">Latest Posts</Link>
              <Link
                to="https://www.github.com/danielnv18/"
                target="_blank"
                rel="noopener"
              >
                Github
              </Link>
              <Link
                to="https://twitter.com/danielnv18/"
                target="_blank"
                rel="noopener"
              >
                Twitter
              </Link>
            </nav>
          </div>
        </footer>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default Layout;
