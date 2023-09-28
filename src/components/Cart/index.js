import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import TastyKitchensContext from '../../context/TastyKitchensContext'
import CartItem from '../CartItem'
import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  totalPriceOfAllProducts = cartList =>
    cartList.reduce(
      (totalPrice, item) => totalPrice + item.quantity * item.cost,
      0,
    )

  renderTheNoCartView = () => (
    <div className="no-cart-view-container" testid="empty cart">
      <img
        src="https://res.cloudinary.com/dpgoeszn9/image/upload/v1695709540/cooking_1_f9kkne.png"
        alt="empty cart"
        className="no-cart-item"
      />
      <h1 className="no-cart-heading">No Order Yet!</h1>
      <p className="no-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-now-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderThePaymentSuccessView = () => (
    <div className="payment-success-container">
      <img
        src="https://res.cloudinary.com/dpgoeszn9/image/upload/v1695747210/check-circle.1_1_catg21.svg"
        alt="payment success"
        className="payment-success-image"
      />
      <h1 className="pay-success-heading">Payment Successful</h1>
      <p className="pay-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="goto-home-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  render() {
    return (
      <TastyKitchensContext.Consumer>
        {value => {
          const {
            cartList,
            increaseTheCount,
            decreaseTheCount,
            isPlaced,
            placeTheOrderOfCartItems,
          } = value

          const lengthOfCartList = cartList.length
          console.log(lengthOfCartList)

          const placeTheOrder = () => {
            placeTheOrderOfCartItems()
          }

          const renderTheCartItems = () => (
            <div className="cart-items-container">
              <ul className="cart-items-details">
                <li className="cart-options">Item</li>
                <li className="cart-options">Quantity</li>
                <li className="cart-options">Price</li>
              </ul>
              <ul className="cart-items-list">
                {cartList.map(each => (
                  <CartItem key={each.id} itemDetails={each} />
                ))}
              </ul>
              <hr className="cart-h-line" />
              <div className="total-cost-container">
                <h1 className="total-cost-name">Order Total:</h1>
                <h1
                  className="total-cost-name"
                  testid="total-price"
                >{`₹ ${this.totalPriceOfAllProducts(cartList)}.00`}</h1>
              </div>
              <button
                type="button"
                className="place-order-btn"
                onClick={placeTheOrder}
              >
                Place Order
              </button>
            </div>
          )

          const renderTheCartItemsView = () => (
            <>
              {isPlaced && cartList.length === 0
                ? this.renderThePaymentSuccessView()
                : renderTheCartItems()}
            </>
          )

          return (
            <>
              <Header />
              <div className="cart-page-container">
                {lengthOfCartList >= 1 || isPlaced
                  ? renderTheCartItemsView()
                  : this.renderTheNoCartView()}
              </div>
              <Footer />
            </>
          )
        }}
      </TastyKitchensContext.Consumer>
    )
  }
}

export default Cart
