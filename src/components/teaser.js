import React from 'react';
import { Link } from 'gatsby';

const PostTeaser = ({ post }) => (
  <article className="post-card post">
    <Link className="post-card-image-link" to={post.fields.slug}>
      <div
        className="post-card-image"
        style={{ backgroundImage: `url(${post.frontmatter.cover})` }}
      />
    </Link>
    <div className="post-card-content">
      <Link className="post-card-content-link" to={post.fields.slug}>
        <header className="post-card-header">
          <span className="post-card-tags">{post.frontmatter.category}</span>
          <h2 className="post-card-title">{post.frontmatter.title}</h2>
          <section className="post-card-excerpt">
            <p>{post.excerpt}</p>
          </section>
        </header>
      </Link>
    </div>
  </article>
);

export default PostTeaser;
