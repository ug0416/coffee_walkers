import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ImageGallery from 'react-image-gallery';

import _kebabCase from 'lodash/kebabCase'

import './Gallery.css'
import "react-image-gallery/styles/css/image-gallery.css";

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
            original: img.image,
            thumbnail: img.image,
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
    const properties = {
      lazyLoad: true,
      showNav: false,
      showPlayButton: false,
      showFullscreenButton: false
    }
    return (
      <Fragment>
        {images && images.length > 0 && (
          <div className="Gallery">
            {images.map((image, index) => (
              <div
                className="Gallery--Item"
                key={_kebabCase(image.alt) + '-' + index}
              >
                
              </div>
            ))}
          </div>
        )}
        {this.state.loaded && this.state.sliderImages.length > 0 && (
          <ImageGallery
            items={this.state.sliderImages}
            {...properties}
          />
        )}
      </Fragment>
    )
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired
}
