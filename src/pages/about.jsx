import React, { Component } from "react";
import Helmet from "react-helmet";
import About from "../components/About/About";
import config from "../../data/SiteConfig";
import Header from "../components/Header";

class AboutPage extends Component {
  render() {
    return (
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
				<Header title="Blog" cover="/images/front.jpg"/>
        <About />
      </div>
    );
  }
}

export default AboutPage;
