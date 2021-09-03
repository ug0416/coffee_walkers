import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from './Image'
import { Carousel } from 'react-responsive-carousel';
import _kebabCase from 'lodash/kebabCase'

import './Gallery.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const query = graphql`
  fragment Gallery on MarkdownRemark {
    frontmatter {
      gallery {
        alt
        image
        title
      }
    }
  }
`

export default class Gallery extends Component {
  state = {
    loaded: false,
    sliderImages: [],
    index: 0
  }

  getImageInfo = (img, index) =>
    fetch(img.image + '-/json/')
      .then(res => res.json())
      .then(
        result => {
          const newImagesArr = [...this.state.sliderImages]
          newImagesArr[index] = {
            src: img.image,
            title: img.title,
            w: result.width,
            h: result.height
          }
          this.setState({
            sliderImages: newImagesArr
          })
          return true
        },
        error => {
          console.log(error)
          return false
        }
      )

  componentDidMount() {
    const { images } = this.props,
      maxCount = images.length
    let loopCount = 1

    for (let i in images) {
      if (this.getImageInfo(images[i], i)) {
        this.setState({ loaded: loopCount === maxCount })
        loopCount++
      }
    }
  }

  render() {
    const { images } = this.props
    return (
      <Fragment>
        {images && images.length > 0 && (
          <Carousel
          showThumbs={false}
          showStatus={false}
          >
            {images.map((image, index) => (
              <div
                className="Gallery--Item"
                key={_kebabCase(image.alt) + '-' + index}
                tabIndex={0}
                aria-label="Toggle Gallery"
                role="button"
              >
                <div>
                  <Image
                    resolutions="small"
                    src={image.image}
                    alt={image.alt}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </Fragment>
    )
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired
}
