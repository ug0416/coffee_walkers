import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Slider from 'react-slick';
import Image from './Image'

export const query = graphql`
  fragment Slide on MarkdownRemark {
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

  render() {
    const { images } = this.props
    const settings = {
      customPaging: function(i) {
        return (
          <Fragment>
          <a>
            <div className="Gallery">
            {images.map((image, index) => (
                <div>
                  <Image
                    src={`${image}${i + 1}`}
                    alt={image.alt}
                  />
                </div>
            ))}
          </div>
          </a>
          </Fragment>
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
          <Image
            resolutions="small"
            src={images.image}
            alt={images.alt}
          />
          </div>
          <div>
          <Image
            resolutions="small"
            src={images.image}
            alt={images.alt}
          />
          </div>
          <div>
          <Image
            resolutions="small"
            src={images.image}
            alt={images.alt}
          />
          </div>
          <div>
          <Image
            resolutions="small"
            src={images.image}
            alt={images.alt}
          />
          </div>
        </Slider>
      </div>
    );
  }
}

SliderImage.propTypes = {
  images: PropTypes.array.isRequired
}
