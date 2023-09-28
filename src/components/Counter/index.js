import {Component} from 'react'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import './index.css'

const Counter = props => {
  const {pageNo, increaseThePageNo, decreaseThePageNo} = props

  const onIncrement = () => {
    if (pageNo < 4) {
      increaseThePageNo()
    }
  }

  const onDecrement = () => {
    if (pageNo > 1) {
      decreaseThePageNo()
    }
  }

  return (
    <div className="pagination-container">
      <button
        type="button"
        className="pagination-btn"
        onClick={onDecrement}
        testid="pagination-left-button"
      >
        <FaLessThan />
      </button>
      <p>
        <span testid="active-page-number">{pageNo}</span>
      </p>

      <button
        type="button"
        className="pagination-btn"
        onClick={onIncrement}
        testid="pagination-right-button"
      >
        <FaGreaterThan />
      </button>
    </div>
  )
}

export default Counter
