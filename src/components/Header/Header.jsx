import React from 'react'
import './Header.css'

const Header = (props) => {
  return (
    <div className="Header">
      <h1>{props.chatName}</h1>
    </div>
  )
}

export default Header
