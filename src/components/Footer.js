import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>A training project made for storing notes</em>
    </div>
  )
}

export default Footer
