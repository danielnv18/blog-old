import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';

const PostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const site = data.site;
  const date = new Date(post.frontmatter.date);
  const locale = 'en-us';
  return (
    <Layout type="post">
      <Helmet>
        <title>{`${post.frontmatter.title} | ${
          site.siteMetadata.title
        }`}</title>
      </Helmet>
      <article className="post-full post">
        <header className="post-full-header">
          <section className="post-full-meta">
            <time
              className="post-full-meta-date"
              dateTime={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
            >
              {`${date.getDate()} ${date.toLocaleString(locale, {
                month: 'long',
              })} ${date.getFullYear()}`}
            </time>
            <span className="date-divider">/</span>{' '}
            <Link to={`/categories/${post.frontmatter.category}/`}>
              {post.frontmatter.category}
            </Link>
          </section>
          <h1 className="post-full-title">{post.frontmatter.title}</h1>
        </header>
        <figure
          className="post-full-image"
          style={{ backgroundImage: `url(${post.frontmatter.cover})` }}
        />
        <section className="post-full-content">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
        date
        cover
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
export default PostTemplate;
