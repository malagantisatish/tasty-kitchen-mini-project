import React from 'react'

const TastyKitchensContext = React.createContext({
  cartList: [],
  totalPrice: 0,
  increaseTheCount: () => {},
  decreaseTheCount: () => {},
  addcartItem: () => {},
  placeTheOrderOfCartItems: () => {},
  removeCartItemFromList: () => {},
  getTheQuantity: () => {},
  isPlaced: false,
  quantity: 0,
})

export default TastyKitchensContext
