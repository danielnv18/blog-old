import React from 'react';
import Layout from '../components/layout';

const NotFoundPage = () => (
  <Layout type="page">
    <article className="post-full post page no-image">
      <header className="post-full-header">
        <h1 className="post-full-title">NOT FOUND</h1>
      </header>
      <section className="post-full-content">
        <div className="post-content">
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
      </section>
    </article>
  </Layout>
);

export default NotFoundPage;
