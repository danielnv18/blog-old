import React from "react";
import Link from "gatsby-link";
import "./style.scss";

const PostTeaser = ({post}) => (
	<div>
		<div className="post-preview">
			<Link to={post.path}>
				<h2 className="post-title">
					{post.title}
				</h2>
			</Link>
			<p className="post-subtitle">
				{post.excerpt}
			</p>
			<p className="post-meta">Posted on {post.date}</p>
		</div>
		<hr/>
	</div>

);

export default PostTeaser;
