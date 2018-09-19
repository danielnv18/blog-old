import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const PageTemplate = ({ data }) => (
  <Layout type="page">
    <article className="post-full post page no-image">
      <header className="post-full-header">
        <h1 className="post-full-title">{data.markdownRemark.frontmatter.title}</h1>
      </header>
      <section className="post-full-content">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>
      </section>
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default PageTemplate;
