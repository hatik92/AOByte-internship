import React, { Component } from 'react';
import styles from './style.module.css'
import PostItem from './PostItem/index';

class Pool extends Component {    
    render() {
        return (<div className={styles.posts_container}>
            <h1>POSTS</h1>
            {this.props.posts.map(post =>
                <PostItem post={post} key={post.id} addComment={this.props.addComment} addAnswer={this.props.addAnswer}  />
            )}
        </div>);
    }
}

export default Pool;