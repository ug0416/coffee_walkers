import React, { Component } from 'react'
import { navigate } from 'gatsby'

class searchBtn extends Component {
  constructor(props) {
    super(props)
    this.state = { searchWord: '' }
  }

  toggleAndSearch() {
    const url = window.location.href
      .replace(window.location.origin, '')
      .split('?')[0]
    navigate(`${url}?s=${this.state.searchWord}`)
  }

  setSearchWord(word) {
    this.setState({
      searchWord: word
    })
  }

  render() {
  return (
<div method="get" action="#" class="search_container">
  <input
            className="search-input"
            type="text"
            ref={(input) => { this.nameInput = input; }}
            value={this.state.searchWord}
            placeholder="お店を探す"
            onChange={e => this.setSearchWord(e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                  this.toggleAndSearch()
                  }
              }}
              />
</div>
        )
      }}
export default searchBtn