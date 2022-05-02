import React, { Component } from 'react'
import styles from './pagination.module.css'

export class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99, 111, 222, 333, 444, 555, 666, 777, 888, 999, 12, 45, 78, 23, 56, 89, 13, 46, 79, 14, 25, 36, 47, 58, 69, 17, 28, 39],
      size: 5
    }
  }

  render() {
    const pages = Math.ceil(this.props.data / this.props.itemsPerPage)
    const pagesArr = []
    for (let index = 1; index <= pages; index++) {
      pagesArr.push(index)
    }
    return (
      <div className={styles.paginationBlock}>
        <div className={styles.pagination}>
          <button>&laquo;</button>
          {pagesArr.map(page =>
            <button
              key={page}
              onClick={() => this.props.handlerChangePage(page)}
              className={`${this.props.currentPage === page ? styles.active : ""}`}
            >
              {page}
            </button>)}
          <button>&raquo;</button>
        </div>
      </div>
    )
  }
}

export default Pagination