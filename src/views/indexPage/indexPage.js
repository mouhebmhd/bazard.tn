import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './indexPage.css';
import {NavLink} from 'react-router-dom';
import {BsFillPlayFill} from 'react-icons/bs'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <>
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
          <NavLink className='btn shopButton btn-lg text-white' to='/login'>Sign In as Customer</NavLink>
          <NavLink className='btn shopButton btn-lg text-white' to='/agent/login'>Sign In as Manager</NavLink>
        </div>
      </div>
        </>
    }
}

export default HomePage;
