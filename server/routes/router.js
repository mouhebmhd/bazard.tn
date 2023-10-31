const express = require('express');
const route = express.Router();
const controller=require('../controller/controller')
var jwt=require('jsonwebtoken');




/***************Statistics for the dashboard**************/
route.get('/orders/getOrdersNumber/',(req,res)=>{
   controller.getOrderCount(req,res);
});
route.get('/subscriber/getSubscribersCount/',(req,res)=>{
   controller.getSubscribersCount(req,res);
})
route.get('/customers/getCustomersCount/',(req,res)=>{
   controller.getDistinctCustomerCount(req,res);
})
route.get('/orders/getByStatus/',(req,res)=>{
   controller.getOrdersByStatus(req,res);
})
route.get('/orders/perDateStatistics/',(req,res)=>{
   controller.getOrderStatisticsForCurrentMonth(req,res);
})
/****************login routes***********************/
//agent login route
route.post('/agent/login/',(req,res)=>{
   controller.loginAgent(req,res);
});
//admin login route
route.post('/admin/login/',(req,res)=>{
   controller.authentificateAdmin(req,res);
});
//admin login
//customer login
route.post('/customer/login/',(req,res)=>{
   controller.loginCustomer(req,res);
})
/****************POST routes***********************/

/************Customer POST routes*************/
//add a new customer
route.post('/customer/register/',(req,res)=>{
   controller.customerRegister(req,res);
});
/************Agent POST routes*************/
//add a new agent
route.post('/agent/addNewAgent/',(req,res)=>{
   controller.addNewAgent(req,res);
});
/************Product POST routes*************/
//add a new product
route.post('/product/addNewProduct/',(req,res)=>{
   controller.addNewProduct(req,res);
});
/************Product POST routes*************/
route.post('/categories/addNewCategory/',(req,res)=>{
   controller.addNewCategory(req,res);
});
/****************Get routes***********************/
//route to get the exact role of an user 
route.get('/user/hasRole/:id',(req,res)=>{
   controller.getExactRole(req,res);
})
/************Agent routes*************/
//get all agents
route.get('/agent/getAllAgents/',(req,res)=>{
   controller.getAllAgents(req,res);
});
//get agent by ID
route.get('/agent/getById/:id',(req,res)=>{
   controller.getAgentById(req,res);
});
//get customer info
route.get('/customer/getProfilInfo/:customerID',(req,res)=>{
   controller.getCustomerProfilInfo(req,res);
})
/************Product routes*************/
//get all products
route.get('/product/getAllProducts/',(req,res)=>{
   controller.getAllProducts(req,res);
});
//get product By ID
route.get('/product/getProductById/:id',(req,res)=>{
   controller.getProductById(req,res);
})
//get all the products of a certain category 
route.get('/product/getProductsByCategoryId/:categoryId',(req,res)=>{
   controller.getProductsByCategoryID(req,res);
});
//get all the ordered products of an user AKA cart items
route.get('/cart/getCartItems/:customerId',(req,res)=>{
   controller.getCartItems(req,res)
})
/************Categories routes*************/
//get all categories
route.get('/categories/getAllCategories/',(req,res)=>{
   controller.getAllCategories(req,res);
});
//get categoryById
route.get('/categories/getCategoryById/:id',(req,res)=>{
   controller.getCategoryById(req,res);
});
/************Categories routes*************/
route.post('/cart/addToCart/',(req,res)=>{
   controller.addToCart(req,res);
})
/************Order routes*************/
//get all orders to manage 
route.get('/order/getAllOrdersToManage/',(req,res)=>{
   controller.getAllOrdersTOManage(req,res);
})
route.get('/order/getAllOrders/:customerID',(req,res)=>
{controller.getAllOrders(req,res);
})
//get the list of products of a custom order
route.get('/order/getOrderItems/:orderID',(req,res)=>{
   controller.getOrderItems(req,res);
})
/****************Delete routes***********************/
/************Agent routes*************/
//delete agent
route.delete('/agent/deleteAgent/:id',(req,res)=>{
   controller.deleteAgent(req,res);
});
/*************Products routes***********/
route.delete('/product/deleteProduct/:id',(req,res)=>{
   controller.deleteProduct(req,res);
})
//delete definitevily 
route.delete('/agent/deleteAgentPermanently/:id',(req,res)=>{
   controller.deleteAgentPermanently(req,res);
});
/************Category routes*************/
//delete Category
route.delete('/categories/deleteCategory/:id',(req,res)=>{
   controller.deleteCategory(req,res);
})
/*************Cart routes***********/
route.delete('/cart/removeItem/:itemID',(req,res)=>{
   controller.removeCartItem(req,res);
})



/****************Update routes***********************/
/************Agent routes*************/
//activate agent account 
route.put('/agent/activateAgent/:id',(req,res)=>{
   controller.activateAgent(req,res);
});
//block an agent
route.put('/agent/blockAgent/:id',(req,res)=>{
   controller.blocAgent(req,res);
});
//unblock an agent 
route.put('/agent/unBlockAgent/:id',(req,res)=>{
   controller.unBlockAgent(req,res);
});
//restore agent account
route.put('/agent/restoreAgent/:id',(req,res)=>{
   controller.restoreAgent(req,res);
})
//update agent profile
route.put('/agent/updateProfile/',(req,res)=>{
   controller.updateAgentProfile(req,res);
});
/*********Admin Update Functions************/
//update admin profile
route.put('/admin/updateProfile/',(req,res)=>{
   controller.updateAdminProfile(req,res);
});
/**********Customer update Profil***************/
//update customer profile
route.put('/customer/updateProfile/',(req,res)=>{
   controller.updateCustomerProfile(req,res);
});
/*********Product Update Functions*************/
//update product 
route.put('/product/updateProduct/',(req,res)=>{
   controller.updateProduct(req,res);
 })
;
/************Category routes*************/
route.put('/categories/updateOne/',(req,res)=>{
   controller.updateCategory(req,res);
})
/************Cart  routes*************/
//update cart item count
route.put('/cart/updateItemCount/',(req,res)=>{
   controller.updateItemCount(req,res);
})
//validate the whole cart 
route.put('/cart/validateCart/',(req,res)=>{
   controller.validateCart(req,res);
 })
 /************Order  routes*************/
route.put('/order/updateOrderStatus/',(req,res)=>{
   controller.updateOrderStatus(req,res)
})
module.exports=route;