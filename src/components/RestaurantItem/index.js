import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {id, name, imageUrl, cuisine, userRating} = restaurantDetails
  const {rating, ratingColor, ratingText, totalReviews} = userRating

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-item">
      <li className="restaurant-card" testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="heading-rating-block">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine-name">{cuisine}</p>
          <div className="rating-section-home">
            <AiFillStar size={20} className="react-icon" />
            <p className="rating">{rating}</p>
            <p className="reviews">{`(${totalReviews} ratings)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
