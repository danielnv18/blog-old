import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostTeaser from '../components/teaser';

const CategoryTemplate = ({ data }) => {
  return (
    <Layout type="tag">
      <div className="post-feed">
        {data.allMarkdownRemark.edges.map((post, index) => {
          return <PostTeaser key={index} post={post.node} />;
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
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
          }
        }
      }
    }
  }
`;
export default CategoryTemplate;
