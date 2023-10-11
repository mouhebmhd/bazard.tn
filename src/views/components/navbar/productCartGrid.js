import React from "react";
import './productCart.css'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import {BsCartCheck} from 'react-icons/bs'
import axios from "axios";

function ProductGrid(props) {
  function updateCount(itemID,modifcation) {
    const newValue=parseInt(document.getElementById(itemID).textContent)+modifcation;
    axios.put('http://localhost:3030/cart/updateItemCount/', { itemID, newValue })
      .then(response => {
        console.log(response.data);
        // Update the item count directly in the DOM
        const itemCountElement = document.getElementById(itemID);
        if (itemCountElement) {
          itemCountElement.textContent = newValue;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
function validateCommand(){
  axios.put('http://localhost:3030/cart/validateCart/',{customerID:localStorage.getItem('currentUser')})
  .then(response=>{
    window.location='/orders'
  })
  .catch(error=>{
    console.log(error)
  })
}
  function removeItem(itemID) {
    console.log(itemID)
    axios.delete('http://localhost:3030/cart/removeItem/' + itemID)
      .then((response) => {
        console.log(response.data)
        document.getElementById(itemID).parentElement.parentElement.style.display='none';
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row p-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Description</th>
                <th scope="col">Price Per Unit</th>
                <th scope="col">Quantity</th>
                <th scope="col">SubTotal Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.items.map((item, index) => {
                return <tr key={item._id}>
                  <td><img src={props.products[index].productImage} alt="" className="productImage" /></td>
                  <td>{props.products[index].productName}</td>
                  <td>{props.products[index].productDescription}</td>
                  <td>{props.products[index].unitPrice}</td>
                  <td className="">
                    <IoIosRemoveCircleOutline className="modifyCount minusOne" onClick={() => { updateCount(item._id,-1) }}></IoIosRemoveCircleOutline>
                    <p id={item._id} className="d-inline">{item.productCount}</p> Piece
                    <IoIosAddCircleOutline className="modifyCount plusOne" onClick={() => { updateCount(item._id,1) }}></IoIosAddCircleOutline>
                  </td>
                  <td>{(parseFloat(item.productCount) * parseFloat(props.products[index].unitPrice)).toFixed(2)} DT</td>
                  <td><button className="btn removeItemButton  btn-outline-danger" onClick={() => { removeItem(item._id) }}><RiDeleteBin6Line className="m-0 mx-1 h4 "></RiDeleteBin6Line>Remove Item</button></td>
                </tr>
              })}
            </tbody>
          </table>
          <button className="btn  col-3  m-auto btn-outline-success " onClick={validateCommand}><BsCartCheck className="h4"></BsCartCheck> <span className="h5">Validate the Command</span></button>
        </div>
      </div>
    </>
  );
}

export default ProductGrid;
