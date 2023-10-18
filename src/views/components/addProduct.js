import axios from "axios";
import { useEffect, useState } from "react";

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [productCategory, setProductCategory] = useState(''); // Initialize with an empty string
  const [productPhoto, setProductPhoto] = useState(null); // Initialize with null, as it's a file input

  var currentUser = localStorage.getItem('currentUser');
    const  setProductPhotoFunction=async (file)=>
    {
    const formData=new FormData();
    formData.append('file',file);
    formData.append('upload_preset','xlcnkdgy');
    await axios.post('https://api.cloudinary.com/v1_1/dik98v16k/image/upload/',formData)
    .then(response=>{
        setProductPhoto(response.data.secure_url)
    })
    .catch(error=>{console.log(error)})
    }
  useEffect(() => {
    axios.get('http://localhost:3030/categories/getAllCategories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentUser]);
  const addNewProduct=()=>{
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
        hasError=true;
        document.getElementById('productPhoto').style.border='1px solid red';
    }
    else
    {
        document.getElementById('productPhoto').style.border='1px solid green';
    }
    if(hasError==false)
    {
        axios.post('http://localhost:3030/product/addNewProduct/',{productName,productCategory,productDescription,productPhoto,unitPrice})
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }
  }
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add new Product</h5>
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
                <label htmlFor="productCategory">Product Category</label>
                <select name="productCategory" className='form-control' id="productCategory" value={productCategory} onChange={(event) => {setProductCategory(event.target.value)}}>
                  <option key='null' value="" disabled>Please select a product category</option>
                  {categories.map(category => {
                    return <option key={category._id} value={category._id}>{category.categoryName}</option>
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
            <button type="button" className="btn btn-primary" onClick={addNewProduct}>Add Product </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
