import React from 'react'
import './Footer.css'

import { Link } from 'gatsby'

import footerlogo from '/static/images/footer_logo.svg'
import facebook from '/static/images/social/facebook.svg'
import instagram from '/static/images/social/instagram.svg'
import twitter from '/static/images/social/twitter.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="has-text-centered">
          <img
            src={footerlogo}
            alt="Coffee Walkers"
            style={{ width: '14em', height: '10em' }}
          />
        </div>
        <div className="has-text-centered has-background-black has-text-white-ter">
          <div className="has-background-black has-text-white-ter">
            <div style={{ maxWidth: '100vw' }}>
              <div className="social">
                <a title="facebook" href="https://www.facebook.com/CoffeeWalkers-101962781299587/">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com/coffee_walkers">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://www.instagram.com/coffee_walkers/">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
              <ul className="terms">
                <Link to="/privacy-policy/">
                <li>プライバシーポリシー</li>
                </Link>
                <Link to="/law/">
                <li>特定商取引法に基づく表示</li>  
                </Link> 
              </ul>
              <div className="container taCenter">
                <span>
                ©2020 - {new Date().getFullYear()} <Link to="/">Coffee Walkers</Link>.
                {' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer