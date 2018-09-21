import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import PostTeaser from '../components/teaser';

const CategoryTemplate = ({ data, pageContext }) => {
  return (
    <Layout type="tag">
      <Helmet>
        <title>{`${pageContext.category} | ${
          data.site.siteMetadata.title
        }`}</title>
      </Helmet>
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
    site {
      siteMetadata {
        title
      }
    }
  }
`;
export default CategoryTemplate;
