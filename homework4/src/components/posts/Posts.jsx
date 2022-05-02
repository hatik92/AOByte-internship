import React, { Component } from 'react';
import styles from './posts.module.css'

class Posts extends Component {
    render() {
        return (<div className={styles.posts_container}>
            <h1>POSTS</h1>
            {this.props.posts.map(post =>
                <div className={post.disabled ? styles.postDisabled : ''} key={post.id} >
                    <h1>{post.id}. {post.title}</h1>
                    <p>{post.body}</p>
                    <div className={styles.comments_block}>
                        <span><b>Comments</b></span>
                        <table>
                            <thead>
                                <tr>
                                    <th>comment</th>
                                    <th>rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {post.comments.map(comment =>
                                    <tr key={comment.id}>
                                        <td>{comment.body}</td>
                                        <td>{comment.rate}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <hr />
                </div>
            )}
        </div>);
    }
}

export default Posts;