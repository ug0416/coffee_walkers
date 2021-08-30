import React, { Component, Fragment } from 'react'
import ImageGallery from 'react-image-gallery'
import { graphql } from 'gatsby'

import 'react-image-gallery/styles/css/image-gallery.css'

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
            originalAlt: img.title,
            thumbnail: img.image,
            thumbnailAlt: img.title
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
    const properties = {
      lazyLoad: true,
      showNav: false,
      showPlayButton: false,
      showFullscreenButton: false
    }
    return (
      <Fragment>
          <div>
          {this.state.loaded &&
          this.state.sliderImages.length > 0 && (
          <ImageGallery
            items={this.state.sliderImages}
            {...properties}
          />
          )}
          </div>
      </Fragment>
    )
  }
}