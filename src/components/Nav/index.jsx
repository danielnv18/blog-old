import React from 'react';
import Link from 'gatsby-link';
import "./style.scss";
import "./header.scss";
import "./logo.scss";

const Nav = ({name}) => (
	<nav className="navbar navbar-expand-md navbar-static ms-navbar ms-navbar-primary navbar-mode">
		<div className="container container-full">
			<div className="navbar-header">
				<Link className="navbar-brand" to="/">
					<span className="ms-logo ms-logo-sm">DN</span>
					<span className="ms-title">Daniel<strong>Noyola</strong></span>
				</Link>
			</div>
		</div>
	</nav>
);

export default Nav;
