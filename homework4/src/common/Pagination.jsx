import React, { Component } from 'react'
import styles from './pagination.module.css'

export class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
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
          {/* <button>&laquo;</button> */}
          {pagesArr.map(page =>
            <button
              key={page}
              onClick={() => this.props.handlerChangePage(page)}
              className={`${this.props.currentPage === page ? styles.active : ""}`}
            >
              {page}
            </button>)}
          {/* <button>&raquo;</button> */}
        </div>
      </div>
    )
  }
}

export default Pagination