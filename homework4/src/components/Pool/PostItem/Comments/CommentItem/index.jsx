import React, { Component } from 'react';
import classNames from 'classnames/bind';

export class CommentItem extends Component {
  state = {
    replyShow: false,
    body: ''
  }
  onShowReplyForm = () => {
    this.setState({ replyShow: !this.state.replyShow })
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addAnswer(this.state.body, this.props.postId, this.props.comment.id);
    this.setState({ body: '', replyShow: false });
  }
  render() {
    const rateClassNames = classNames('card-text', {
      "text-danger": this.props.comment.rate <= 5,
      "text-warning": this.props.comment.rate > 5 && this.props.comment.rate <= 8,
      "text-success": this.props.comment.rate > 8 && this.props.comment.rate <= 10
    })
    return (
      <div className="card bg-light mb-3" style={{ width: '25rem', margin: 'auto' }}>
        <div className="card-body">
          <h4 className="card-title">{this.props.comment.body}</h4>
          <p className={rateClassNames}>Rate: {this.props.comment.rate}</p>
        </div>
        <div className="card-body">
          {this.props.comment.answers.length > 0 && <>
            <h4 className="card-title text-success">Answers</h4>
            {this.props.comment.answers.map((answer, i) => <p className="card-text" key={i}>{answer.body}</p>)}
          </>}
        </div>
        <p className="text-primary" style={{ cursor: 'pointer' }} onClick={this.onShowReplyForm}> {this.state.replyShow ? 'Cancel' : 'Reply'} </p>
        {this.state.replyShow &&
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col">
                <input className='form-control' name='body' onChange={this.onChange} />
              </div>
              <div className="col">
                <button className='btn btn-primary'>Send</button>
              </div>
            </div>
          </form>}
      </div>
    )
  }
}

export default CommentItem