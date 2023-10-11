import React from "react";
import Index from "./views/indexPage/indexPage";
import Home from "./views/homePage/homePage";
import Login from "./views/login/login";
import ShopCart from './views/cartPage/cartPage'
import Register from "./views/signIn/signIn";
import OrderPage from './views/order/order'
import { Routes, Route } from "react-router-dom";
import CustomOrder from './views/customOrder/customOrder'
import Products from './views/products/product' ;
function Routers() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopCart" element={<ShopCart />} />
          <Route path="/customOrder/:id" element={<CustomOrder />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
    </>
  );
}

export default Routers;
