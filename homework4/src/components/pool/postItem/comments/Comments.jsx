import React, { Component } from 'react'

export class Comments extends Component {
  render() {
    return (
      <>
        {this.props.comments.map((comment, i) =>
          <div key={i} className="card bg-light mb-3" style={{ width: '25rem', margin: 'auto' }}>
            <div className="card-body">
              <h4 className="card-title">{comment.body}</h4>
              <p className="card-text">Rate: {comment.rate}</p>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Comments