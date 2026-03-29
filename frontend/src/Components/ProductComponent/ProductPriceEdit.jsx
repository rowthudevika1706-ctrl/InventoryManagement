import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import {getProductById,editProductPrice} from '../../Services/ProductService';
import "./Product.css";
import { color } from 'chart.js/helpers';


const ProductPriceEdit = ({ setActivePage, pid }) => {
 let navigate=useNavigate();
const [newPrice,setNewPrice]=useState(0.0);
const[product,setProduct]=useState({
 productId:"",
 productName:"",
 skuId:"",
 purchasePrice:0.0,
 salesPrice:0.0,
 reorderLevel:0.0,
 stock:0.0,
 vendorId:"",
 status:true,
})

const [flag,setFlag]=useState(false);

const setProductData=()=>{
    getProductById(pid).then(response=>{
        setProduct(response.data);
    })
}

useEffect(()=>{
    setFlag(false);
    setProductData();
},[]);

const returnBack = () => {
  setActivePage({ page: "productList" });
}

const onChangeHandler=(event)=>{
    setNewPrice(event.target.value);
}

const updatePrice=(event)=>{
    event.preventDefault();
    product.purchasePrice=newPrice;
    editProductPrice(product).then(response=>{
        setFlag(true);
    })
}

return (
 <div>
    <br />
   <div className="card col-md-6 offset-md-3">
    <h3 className="text-center">Edit Product Price</h3>
    <div className="card-body">
        <div className="row">
            <label> Product Id: &nbsp;{product.productId}</label>
        </div>
        <div className="row">
            <label>SKU Id: &nbsp;{product.skuId}</label>
        </div>
        <div className="row">
            <label>Product Name: &nbsp;{product.productName}</label>
        </div>
        <div className="row">
            <label>Purchase Price: &nbsp;{product.purchasePrice}</label>
        </div>
        <div className="row">
            <label>Sales Price: &nbsp;{product.salesPrice}</label>
        </div>
        <div className="row">&nbsp;
            <label>Re Order Level: &nbsp;{product.reorderLevel}</label>
        </div>
        <div className="row">&nbsp;
            <label > Stock: &nbsp;{product.stock}</label>
        </div>
        <div className="row">&nbsp;
            <label > VendorId: &nbsp;{product.vendorId}</label>
        </div>
    </div>
    <div className = "form-group">
          <label>Enter new Purchase Price: </label>
          <input placeholder="new price" name="newPrice" className="form-control" value={newPrice} onChange={onChangeHandler}/>
    </div>
    <div>
        {flag && <p style={{ color: "blue" }}>Product Price Updated... </p>}
        </div>
        <div>
          <button className="btn btn-success" onClick={updatePrice}>Save</button>
           &nbsp;&nbsp; &nbsp;&nbsp;
           <button className="btn btn-warning" onClick={returnBack}>Return</button>                    
        </div>
      </div>  
    </div>
)
}

export default ProductPriceEdit;


