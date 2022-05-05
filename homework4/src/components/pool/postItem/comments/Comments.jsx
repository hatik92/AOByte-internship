import React, { Component } from 'react'
import CommentItem from './commentItem/CommentItem'

export class Comments extends Component {
  render() {
    return (
      <>
        {this.props.comments.map((comment) =>
          <CommentItem key={comment.id} comment={comment} addAnswer={this.props.addAnswer} postId={this.props.postId} />
        )}
      </>
    )
  }
}

export default Comments