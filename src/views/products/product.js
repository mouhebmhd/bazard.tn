import React, { Component } from 'react'
import Navbar from '../components/navbar/navbar'
import './product.css'
import axios from 'axios'
import carIcon from '../../assets/icon/car.png'
import babyIcon from '../../assets/icon/ducky.png'
import multimedia from '../../assets/icon/headphones.png'
import house from '../../assets/icon/house.png'
import more from '../../assets/icon/more.png'
import animals from '../../assets/icon/paw.png'
import tools from '../../assets/icon/rake.png'
import mode from '../../assets/icon/robe.png'
import garden from '../../assets/icon/watering-can.png'
import job from '../../assets/icon/suitcase.png'
import game from '../../assets/icon/videogames.png'
import phone from '../../assets/icon/smartphone.png'
import pieces from '../../assets/icon/settings.png'
class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: [],
      categoriesIcons: [
        carIcon,
        house,
        phone,
        pieces,
        multimedia,
        job,
        mode,
        garden,
        tools,
        game,
        babyIcon,
        animals,
        more
      ],
      showCategoryProduct:function (categoryID){console.log(categoryID)},
      products:[]
    }
  }

  componentDidMount () {
    axios
      .get('http://localhost:3030/categories/getAllCategories/')
      .then(response => {
        this.setState({ categories: response.data })
        console.log(this.state.categories)
      })
      .catch(error => {
        console.log('Error fetching categories:', error)
      })
      axios.get('http://localhost:3030/product/getAllProducts/')
      .then(response=>{
        this.setState({products:response.data})
        console.log(response.data)
      })
      .catch(error=>{
        console.log('enable to load products ')
      })
  }

  render () {
    const { categories } = this.state
    const categoriesIcons = this.state.categoriesIcons

    // Render the entire component only if categories are available
    if (categories.length === 0) {
      return null // Or render an error message or loading indicator
    }

    return (
      <>
        <Navbar />
        <div className='container-fluid '>
          <div className='row mt-2'>
            <div className='col-12 sidebar bg-white d-flex flex-xl-nowrap '>
              {categories.map((category, index) => {
                return (
                  <div className='categoryContainer  p-1 m-1 d-flex justify-content-center d-flex flex-column justify-content-center align-items-center ' onClick={()=>{this.state.showCategoryProduct(category._id)}}>
                    <img
                      src={categoriesIcons[index]}
                      alt=''
                      className='categoryIcon mx-2  '
                    />
                    {category.categoryName}
                  </div>
                )
              })}
            </div>
            <h2 className='text-center productsTitle'>Explore Our Products</h2>
            <div className='container-fluid m-0 p-0'>
            <div className="row justify-content-center gap-3 d-flex flex-wrap v">
                {this.state.products.map(product=>{
                    return <>
                <div className='card col-xl-3 col-md-4 col-sm-6  ' key={product._id} style={{width: '18rem'}}>
                <img className='card-img-top' src={product.productImage} alt='Card image cap' />
                <div className='card-body'>
                  <h5 className='card-title'>{product.productName}</h5>
                  <p className='card-text'>
                    {product.productDescription}
                  </p>
                  <a href='#' className='btn btn-primary d-block '>
                    Add to cart 
                  </a>
                </div>
              </div></>
                })}
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
}

export default Product
