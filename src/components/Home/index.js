import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {BsFilterRight, BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'
import Counter from '../Counter'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'PROCESS',
  failure: 'FAIL',
}

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

class Home extends Component {
  state = {
    offersDataList: [],
    statusForOffers: apiStatus.initial,
    activeOption: sortByOptions[1].value,
    searchInput: '',
    restaurantsData: [],
    statusForRestaurants: apiStatus.initial,
    pageNo: 1,
  }

  componentDidMount() {
    this.getOffersData()
    this.getTheRestaurantsData()
  }

  getOffersData = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    this.setState({statusForOffers: apiStatus.inProcess})

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      console.log(updatedData)
      this.setState({
        statusForOffers: apiStatus.success,
        offersDataList: updatedData,
      })
    } else {
      this.setState({statusForOffers: apiStatus.failure})
    }
  }

  getTheFormattedDataOfReviews = data => ({
    rating: data.rating,
    ratingColor: data.rating_color,
    ratingText: data.rating_text,
    totalReviews: data.total_reviews,
  })

  getTheFormattedData = data => ({
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    groupByTime: data.group_by_time,
    hasOnlineDelivery: data.has_online_delivery,
    hasTableBooking: data.has_table_booking,
    id: data.id,
    imageUrl: data.image_url,
    isDeliveringNow: data.is_delivering_now,
    location: data.location,
    menuType: data.menu_type,
    name: data.name,
    opensAt: data.opens_at,
    userRating: this.getTheFormattedDataOfReviews(data.user_rating),
  })

  getTheRestaurantsData = async () => {
    const {activeOption, searchInput, pageNo} = this.state
    const token = Cookies.get('jwt_token')
    const LIMIT = 9
    const offset = (pageNo - 1) * LIMIT
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${activeOption}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    this.setState({statusForRestaurants: apiStatus.inProcess})
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedRestaurantData = data.restaurants.map(each =>
        this.getTheFormattedData(each),
      )
      console.log(formattedRestaurantData)
      this.setState({
        restaurantsData: formattedRestaurantData,
        statusForRestaurants: apiStatus.success,
      })
    } else {
      this.setState({statusForRestaurants: apiStatus.failure})
    }
  }

  setTheSortFilter = event => {
    this.setState(
      {activeOption: event.target.value},
      this.getTheRestaurantsData,
    )
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  increaseThePageNo = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.getTheRestaurantsData,
    )
  }

  decreaseThePageNo = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo - 1}),
      this.getTheRestaurantsData,
    )
  }

  renderTheSlideShow = () => {
    const {offersDataList} = this.state

    const settings = {
      dots: true,
      slidesToShow: 1,
      speed: 500,
      slidesToScroll: 1,
    }
    return (
      <div className="slider-container">
        <ul>
          <Slider {...settings}>
            {offersDataList.map(each => (
              <li key={each.id}>
                <img src={each.imageUrl} alt="offer" className="slide-image" />
              </li>
            ))}
          </Slider>
        </ul>
      </div>
    )
  }

  renderTheRestaurantsList = () => {
    const {restaurantsData, pageNo} = this.state
    return (
      <div className="restaurant-list-container">
        <ul className="restaurants-list">
          {restaurantsData.map(each => (
            <RestaurantItem key={each.id} restaurantDetails={each} />
          ))}
        </ul>
        <Counter
          pageNo={pageNo}
          increaseThePageNo={this.increaseThePageNo}
          decreaseThePageNo={this.decreaseThePageNo}
        />
      </div>
    )
  }

  renderTheLoader = () => (
    <div testid="restaurants-list-loader" className="loader-container">
      <Loader type="Oval" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderTheLoaderForOffers = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader type="Oval" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderTheSlideView = () => {
    const {statusForOffers} = this.state
    switch (statusForOffers) {
      case apiStatus.inProcess:
        return this.renderTheLoaderForOffers()
      case apiStatus.success:
        return this.renderTheSlideShow()

      default:
        return null
    }
  }

  renderTheRestaurantsListView = () => {
    const {statusForRestaurants} = this.state
    switch (statusForRestaurants) {
      case apiStatus.inProcess:
        return this.renderTheLoader()
      case apiStatus.success:
        return this.renderTheRestaurantsList()

      default:
        return null
    }
  }

  render() {
    const {activeOption, searchInput} = this.state
    return (
      <>
        <div className="home-page-container">
          <Header />
          {this.renderTheSlideView()}
          <div className="heading-filter-block">
            <div>
              <h1 className="popular-restaurant-heading">
                Popular Restaurants
              </h1>
              <p className="restaurant-description">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>
            <div className="filter-section">
              <input
                type="search"
                value={searchInput}
                className="search-element"
                placeholder="Search your Restaurant..."
                onChange={this.getSearchInput}
              />
              <button
                type="button"
                onClick={this.getTheRestaurantsData}
                className="search-btn"
              >
                <BsSearch size={25} />
              </button>
            </div>

            <div className="filter-section">
              <BsFilterRight size={25} />
              <div className="sort-container">
                <p className="sort-heading">Sort by</p>
                <select
                  className="sort-by-options options"
                  value={activeOption}
                  onChange={this.setTheSortFilter}
                >
                  {sortByOptions.map(each => (
                    <option
                      key={each.id}
                      value={each.value}
                      className="options"
                    >
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <hr className="h-line" />
          {this.renderTheRestaurantsListView()}
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
