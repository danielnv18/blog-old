import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const PostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout type="post">
      <article className="post-full post">
        <header className="post-full-header">
          <section className="post-full-meta">
            <time className="post-full-meta-date" dateTime="2018-08-20">
              {post.frontmatter.date}
            </time>
            <span className="date-divider">/</span>{' '}
            <a href="/tag/getting-started/">{post.frontmatter.category}</a>
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
  }
`;
export default PostTemplate;
