import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostTeaser from '../components/teaser';

const IndexPage = ({ data }) => (
  <Layout type="home">
    <div className="post-feed">
      {data.allMarkdownRemark.edges.map((post, index) => {
        return <PostTeaser key={index} post={post.node} />;
      })}
    </div>
  </Layout>
);

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "article" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 280)
          timeToRead
          frontmatter {
            title
            category
            cover
            type
          }
        }
      }
    }
  }
`;

export default IndexPage;
