import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './customOrder.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ProductGrid from '../components/navbar/productCartGrid.js'
function ShoppingCart () {
  const orderID=useParams().id;
  const [products, setProducts] = useState([]);

 useEffect(()=>{
    
  axios.get('http://localhost:3030/order/getOrderItems/'+orderID)
  .then(response=>{
   setProducts(response.data);
   console.log(response.data);
  })
  .catch(error=>{
   console.log(error)
  })
 },[orderID])
  if (products.length > 0) {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container-fluid">
        <div className="row p-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Description</th>
                <th scope="col">Product Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return <tr key={product._id}>
                  <td><img src={product.productImage} alt="" className="productImage" /></td>
                  <td>{product.productName}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.unitPrice}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Navbar />
        <div className='container cartPageContainer p-2 noProductContainer d-flex   align-items-center flex-column'>
          <h2 className=' noProductMessage '>No products in this order</h2>
          <Link to='/products'>
          </Link>
        </div>
      </React.Fragment>
    )
  }
}
export default ShoppingCart
