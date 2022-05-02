import './App.css';
import React from 'react';
import posts_data from './post-data.json';
import Posts from './components/posts/Posts';
import Average from './components/average/Average';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: posts_data,
      buttonDisabled: false
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
  render() {
    return (
      <div className='container'>
        <Posts posts={this.state.posts} />
        <Average posts={this.state.posts} onChangeDisabled={this.onChangeDisabled} buttonDisabled={this.state.buttonDisabled} />
      </div>
    );
  };
}

export default App;
