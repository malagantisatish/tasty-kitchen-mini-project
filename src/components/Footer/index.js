import {
  FaPinterestSquare,
  FaTwitter,
  FaInstagram,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-title">
      <img
        src="https://res.cloudinary.com/dpgoeszn9/image/upload/v1695573113/Frame_275_x6sdh0.svg"
        alt="website-footer-logo"
      />
      <h1 className="footer-header">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="icons-container">
      <FaPinterestSquare
        className="footer-react-icons"
        testid="pintrest-social-icon"
      />
      <FaInstagram
        className="footer-react-icons"
        testid="instagram-social-icon"
      />
      <FaTwitter className="footer-react-icons" testid="twitter-social-icon" />
      <FaFacebookSquare
        className="footer-react-icons"
        testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
