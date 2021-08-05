import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Slider from 'react-slick';
import Image from './Image'

export const query = graphql`
  fragment SliderImage on MarkdownRemark {
    frontmatter {
      slide {
        alt
        image
        title
      }
    }
  }
`

export default class SliderImage extends Component {
  state = {
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
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <div className="Gallery">
            {images.map((image, index) => (
                <div>
                  <Image
                    resolutions="small"
                    src={`${image.image}${i + 1}`}
                    alt={image.alt}
                  />
                </div>
            ))}
          </div>
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2>Custom Paging</h2>
        <Slider {...settings}>
          <div>
            <img src={image.image} />
          </div>
          <div>
            <img src={image.image} />
          </div>
          <div>
            <img src={image.image} />
          </div>
          <div>
            <img src={image.image} />
          </div>
        </Slider>
      </div>
    );
  }
}

SliderImage.propTypes = {
  images: PropTypes.array.isRequired
}
