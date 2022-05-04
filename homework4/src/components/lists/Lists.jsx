import React, { Component } from 'react';
import styles from './lists.module.css'

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [
                { id: 1, list: [], sortList: true },
                { id: 2, list: [], sortList: true }
            ],
            addButtonDisabled: false
        }
    }
    averageArray = (arr) => {
        let total = 0;
        let count = 0;

        arr.forEach(function (item, index) {
            total += +item;
            count++;
        });

        return Math.round(total / count);
    }
    onAvergeList = (listId) => {
        const arithmetic_average_array = this.props.posts.filter(post => !post.disabled).map(post =>
        ({
            id: post.id,
            disabled: post.disabled,
            average: this.averageArray(post.comments.map(comment => comment.rate))
        }))
        if (arithmetic_average_array.length > 0) {
            const max_arithmetic_average = Math.max(...arithmetic_average_array.map(el => el.average))
            this.setState(state => ({
                lists: state.lists.map(list =>
                    list.id === listId
                        ? {
                            ...list,
                            list: [...list.list, arithmetic_average_array.filter(el => el.average === max_arithmetic_average)[0]]
                        }
                        : list)
            }))
            // debugger
            this.props.onChangeDisabled(arithmetic_average_array.filter(el => el.average === max_arithmetic_average)[0].id)
        } else {
            this.setState(() => ({
                addButtonDisabled: true
            }))
        }
    }

    onRemoveList = (id, listId) => {
        this.props.onChangeDisabled(id)
        this.setState(() => ({
            addButtonDisabled: false
        }))
        this.setState(state => ({
            lists: state.lists.map(list => list.id === listId ? { ...list, list: list.list.filter(el => el.id !== id) } : list)
        }))
    }
    onSortList = (listId) => {
        this.setState(state => ({
            lists: state.lists.map(list => list.id === listId ? (list.sortList ?
                {
                    ...list, list: list.list.sort(function (a, b) {
                        if (a.average > b.average) {
                            return 1;
                        }
                        if (a.average < b.average) {
                            return -1;
                        }
                        return 0;
                    }),
                    sortList: !list.sortList
                } :
                {
                    ...list, list: list.list.sort(function (a, b) {
                        if (a.average < b.average) {
                            return 1;
                        }
                        if (a.average > b.average) {
                            return -1;
                        }
                        return 0;
                    }),
                    sortList: !list.sortList
                }) : list)
        }))
    }

    render() {
        return (<div className={styles.average_container}>
            {this.state.lists.map(list => <div key={list.id}>
                <table>
                    <thead>
                        <tr>
                            <th>Post id</th>
                            <th>
                                <button onClick={() => this.onSortList(list.id)}>Sort &#8661;</button>
                            </th>
                            <th>
                                <button onClick={() => this.onAvergeList(list.id)} disabled={this.state.addButtonDisabled}>&#43;</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.list.length > 0 &&
                            list.list.map(el =>
                                <tr key={el.id}>
                                    <td>{el.id}</td>
                                    <td>{el.average}</td>
                                    <td><button onClick={() => this.onRemoveList(el.id, list.id)}>&#8722;</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>)}
        </div>);
    }
}

export default Lists;