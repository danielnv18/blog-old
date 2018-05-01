import React from "react";
import PostTeaser from './../PostTeaser/PostTeaser';

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div className="container">
				<div className="row">
					<div className="col-lg-8 col-md-10 mx-auto">
						{
						postList.map((post, index) => (
							<PostTeaser post={post} key={index}/>
						))}
					</div>
				</div>
      </div>
    );
  }
}

export default PostListing;
