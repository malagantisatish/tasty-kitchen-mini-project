import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import PageNotFound from './components/PageNotFound'
import TastyKitchenContext from './context/TastyKitchensContext'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const initialCartListData = () => {
  const initialCartlist = localStorage.getItem('cartData')

  if (initialCartlist === null) {
    return []
  }
  return JSON.parse(initialCartlist)
}

class App extends Component {
  state = {cartList: initialCartListData(), isPlaced: false, quantity: 1}

  addcartItem = item => {
    this.setState(
      prevState => ({
        cartList: [...prevState.cartList, {...item}],
      }),
      this.addTheCartListToLocalStorage,
    )

    this.setState(prevState => ({totalPrice: prevState.totalPrice + item.cost}))
  }

  setThePriceOfEachItem = () => {
    const {cartList} = this.state
    const updatedList = cartList.map(each => ({
      name: each.name,
      quantity: each.quantity,
      imageUrl: each.imageUrl,
      cost: each.quantity * each.cost,
      foodType: each.foodType,
      id: each.id,
      rating: each.rating,
      isAdded: each.isAdded,
    }))
    this.setState({cartList: updatedList}, this.addTheCartListToLocalStorage)
  }

  increaseTheCount = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return {...each, quantity: each.quantity + 1}
          }
          return each
        }),
      }),
      this.addTheCartListToLocalStorage,
    )
  }

  removeCartItemFromList = id => {
    const {cartList} = this.state
    const filterList = cartList.filter(each => each.id !== id)
    this.setState(
      {cartList: filterList, isPlaced: false},
      this.addTheCartListToLocalStorage,
    )
  }

  decreaseTheCount = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return {...each, quantity: each.quantity - 1}
          }
          return each
        }),
      }),
      this.addTheCartListToLocalStorage,
    )
  }

  getTheQuantity = id => {
    const {cartList} = this.state
    const foodItem = cartList.find(each => each.id === id)
    return foodItem === undefined ? 0 : foodItem.quantity
  }

  addTheCartListToLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  placeTheOrderOfCartItems = () => {
    this.setState(
      {isPlaced: true, cartList: []},
      this.addTheCartListToLocalStorage,
    )
  }

  render() {
    const {cartList, pageNo, isPlaced, quantity} = this.state

    console.log(cartList)
    return (
      <TastyKitchenContext.Provider
        value={{
          cartList,
          pageNo,
          isPlaced,
          quantity,
          addcartItem: this.addcartItem,
          increaseTheCount: this.increaseTheCount,
          decreaseTheCount: this.decreaseTheCount,
          placeTheOrderOfCartItems: this.placeTheOrderOfCartItems,
          removeCartItemFromList: this.removeCartItemFromList,
          getTheQuantity: this.getTheQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={PageNotFound} />
        </Switch>
      </TastyKitchenContext.Provider>
    )
  }
}

export default App
