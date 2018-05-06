import React from 'react';
import Link from 'gatsby-link';
import "./style.scss";

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			navState: {
				button: "collapsed",
				navBar: ""
			}
		};

		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		if (this.state.show) {
			this.setState({
				show: true,
				navState: {
					button: "",
					navBar: "show"
				}
			})
		}
		else {
			this.setState({
				show: false,
				navState: {
					button: "collapsed",
					navBar: ""
				}
			})
		}
	}

	render() {
		const { siteTitle } = this.props;
		const { navState } = this.state;
		console.log(navState)
		return (
			<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
				<div className="container">
					<Link to="/" className="navbar-brand">{siteTitle}</Link>
					<button className={`navbar-toggler navbar-toggler-right ${navState.button}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						Menu
						<i className="fa fa-bars"></i>
					</button>
					<div className={`collapse navbar-collapse ${navState.navBar}`} id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to="/" className="nav-link">Home</Link>
							</li>
							<li className="nav-item">
								<Link to="/about" className="nav-link">About</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

export default Nav;
