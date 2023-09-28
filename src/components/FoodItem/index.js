import {useState} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import TastyKitchensContext from '../../context/TastyKitchensContext'
import './index.css'

const FoodItem = props => {
  const {foodDetails, addThisItem} = props
  const {imageUrl, cost, foodType, name, id, rating} = foodDetails

  return (
    <TastyKitchensContext.Consumer>
      {value => {
        const {
          cartList,
          addcartItem,
          increaseTheCount,
          decreaseTheCount,
          removeCartItemFromList,
          getTheQuantity,
        } = value

        const quantity = getTheQuantity(id)

        const cartListIds = cartList.map(each => each.id)
        const isAddedOrNot = cartListIds.includes(id)

        const addItemToCart = () => {
          const foodItem = {...foodDetails, quantity: 1}
          addcartItem(foodItem)
        }

        const increaseCountOfItem = () => {
          increaseTheCount(id)
        }

        const decreaseCountOfItem = () => {
          if (quantity > 1) {
            decreaseTheCount(id)
          } else {
            removeCartItemFromList(id)
          }
        }

        const renderTheCountOfItems = () => (
          <div className="add-cart-items">
            <button
              type="button"
              className="add-cart-btn"
              onClick={decreaseCountOfItem}
            >
              <BsDashSquare
                className="react-add-dash-btn"
                testid="decrement-count"
              />
            </button>
            <p className="count-items" testid="active-count">
              {quantity}
            </p>
            <button
              type="button"
              className="add-cart-btn"
              onClick={increaseCountOfItem}
            >
              <BsPlusSquare
                className="react-add-dash-btn"
                testid="increment-count"
              />
            </button>
          </div>
        )

        return (
          <li className="food-item-container" testid="foodItem">
            <img src={imageUrl} alt={name} className="food-item-image" />
            <div>
              <h1 className="food-name">{name}</h1>
              <p className="food-cost">{cost}</p>
              <div className="rating-section">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
              {isAddedOrNot ? (
                renderTheCountOfItems()
              ) : (
                <button
                  type="button"
                  className="add-btn"
                  onClick={addItemToCart}
                >
                  ADD
                </button>
              )}
            </div>
          </li>
        )
      }}
    </TastyKitchensContext.Consumer>
  )
}

export default FoodItem
