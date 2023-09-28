import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import TastyKitchenContext from '../../context/TastyKitchensContext'
import './index.css'

const CartItem = props => {
  const {itemDetails} = props
  const {imageUrl, name, id, cost, quantity} = itemDetails

  return (
    <TastyKitchenContext.Consumer>
      {value => {
        const {
          increaseTheCount,
          decreaseTheCount,
          removeCartItemFromList,
        } = value

        const decreaseCountOfCartItem = () => {
          if (quantity > 1) {
            decreaseTheCount(id)
          } else {
            removeCartItemFromList(id)
          }
        }

        const increaseCountOfCartItem = () => {
          increaseTheCount(id)
        }

        const renderTheCountOfItems = () => (
          <div className="add-cart-items">
            <button
              type="button"
              className="add-cart-btn"
              onClick={decreaseCountOfCartItem}
              testid="decrement-quantity"
            >
              <BsDashSquare className="react-add-dash-btn" />
            </button>
            <p className="count-items" testid="item-quantity">
              {quantity}
            </p>
            <button
              type="button"
              className="add-cart-btn"
              onClick={increaseCountOfCartItem}
              testid="increment-quantity"
            >
              <BsPlusSquare className="react-add-dash-btn" />
            </button>
          </div>
        )

        return (
          <li className="cart-item-details" testid="cartItem">
            <div className="image-name-container">
              <img src={imageUrl} alt={name} className="item-image-size" />
              <h1 className="cart-item-name-lg">{name}</h1>
            </div>
            <div className="count-cost-container">
              <h1 className="cart-item-name-sm">{name}</h1>
              {renderTheCountOfItems()}
              <p className="price-cart-item">{`₹ ${cost}.00`}</p>
            </div>
          </li>
        )
      }}
    </TastyKitchenContext.Consumer>
  )
}

export default CartItem
