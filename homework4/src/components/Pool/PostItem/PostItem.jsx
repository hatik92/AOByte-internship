import React, { Component } from 'react'
import Comments from './comments/Comments';
import styles from './postItem.module.css'
import Picker from 'emoji-picker-react';
import classNames from 'classnames/bind';

export class PostItem extends Component {
  state = {
    body: '',
    rate: 0,
    chosenEmoji: null,
    emojiShow: false
  }
  onEmojiClick = (event, emojiObject) => {
    this.setState(state => ({
      ...state,
      body: state.body + emojiObject.emoji
    }));
  };
  onEmojiShow = () => {
    this.setState({ emojiShow: !this.state.emojiShow })
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addComment(this.state.body, this.state.rate, this.props.post.id);
    this.setState({ body: '', rate: 0, emojiShow: false });
  }
  render() {
    const emojiBtnClass = classNames(styles.emojiButton)
    const commentINputClass = classNames('form-control', styles.emojiInput)
    const postBlockClass = classNames(
      'card border-primary mb-3',
      {'text-white bg-secondary': this.props.post.disabled}
      )
    return (
      <>
        <div className={postBlockClass} style={{ margin: 'auto' }}>
          <div className="card-header">{this.props.post.id}.</div>
          <div className="card-body">
            <h4 className="card-title">{this.props.post.title}</h4>
            <p className="card-text">{this.props.post.body}</p>
            <Comments comments={this.props.post.comments} addAnswer={this.props.addAnswer} postId={this.props.post.id} />
            <form onSubmit={this.onSubmit} key={this.props.post.id}>
              <div class="form-group row">
                <label for="newComment" class="col-sm-4 col-form-label">New comment</label>
                <div class="col-sm-8">
                  <div className={styles.emojiIn}>
                    <input
                      name='body'
                      id="newComment"
                      className={commentINputClass}
                      value={this.state.body}
                      onChange={this.onChange}
                    />
                    <span className={emojiBtnClass} onClick={this.onEmojiShow} >🙂</span>
                    {this.state.emojiShow &&
                    <div className={styles.emojiBlock}>
                      <Picker onEmojiClick={this.onEmojiClick} />
                    </div>}
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputRate" class="col-sm-4 col-form-label">Rate</label>
                <div class="col-sm-8">
                  <input
                    name='rate'
                    type='number'
                    id='inputRate'
                    className="form-control"
                    placeholder='rate'
                    min={0}
                    max={10}
                    value={this.state.rate}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <button className='btn btn-primary'>Add comment</button>
            </form>
            <hr />
          </div>
        </div>
      </>
    )
  }
}

export default PostItem