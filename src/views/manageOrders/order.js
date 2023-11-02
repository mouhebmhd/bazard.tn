import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { Link } from 'react-router-dom';
function Order(){
   
    
    function updateOrderStatus(orderID,newOrderStatus)
    {
        axios.put('http://localhost:3030/order/updateOrderStatus/',{orderID,newOrderStatus})
        .then(response=>{
            console.log(response);
            window.location.reload( )
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function isShipped(status,buttonStyle)
    {
            return 'btn  shippedButton '+buttonStyle;
        
    }
    function isReceivedByTheCustomer(status,buttonStyle)
    {
        if(status=='received')
        {
            return 'd-none'
        }
        else
        {
            return 'btn  shippedButton '+buttonStyle;
        }
    }
    function isValidated(status)
    {
        
            return 'btn btn-outline-primary cancelButton'
        
    }
    const [orders,setOrders]=useState('');
    var customerID=localStorage.getItem('currentUser');
    useEffect(()=>{
        axios.get('http://localhost:3030/order/getAllOrdersToManage/')
        .then(response=>{
            setOrders(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[customerID])
    if(orders.length>0)
    {
        return (<> <Navbar/> 
        <table className="table m-2">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Order Date</th>
      <th scope="col">Order Status </th>
      <th scope="col">Shipping Address</th>
      <th scope="col">Total Price</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody className=''>
        {orders.map((order,index)=>{
            return <tr key={order._id}>
                <td className="fw-bold">{index+1}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderStatus}</td>
                <td>{order.shippingAdress}</td>
                <td>{order.totalPrice}</td>
                <td className='d-flex gap-1'> 
                    <button className={isReceivedByTheCustomer(order.orderStatus,'btn-outline-success')+' btn-outline-primary'} onClick={()=>{updateOrderStatus(order._id,'received')}}>Mark as received</button>
                    <button className={isShipped(order.orderStatus,'btn-outline-success') + ' btn-outline-dark'} onClick={()=>{updateOrderStatus(order._id,'delivred')}}>Mark as shipped</button>
                    <button className={isShipped(order.orderStatus,'btn-outline-success')+ ' btn-outline-warning'} onClick={()=>{updateOrderStatus(order._id,'not shipped')}}>Mark as not shipped</button>
                    <button className={isValidated(order.orderStatus)+' btn-outline-danger'} onClick={()=>{updateOrderStatus(order._id,'canceled')}}>Cancel order</button>
                </td>
            </tr>
        })}

   
  </tbody>
</table>


</>)
    }
    else 
    {return (
        <>
       
        </>
    )}

}

export default Order;