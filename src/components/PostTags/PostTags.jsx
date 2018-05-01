import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => (
            <Link
							key={tag}
							className="btn btn-outline-primary"
							role="button"
							to={`/tags/${_.kebabCase(tag)}`}
							style={ {marginRight: 10}}
            >
              {tag}
            </Link>
          ))}
      </div>
    );
  }
}

export default PostTags;
