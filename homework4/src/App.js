import './App.css';
import React from 'react';
import posts_data from './post-data.json';
import Pool from './components/Pool/index';
import Lists from './components/Lists/index';
import Pagination from './common/Pagination';
import FormCustom from './form validation/FormCustom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: posts_data,
      buttonDisabled: false,
      currentPage: 1,
      postPerPage: 4,
      searchPost: ""
    }
  }
  onChangeDisabled = (id) => {
    this.setState(state => ({
      posts: state.posts.map(post => post.id === id ? { ...post, disabled: !post.disabled } : post)
    }))
    if (!this.state.posts.some(post => post.disabled === false)) {
      this.setState(() => ({
        buttonDisabled: true
      }))
    } else {
      this.setState(() => ({
        buttonDisabled: false
      }))
    }
  }
  handlerChangePage = (page) => {
    this.setState(() => ({
      currentPage: page
    }))
  }
  handlerSearch = (val) => {
    this.setState(() => ({
      searchPost: val
    }))
  }
  addComment = (body, rate, postId) => {
    const newCommentObj = { id: Math.random().toString(36).slice(2), body, rate, answers: [] }
    this.setState(state => ({
      ...state,
      posts: state.posts.map(post => post.id === postId ? {
        ...post,
        comments: [
          ...post.comments,
          newCommentObj
        ],
      } : post)
    }))
  }
  addAnswer = (body, postId, commentId) => {
    const newAnswerObj = { body }
    this.setState(state => ({
      ...state,
      posts: state.posts.map(post => post.id === postId ? {
        ...post,
        comments: post.comments.map(comment => comment.id === commentId ? {
          ...comment,
          answers: [
            ...comment.answers,
            newAnswerObj
          ],
        } : comment)
      } : post)
    }))
  }
  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postPerPage
    const indexOfFirstPost = indexOfLastPost - this.state.postPerPage
    const posts = this.state.posts.filter(val => {
      if (this.state.searchPost === "") {
        return val
      } else if (
        val.title.toLowerCase().includes(this.state.searchPost.toLowerCase()) ||
        val.body.toLowerCase().includes(this.state.searchPost.toLowerCase()) ||
        val.comments.some(comment => comment.body.toLowerCase().includes(this.state.searchPost.toLowerCase()))
      ) {
        return val
      }
      return false
    })
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    return (
    <>
      <div className='post_container'>
        <div className='pool_block'>
          <input
            className='form-control'
            onChange={(e) => this.handlerSearch(e.target.value)}
            value={this.state.searchPost}
            placeholder='Search...'
          />
          <Pool posts={currentPosts} addComment={this.addComment} addAnswer={this.addAnswer} />
          <Pagination
            itemsPerPage={this.state.postPerPage}
            data={posts.length}
            currentPage={this.state.currentPage}
            handlerChangePage={this.handlerChangePage}
          />
        </div>
        <Lists posts={this.state.posts} onChangeDisabled={this.onChangeDisabled} buttonDisabled={this.state.buttonDisabled} />
      </div>
      <FormCustom />
    </>
    );
  };
}

export default App;
