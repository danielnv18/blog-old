import React from "react";
import Link from "gatsby-link";
import "./style.scss";

const PostTeaser = ({post}) => (
	<div>
		<div class="post-preview">
			<Link to={post.path}>
				<h2 class="post-title">
					{post.title}
				</h2>
			</Link>
			<p class="post-subtitle">
				{post.excerpt}
			</p>

			<p class="post-meta">Posted by on {post.date}</p>
		</div>
		<hr/>
	</div>

);

export default PostTeaser;
