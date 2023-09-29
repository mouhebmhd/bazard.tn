import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './homePage.css';
import Navbar from '../components/navbar/navbar';
import {BsFillPlayFill} from 'react-icons/bs'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <>
  <Navbar></Navbar>
      <div className="row m-0  landingSpace d-flex flex-column justify-content-center">
        <div className="container-fluid allKindsSlogan ">
          All Kinds of fashionable Products
        </div>
        <div className=" chooseSlogan ">
          Choose Your <br />Favorite Product 
        </div>
        <div className="col-6">
          <p className='welcomeMessage'>Welcome to Bazard.tn , where shopping meets convenience. Explore our handpicked selection of fashion, tech, and home essentials. Enjoy a seamless, secure shopping experience with expert support. Elevate your lifestyle with us. Start shopping today!</p>
        </div>
        <div className="col-6 d-flex gap-3">
          <button className='btn shopNowButton'>Shop Now</button>
          <button className='btn p-0 d-flex gap-3'><span className='watchButton'><span className='playButton d-flex '><BsFillPlayFill className='icon'></BsFillPlayFill></span></span>Watch how to order</button>
        </div>
      </div>
        </>
    }
}

export default HomePage;
