import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar';
import './product.css';
import axios from 'axios';
import {BsPen} from 'react-icons/bs'
import { AiOutlineShoppingCart,AiFillDelete } from 'react-icons/ai';
import {MdAdd } from 'react-icons/md';
import AddProduct from '../components/addProduct';
import  UpdateProduct  from '../components/updateProduct';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoriesIcons: [
        require('../../assets/icon/car.png'),
        require('../../assets/icon/house.png'),
        require('../../assets/icon/smartphone.png'),
        require('../../assets/icon/settings.png'),
        require('../../assets/icon/headphones.png'),
        require('../../assets/icon/suitcase.png'),
        require('../../assets/icon/robe.png'),
        require('../../assets/icon/watering-can.png'),
        require('../../assets/icon/rake.png'),
        require('../../assets/icon/videogames.png'),
        require('../../assets/icon/ducky.png'),
        require('../../assets/icon/paw.png'),
        require('../../assets/icon/more.png'),
      ],
      products: [],
      allProducts: [],
      productToUpdate:''
    };
  }
  addToCart(productId){
    axios.post('http://localhost:3030/cart/addToCart/',{productId,customerId:localStorage.getItem('currentUser')})
    .then(response=>{console.log(response)})
    .catch(error=>{console.log(error)})
  }
  deleteProduct(productID){
    axios.delete('http://localhost:3030/product/deleteProduct/'+productID)
    .then(response=>{
      console.log(response.data)
      window.location.reload()
    })
    .catch(error=>{
      console.log(error)
    })

  }
  updateProduct(productID)
  {
   this.setState({productToUpdate:productID})
  }
  showCategoryProduct(categoryID) {
    axios
      .get('http://localhost:3030/product/getProductsByCategoryId/' + categoryID.toString())
      .then((response) => {
        this.setState({ products: response.data });
        this.setState({ allProducts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(categoryID);
  }
   generateSearchResult(event)
  {    
    const request=event.currentTarget.value.toLowerCase();
    console.log(request)
    const searchedProducts=this.state.products.filter(product=>{
      return product.productName.toLowerCase().indexOf(request)>-1
    })
    this.setState({products:searchedProducts})
  }
  componentDidMount() {
    axios
      .get('http://localhost:3030/categories/getAllCategories/')
      .then((response) => {
        this.setState({ categories: response.data });
        console.log(this.state.categories);
      })
      .catch((error) => {
        console.log('Error fetching categories:', error);
      });

    axios
      .get('http://localhost:3030/product/getAllProducts/')
      .then((response) => {
        this.setState({ products: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Unable to load products');
      });
  }

  render() {
    const { categories } = this.state;

    // Render the entire component only if categories are available
    if (categories.length === 0) {
      return null; // Or render an error message or loading indicator
    }

    return (
      <>
        <Navbar />
        <div className='container-fluid '>
          <div className='row mt-2'>
            <div className='col-12 sidebar bg-white d-flex flex-xl-nowrap '>
              {categories.map((category, index) => {
                return (
                  <div
                    className='categoryContainer  p-1 m-1 d-flex justify-content-center d-flex flex-column justify-content-center align-items-center '
                    onClick={() => {
                      this.showCategoryProduct(category._id);
                    }}
                    key={category._id}
                  >
                    <img src={this.state.categoriesIcons[index]}  className='categoryIcon mx-2' />
                    {category.categoryName}
                  </div>
                );
              })}
            </div>
            <h2 className='text-center productsTitle'>Explore Our Products</h2>
            <div className="container-fluid m-2">
              <div className="row d-flex justify-content-center">
                <div className="searchBar col-sm-12 col-md-6 col-xl-4 col-lg-4 d-flex">      
                <input className="form-control mr-sm-2 searchBarInput " type="search" placeholder="Search a product here" aria-label="Search" onChange={event=>{this.generateSearchResult(event)}} /></div>
                {(localStorage.getItem('role')=='admin')&&(
                          <button className=' col-2 btn btn-primary d-flex  addToCart align-items-center ' data-toggle="modal" data-target="#exampleModal">
                            <MdAdd className='h4 mt-2 mx-2 addButton '></MdAdd> Add New Product
                          </button>) }
              </div>
            </div>
            <div className='container-fluid m-0 p-0'>
              <div className='row justify-content-center gap-3'>
                {this.state.products.map((product) => {
                  return (
                    <div className='card col-xl-3 col-md-4 col-sm-6' key={product._id} style={{ width: '18rem' }}>
                      <img className='card-img-top' src={product.productImage} alt='Card image cap' />
                      <div className='card-body'>
                        <h5 className='card-title'>{product.productName}</h5>
                        <p className='card-text'>{product.productDescription}</p>
                        <p className='card-price'>
                          <span className='fw-bold'>Price </span> {product.unitPrice} DT
                        </p>
                        <div className='col d-flex justify-content-center flex-column row-gap-2'>
                          {(localStorage.getItem('role')=='customer')&&(
                          <button className='btn btn-primary d-flex  addToCart align-items-center ' onClick={()=>{this.addToCart(product._id)}}>
                            <AiOutlineShoppingCart className='h4 mt-2 mx-2'></AiOutlineShoppingCart> Add to cart
                          </button>) }
                          {(localStorage.getItem('role')=='admin')&&(
                          <button className='btn btn-primary d-flex  addToCart align-items-center ' onClick={()=>{this.deleteProduct(product._id)}}>
                            <AiFillDelete className='h4 mt-2 mx-2'></AiFillDelete> Delete Product
                          </button>) }
                          {(localStorage.getItem('role')=='admin')&&(
                          <button className='btn btn-primary d-flex  addToCart updateButton align-items-center ' onClick={()=>{this.updateProduct(product._id)}} data-toggle='modal' data-target='#updateModal'>
                            <BsPen className='h4 mt-2 mx-2'></BsPen> Update Product
                          </button>) }
                          
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
                <AddProduct></AddProduct>
                <UpdateProduct productID={this.state.productToUpdate}></UpdateProduct>


      </>
    );
  }
}

export default Product;