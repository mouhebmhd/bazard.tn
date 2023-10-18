import axios from "axios";
import { useEffect, useState } from "react";

function UpdateProduct(props) {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [productCategory, setProductCategory] = useState(''); // Initialize with an empty string
  const [productPhoto, setProductPhoto] = useState(null); // Initialize with null, as it's a file input

  var currentProduct =props.productID;
  const sayHello=()=>{
    console.log('first')
  }
  const updateProductFunction=()=>{
    var hasError=false;
    if(productName=='')
    {
        hasError=true;
        document.getElementById('productName').style.border='1px solid red';
    }
    else
    {
        document.getElementById('productName').style.border='1px solid green';
    }
    if(productDescription=='')
    {
        hasError=true;
        document.getElementById('productDescription').style.border='1px solid red';
    }
    else
    {
        document.getElementById('productDescription').style.border='1px solid green';
    }
    if(unitPrice=='' || isNaN(unitPrice))
    {
        hasError=true;
        document.getElementById('unitPrice').style.border='1px solid red';
    }
    else
    {
        document.getElementById('unitPrice').style.border='1px solid green';
    }
    if(productCategory=='')
    {
        hasError=true;
        document.getElementById('productCategory').style.border='1px solid red';
    }
    else
    {
        document.getElementById('productCategory').style.border='1px solid green';
    }
    if(productPhoto==null)
    {
      setProductPhoto(product.productImage)
    }
    if(hasError==false)
    {
      axios.put('http://localhost:3030/product/updateProduct/',{id:currentProduct,productName,productCategory,productDescription,productPhoto,unitPrice,productPhoto})
      .then(response=>{
          console.log(response)
      })
      .catch(error=>{
          console.log(error)
      })
    }
  }
    const  setProductPhotoFunction=async (file)=>
    {
    const formData=new FormData();
    formData.append('file',file);
    formData.append('upload_preset','xlcnkdgy');
    await axios.post('https://api.cloudinary.com/v1_1/dik98v16k/image/upload/',formData)
    .then(response=>{
      console.log(response.data.secure_url)
      setProductPhoto(response.data.secure_url)

    })
    .catch(error=>{console.log(error)})
    }
  useEffect(() => {
    console.log(props)
    axios.get('http://localhost:3030/categories/getAllCategories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentProduct]);
  
  useEffect(()=>{
    if(currentProduct)
    {
    axios.get('http://localhost:3030/product/getProductById/'+currentProduct)
    .then(response=>{
      setProduct(response.data)
      setProductName(response.data.productName)
      setProductDescription(response.data.productDescription)
      setUnitPrice(response.data.unitPrice)
      setProductPhoto(response.data.productImage)
      setProductCategory(response.data.categoryId)
    })
    .catch(error=>{
      console.log(error)
    })
  }},[currentProduct])
  if(product)
  {
  return (
    <div className="modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateModalLabel">Update Product</h5>
            <button type="button" className="close btn" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group my-2">
                <label htmlFor="productName">Product Name</label>
                <input type="text" className="form-control" id="productName" placeholder="Product Name" value={productName} onChange={(event) => setProductName(event.target.value)} name="productName" />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productDescription">Product Description</label>
                <input type="text" className="form-control" id="productDescription" placeholder="Product Description" value={productDescription} onChange={(event) => setProductDescription(event.target.value)} name="productDescription" />
              </div>
              <div className="form-group my-2">
                <label htmlFor="unitPrice">Unit Price</label>
                <input type="text" className="form-control" id="unitPrice" placeholder="Product Unit Price" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} name="unitPrice" />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productCategory">Product Category </label>
                <select name="productCategory" className='form-control' id="productCategory" value={productCategory} onChange={(event) => {setProductCategory(event.target.value)}}>
                  <option key='null' value="" disabled>Please select a product category</option>
                  {categories.map(category => {
                    return <option key={category._id} value={category._id} >{category.categoryName}</option>
                  })}
                </select>
              </div>
              <div className="form-group my-2">
                <label htmlFor="productPhoto">Product Photo</label>
                <input type="file" className="form-control" id="productPhoto" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={(event) => setProductPhotoFunction(event.target.files[0])} name="productPhoto" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <input type="button" className="btn btn-primary" onClick={()=>{updateProductFunction()}} value='UpdateProduct' />
          </div>
        </div>
      </div>
    </div>
  );
}}

export default UpdateProduct;
