import { useEffect, useState } from "react";
import React from "react";
import {BsFillPersonFill,BsFillPersonCheckFill,BsFillCartFill,BsCartXFill,BsCartCheckFill} from 'react-icons/bs'
import './dashboard.css'
import Navbar from '../components/navbar/navbar.js'
import MonthlyChart from '../monthlyChart/monthyChart'
import axios from "axios";
function Dashboard()
{
  const currentUser='admin';
  const [dates,setDates]=useState();
  const [stats,setStatistics]=useState();
  const [orders,setOrders]=useState();
  const [subscribers,setSubscribers]=useState();
  const [customers,setCustomers]=useState();
  const [ordersByStatus,setOrdersByStatus]=useState({});
  useEffect(()=>{
    
    axios.get('http://localhost:3030/orders/getOrdersNumber/')
    .then(response=>{
      setOrders(response.data);
    })
    .catch(error=>{
      setOrders(0);
    })
  },[currentUser])
  useEffect(()=>{
    axios.get('http://localhost:3030/subscriber/getSubscribersCount/')
    .then(response=>{
      setSubscribers(response.data);
    })
    .catch(error=>{
      setSubscribers(0);
    })
  },[currentUser])
  useEffect(()=>{
    axios.get('http://localhost:3030/customers/getCustomersCount/')
    .then(response=>{
      setCustomers(response.data)
    })
    .catch(error=>{
      setCustomers(0);
    })
  },[currentUser])
  useEffect( ()=> {
     axios.get('http://localhost:3030/orders/getByStatus/')
    .then(response=>{
      setOrdersByStatus(response.data);
    })
    .catch(error=>{
      setOrdersByStatus({shipped:0,confirmed:0,waiting:0});
    })
  },[currentUser])
  useEffect(()=>{
    axios.get('http://localhost:3030/orders/perDateStatistics')
    .then(response=>{
      setDates(response.data.dates);
      setStatistics(response.data.stats);
    })
  })
    return (
        <React.Fragment>
        <Navbar />
        <div className="container mt-2">
            <div className="row d-flex justify-content-evenly">   
            <div className="col-md-3 col-lg-3 col-sm-2 m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column">
            <div className="p-2 d-flex justify-content-between">
              <div className="col dataBoxDesc d-inline  mx-3 p-1 h4  ">Subscribers</div>
              <div className="col dataBoxIcon d-inline m-1 p-1 d-flex justify-content-end">
               <BsFillPersonFill className="icon"></BsFillPersonFill>
              </div>
            </div>

            <div className="col-12 dataBoxInfo m-1 p-1">{subscribers}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">The total number of subscribers</footer>
        </div>
        <div className="col-md-3 col-lg-3 col-sm-2 m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column">
            <div className="p-2 d-flex justify-content-between">
              <div className="col dataBoxDesc d-inline  mx-3 p-1 h4 subs ">Customers </div>
              <div className="col dataBoxIcon d-inline m-1 p-1 d-flex justify-content-end">
               <BsFillPersonCheckFill className="icon"></BsFillPersonCheckFill>
              </div>
            </div>

            <div className="col-12 dataBoxInfo m-1 p-1">{customers}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">The percentage of subscribers conversion </footer>
        </div>
        <div className="col-md-3 col-lg-3 col-sm-2 m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column">
            <div className="p-2 d-flex justify-content-between">
              <div className="col dataBoxDesc d-inline  mx-3 p-1 h4 orders ">Orders </div>
              <div className="col dataBoxIcon d-inline m-1 p-1 d-flex justify-content-end">
               <BsFillCartFill className="icon"></BsFillCartFill>
              </div>
            </div>

            <div className="col-12 dataBoxInfo m-1 p-1">{orders}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">The total number of orders </footer>
        </div>
        <div className="col-md-3 col-lg-3 col-sm-2 m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column">
            <div className="p-2 d-flex justify-content-between">
              <div className="col dataBoxDesc d-inline  mx-3 p-1 h4 corders ">Confirmed  </div>
              <div className="col dataBoxIcon d-inline m-1 p-1 d-flex justify-content-end">
               <BsCartCheckFill className="icon"></BsCartCheckFill>
              </div>
            </div>

            <div className="col-12 dataBoxInfo m-1 p-1">{ordersByStatus.confirmed}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">The number of confirmed orders </footer>
        </div>
        <div className="col-md-3 col-lg-3 col-sm-2 m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column">
            <div className="p-2 d-flex justify-content-between">
              <div className="col dataBoxDesc d-inline  mx-3 p-1 h4 ccorders ">Shipped  </div>
              <div className="col dataBoxIcon d-inline m-1 p-1 d-flex justify-content-end">
               <BsCartCheckFill className="icon"></BsCartCheckFill>
              </div>
            </div>

            <div className="col-12 dataBoxInfo m-1 p-1">{ordersByStatus.shipped}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">The number of shipped orders </footer>
        </div>
        <div className="col-md-3 col-lg-3 col-sm-2 m-1 p-0 dataBox d-flex flex-column ">
          <header className="p-0"></header>
          <main className="d-flex flex-column">
            <div className="p-2 d-flex justify-content-between">
              <div className="col dataBoxDesc d-inline  mx-3 p-1 h4 cccorders ">Waiting</div>
              <div className="col dataBoxIcon d-inline m-1 p-1 d-flex justify-content-end">
               <BsCartCheckFill className="icon"></BsCartCheckFill>
              </div>
            </div>

            <div className="col-12 dataBoxInfo m-1 p-1">{ordersByStatus.waiting}</div>
          </main>
          <footer className="m-0 p-2 dataBoxFooter ">The number of shipped orders </footer>
        </div>
        <div className="row mt-2">
          <div className="col chart">
          <MonthlyChart dates={dates} stats={stats}/>
          </div>
        </div>



            </div>
        </div>
        </React.Fragment>
    )
}
export default Dashboard;