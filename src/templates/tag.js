import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostTeaser from '../components/teaser';

const TagTemplate = ({ data }) => {
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
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
export default TagTemplate;
