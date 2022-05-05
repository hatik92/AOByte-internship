import React, { Component } from 'react'
import Comments from './comments/Comments';
import styles from './postItem.module.css'
import Picker from 'emoji-picker-react';

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
    return (
      <>
        <div className={`${this.props.post.disabled ? styles.postDisabled : ''} card border-primary mb-3`} style={{ margin: 'auto' }}>
          <div className="card-header">{this.props.post.id}.</div>
          <div className="card-body">
            <h4 className="card-title">{this.props.post.title}</h4>
            <p className="card-text">{this.props.post.body}</p>
            <Comments comments={this.props.post.comments} addAnswer={this.props.addAnswer} postId={this.props.post.id} />
            <form onSubmit={this.onSubmit} key={this.props.post.id}>
              <input
                name='body'
                value={this.state.body}
                onChange={this.onChange}
              />
              <span onClick={this.onEmojiShow} style={{ cursor: 'pointer' }}>🙂</span>
              {this.state.emojiShow && <Picker onEmojiClick={this.onEmojiClick} />}
              <br />
              <input
                name='rate'
                type='number'
                placeholder='rate'
                min={0}
                max={10}
                value={this.state.rate}
                onChange={this.onChange}
              /><br />
              <button>Add comment</button>
            </form>
            <hr />
          </div>
        </div>
      </>
    )
  }
}

export default PostItem