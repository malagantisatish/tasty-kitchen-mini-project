import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'PROCESS',
  failure: 'FAIL',
}

class RestaurantDetails extends Component {
  state = {restaurantDetails: '', foodItemsData: [], status: apiStatus.initial}

  componentDidMount() {
    this.getTheRestaurantDetails()
  }

  getFormattedDataOfFood = data => ({
    cost: data.cost,
    foodType: data.food_type,
    id: data.id,
    imageUrl: data.image_url,
    name: data.name,
    rating: data.rating,
    isAdded: false,
    quantity: 1,
  })

  addThisItem = id => {}

  getTheFormattedDate = data => ({
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    foodItems: data.food_items.map(each => this.getFormattedDataOfFood(each)),
    id: data.id,
    imageUrl: data.image_url,
    itemsCount: data.items_count,
    location: data.location,
    name: data.name,
    opensAt: data.opens_at,
    rating: data.rating,
    reviewsCount: data.reviews_count,
  })

  getTheRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    this.setState({status: apiStatus.inProcess})
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const formattedDataOfRestaurant = this.getTheFormattedDate(data)

      this.setState({
        restaurantDetails: formattedDataOfRestaurant,
        foodItemsData: formattedDataOfRestaurant.foodItems,
        status: apiStatus.success,
      })
    }
  }

  renderTheDishesList = () => {
    const {foodItemsData} = this.state

    return (
      <ul className="food-items-list">
        {foodItemsData.map(each => (
          <FoodItem
            key={each.id}
            foodDetails={each}
            addThisItem={this.addThisItem}
          />
        ))}
      </ul>
    )
  }

  renderTheRestaurantDetails = () => {
    const {restaurantDetails} = this.state
    return (
      <>
        <div className="restaurant-details-image-container">
          <img
            src={restaurantDetails.imageUrl}
            alt="restaurant"
            className="restaurant-details-image"
          />
          <div>
            <h1 className="restaurant-name-rp">{restaurantDetails.name}</h1>
            <p className="cuisine-rp">{restaurantDetails.cuisine}</p>
            <p className="location-rp">{restaurantDetails.location}</p>
            <div className="rating-container">
              <div>
                <div className="rating-section">
                  <AiFillStar className="star-rp" />
                  <p className="rating-rp">{restaurantDetails.rating}</p>
                </div>
                <p className="rating-count-rp">{`${restaurantDetails.reviewsCount}+ Rating`}</p>
              </div>
              <hr className="h-line-rp" />
              <div className="cost-section">
                <p className="cost-rp">{`₹ ${restaurantDetails.costForTwo}`}</p>
                <p className="cost-for-two-rp">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {this.renderTheDishesList()}
      </>
    )
  }

  renderTheLoader = () => (
    <div testid="restaurant-details-loader" className="loader-container">
      <Loader type="Oval" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderTheRestaurantDetailsView = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.inProcess:
        return this.renderTheLoader()
      case apiStatus.success:
        return this.renderTheRestaurantDetails()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="restaurant-details-page">
          {this.renderTheRestaurantDetailsView()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
