import './App.css';
import React from 'react';
import posts_data from './post-data.json';
import Pool from './components/pool/Pool';
import Lists from './components/lists/Lists';
import Pagination from './common/Pagination';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: posts_data.map(post => ({
                ...post,
                addNewComment: {body: '', rate: 0}
            })),
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
    const newCommentObj = {body, rate}
    this.setState(state => ({
            ...state,
            posts: state.posts.map(post => post.id === postId ? {
                ...post,
                comments: [
                    ...post.comments,
                    newCommentObj
                ],
            } : post )
        }))
  }
  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postPerPage
    const indexOfFirstPost = indexOfLastPost - this.state.postPerPage
    const posts = this.state.posts.filter(val => {
      if (this.state.searchPost === "") {
        return val
      } else if (val.title.toLowerCase().includes(this.state.searchPost.toLowerCase()) || val.body.toLowerCase().includes(this.state.searchPost.toLowerCase())) {
        return val
      }
    })
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    return (
      <div className='post_container'>
        <div className='pool_block'>
          <input
            onChange={(e) => this.handlerSearch(e.target.value)}
            value={this.state.searchPost}
            placeholder='Search...'
          />
          <Pool posts={currentPosts} addComment={this.addComment} />
          <Pagination
            itemsPerPage={this.state.postPerPage}
            data={posts.length}
            currentPage={this.state.currentPage}
            handlerChangePage={this.handlerChangePage}
          />
        </div>
        <Lists posts={this.state.posts} onChangeDisabled={this.onChangeDisabled} buttonDisabled={this.state.buttonDisabled} />
      </div>
    );
  };
}

export default App;
