import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Content from './Content'
import './HomePageHeader.css'

const HomePageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' HomePageHeader-large'
  return (
    <div className={`HomePageHeader relative ${className}`}>
      {backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
        />
      )}
      <div className="container relative">
        <h1 className="HomePageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="HomePageHeader--Subtitle" src={subtitle} />
        )}
      </div>
    </div>
  )
}

HomePageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default HomePageHeader
