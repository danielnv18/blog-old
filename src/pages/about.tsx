import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
  .certifications {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem;
    width: 100%;
  }
  .post-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 920px;
  }
  .events {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const About: React.FunctionComponent = () => {
  const { allCertificationYaml, allEventYaml, allPresentationYaml } = useStaticQuery(graphql`
    {
      allCertificationYaml {
        nodes {
          id
          title
          website
        }
      }
      allPresentationYaml(sort: {fields: date}) {
        nodes {
          id
          title
          event
          url
        }
      }
      allEventYaml {
        nodes {
          id
          name
          website
        }
      }
    }
  `);

  return (
    <IndexLayout>
      <Helmet>
        <title>About | Daniel Noyola</title>
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header css={[outer, SiteHeader]}>
          <div css={inner}>
            <SiteNav />
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader>
              <PostFullTitle>About me</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content" css={inner}>
              <div className="post-content">
                <p>Hello</p>
                <h2>Certifications</h2>
                <div className="certifications">
                  {allCertificationYaml.nodes.map(certification => (
                    <div key={certification.id} className="certification">
                      {certification.website ?
                        <a href={certification.website} target="_blank" rel="noopener noreferrer">
                          {certification.title}
                        </a> :
                        certification.title
                      }
                    </div>
                  ))}
                </div>
                {allPresentationYaml.nodes ?
                  <>
                    <h2>Presentations</h2>
                    <p>A list of Presentations I have given over the years</p>
                    <ul>
                      {allPresentationYaml.nodes.map(presentation => (
                        <li key={presentation.id} className="event">
                          <a href={presentation.url} target="_blank" rel="noopener noreferrer">
                            {presentation.title}
                          </a> - {presentation.event}
                        </li>
                      ))}
                    </ul>
                  </> :
                  null}
                <h2>Events</h2>
                <ul className="events">
                  {allEventYaml.nodes.map(event => (
                    <li key={event.id} className="event">
                      {event.website ? <a href={event.website} target="_blank" rel="noopener noreferrer">{event.name}</a> :
                        event.name
                      }
                    </li>
                  ))}
                </ul>
                <blockquote>
                  <p>Yes! I have gone to all Drupal CR camps since I started working with Drupal</p>
                </blockquote>
                <p>
                  <img src="https://association.drupal.org/files/Drupal_Association_ind_member_217.png" />
                </p>
              </div>
            </PostFullContent>
          </article>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default About;
