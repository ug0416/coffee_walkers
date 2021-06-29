import React from 'react'
import './Footer.css'

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
                <a title="facebook" href="https://facebook.com">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
              <div className="container taCenter">
                <span>
                ©2020 - {new Date().getFullYear()} <a href="https://thriveweb.com.au/">COFFEE WALKERS</a>.
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