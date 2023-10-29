import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
 <footer id="footer">
    <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src="/images/playstore.png" alt="playstore" />
        <img src="/images/Appstore.png" alt="Appstore" />
    </div>
    <div className="midFooter">
        <h1>Ecommerce.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; AftabWasih</p>
    </div>
    <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instragram.com/aftababu54">Instragram</a>
        <a href="http://instragram.com/aftababu54">Youtube</a>
        <a href="http://instragram.com/aftababu54">Facebook</a>
    </div>
 </footer>
  )
}

export default Footer
