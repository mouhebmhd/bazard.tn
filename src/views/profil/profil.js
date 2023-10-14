import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import './profil.css';
import { useParams } from "react-router-dom";
import axios from "axios";

function Profil() {
  const userID = useParams().id;
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar: '',
    phone: '',
    regionAddress: '',
    cityAddress: '',
    postalCode: '',
    password: '',
  });
  
  useEffect(() => {
    axios.get('http://localhost:3030/customer/getProfilInfo/' + userID)
      .then((response) => {
        setUserData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userID]);

  useEffect(() => {
    setCustomerName(userData.name || '');
    setCustomerEmail(userData.email || '');
    setCustomerPhoto(userData.avatar || '');
    setCustomerPhoneNumber(userData.phone || '');
    setCustomerAddressRegion(userData.regionAddress || '');
    setCustomerAddressCity(userData.cityAddress || '');
    setCustomerAddressPostalCode(userData.postalCode || '');
    setCustomerOldPassword(userData.password || '');
  }, [userData]);

  // Define state variables and error variables for all fields
  const [customerName, setCustomerName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [customerPhoto, setCustomerPhoto] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [customerAddressRegion, setCustomerAddressRegion] = useState();
  const [customerAddressCity, setCustomerAddressCity] = useState();
  const [customerAddressPostalCode, setCustomerAddressPostalCode] = useState();
  const [customerOldPassword, setCustomerOldPassword] = useState();
  const [customerNewPassword, setCustomerNewPassword] = useState('');

  function setCustomerPhotoFunction(event) {
    var file=event.target.files[0];
    const formData=new FormData();
    formData.append('file',file);
    formData.append('upload_preset','xlcnkdgy');
    axios.post('https://api.cloudinary.com/v1_1/dik98v16k/image/upload/',formData)
    .then(response=>{setCustomerPhoto(response.data.secure_url)})
    .catch(error=>{console.log(error)})
  }

  function updateProfil() {
    // Define an array to hold error messages for empty fields
    const errors = [];
  
    // Check each field and add an error message if it's empty
    if (!customerName.trim()) {
      errors.push("Name is required");
    }
  
    if (!customerEmail.trim()) {
      errors.push("Email is required");
    }
  
    if (!customerPhoneNumber.trim()) {
      errors.push("Phone Number is required");
    }
  
    if (!customerAddressRegion.trim()) {
      errors.push("Address Region is required");
    }
  
    if (!customerAddressCity.trim()) {
      errors.push("Address City is required");
    }
  
    if (!customerAddressPostalCode.trim()) {
      errors.push("Postal Code is required");
    }
  
    if (!customerOldPassword.trim()) {
      errors.push("Old Password is required");
    }
  
    // Check if there are any errors
    if (errors.length > 0) {
      // Display error messages or handle them as needed
      for (const error of errors) {
        console.error(error);
      }
    } else {
      // If there are no errors, you can proceed with the update
      axios
        .put("http://localhost:3030/customer/updateProfile/", {
        id:localStorage.getItem('currentUser'),
        customerName,
          customerEmail,
          customerPhoto,
          customerPhoneNumber,
          customerAddressRegion,
          customerAddressCity,
          customerAddressPostalCode,
          customerNewPassword,
        })
        .then((response) => {
          console.log(response);
          window.location.reload()
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }
  

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="row mt-2">
          <h1 className="text-center pageTitle">Your Profile</h1>
          <div className="col d-flex justify-content-center flex-column p-2 align-items-center">
            <div className="profilPhotoContainer " style={{ backgroundImage: 'url(' + userData.avatar + ')' }}></div>
            <div className="col-12 mt-2">
              <form className="pt-3 bg-white">
                <div className="row justify-content-center">
                <div className="form-group my-2 col-lg-4 col-md-6 col-sm-12 col-lg-4 col-md-6 col-sm-12">
                  <label htmlFor="customerName">Your Name</label>
                  <input type="text" className="form-control" id="customerName"  placeholder={userData.name} onChange={(event) => { setCustomerName(event.target.value) }} name="customerName" />
                </div>
                <div className="form-group my-2 col-lg-4 col-md-6 col-sm-12">
                  <label htmlFor="customerEmail">Your Email</label>
                  <input type="email" className="form-control" id="customerEmail" placeholder={userData.email} onChange={(event) => { setCustomerEmail(event.target.value) }} name="customerEmail" />
                </div>
                <div className="form-group my-2 col-lg-4 col-md-6 col-sm-12">
                  <label htmlFor="customerPhoto">Profile Photo Link</label>
                  <input type="file" className="form-control" id="customerPhoto" placeholder="Please attach a link to a profile Photo" onChange={(event) => { setCustomerPhotoFunction(event) }} name="customerPhoto" accept="image/*" />
                </div>
                <div className="form-group my-2 col-lg-4 col-md-6 col-sm-12">
                  <label htmlFor="customerPhoneNumber">Phone Number</label>
                  <input type="text" className="form-control" id="customerPhoneNumber" placeholder={userData.phone} onChange={(event) => { setCustomerPhoneNumber(event.target.value) }} name="customerPhoneNumber" />
                </div>
                <div className="form-group my-2 col-lg-4 col-md-6 col-sm-12">
                  <label htmlFor="customerAddressRegion">Address Region</label>
                  <input type="text" className="form-control" placeholder={userData.regionAddress} id="customerAddressRegion" onChange={(event) => { setCustomerAddressRegion(event.target.value) }} name="customerAddressRegion" />
                </div>
                <div className="form-group my-2 col-lg-4 col-md-6 col-sm-12">
                  <label htmlFor="customerAddressCity">Address City</label>
                  <input type="text" className="form-control"  placeholder={userData.cityAddress} id="customerAddressCity"  onChange={(event) => { setCustomerAddressCity(event.target.value) }} name="customerAddressCity" />
                </div>
                <div className="form-group my-2 col-lg-4 col-md-6 col-sm-12">
                  <label htmlFor="customerAddressPostalCode">Postal Code</label>
                  <input type="text" className="form-control" placeholder={userData.postalCode} id="customerAddressPostalCode" onChange={(event) => { setCustomerAddressPostalCode(event.target.value) }} name="customerAddressPostalCode" />
                </div>
                <div className="form-group my-2 col-lg-4 col-md-6 col-sm-12">
                  <label htmlFor="customerPassword">Old Password</label>
                  <input type="password" className="form-control" id="customerOldPassword" placeholder="Password" onChange={(event) => { setCustomerOldPassword(event.target.value) }} name="customerPassword" />
                </div>
                <div className="mt-3 text-center">
                  <button type="button" tabIndex="1" className="btn btn-primary loginAccount" onClick={updateProfil}>
                    <i className="bi  bi-box-arrow-right"></i> Update Profile
                  </button>
                </div>
                </div>
               
              </form>
            </div>
          </div>
        </div> 
      </div>
    </>
  )
}

export default Profil;
