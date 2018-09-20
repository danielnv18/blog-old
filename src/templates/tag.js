import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import PostTeaser from '../components/teaser';

const TagTemplate = ({ data, pageContext }) => {
  return (
    <Layout type="tag">
      <Helmet>
        <title>{`${pageContext.tag} | ${data.site.siteMetadata.title}`}</title>
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
    site {
      siteMetadata {
        title
      }
    }
  }
`;
export default TagTemplate;
