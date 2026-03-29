import React, { useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {saveNewProduct,productIdGenerator} from '../../Services/ProductService';
import {getUsersByRole} from '../../Services/LoginService';
import {getAllCategories,getSkuIdByCategory} from '../../Services/SKUService';
import "./Product.css";

const ProductEntry = ({ setActivePage }) => {

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

let [newId, setNewId]=useState("");
const [vendorList, setVendorList]=useState([]);
const [skuCategoryList,setSkuCategoryList]=useState([]);
const [skuCategory,setSkuCategory]=useState("");
const [skuIdList,setSkuIdList]=useState([]);
let navigate = useNavigate();
const [errors, setErrors] = useState({});
const [flag,setFlag]=useState(false);

const setNewProductId = () => {
productIdGenerator().then((response) => {
setNewId(response.data);
});
}

const setVendors=()=>{
getUsersByRole('Vendor').then((response) => {
setVendorList(response.data);
});
}

const getSkuCategoryList=()=>{
getAllCategories().then((response) => {
setSkuCategoryList(response.data);
});
}

useEffect(() => {
setNewProductId();
setVendors();
getSkuCategoryList();
setFlag(false);
}, []);

const saveProduct = (event) => {
event.preventDefault();
product.productId=newId;
product.productName=skuCategory;

if(parseFloat(product.stock)<=parseFloat(product.reorderLevel))
product.status=false;

saveNewProduct(product).then(res=>{
setFlag(true);
});
};

const onChangeHandler = (event) =>{
event.persist();
const name = event.target.name;
const value = event.target.value;
setProduct(values =>({...values, [name]: value }));
};

const handleStateChange = (event) => {
let value = event.target.value;
if(value.trim() && toString(value.trim())!=="---"){
setSkuCategory(value);
getSkuIdByCategory(value).then((response) =>{
setSkuIdList(response.data);
});
}
}

const clearAll=()=>{
product.productName="";
product.skuId="";
product.purchasePrice= 0.0;
product.reorderLevel=0.0;
product.stock=0.0;
product.vendorId="";
}

const handleValidation = (event) => {
event.preventDefault();
let tempErrors = {};
let isValid = true;

if (!skuCategory.trim()) {
tempErrors.skuCategory = "Sku Category is required";
isValid = false;
}
else if(skuCategory.trim()==="---")
{
tempErrors.skuCategory = "Sku Category cannot be '---' ";
isValid = false;
}

if (!toString(product.purchasePrice).trim()) {
tempErrors.purchasePrice = "Purchase Price is required";
isValid = false;
}
else if (parseFloat(product.purchasePrice) <=0) {
tempErrors.purchasePrice="Purchase Price cannot be 0 or negetive";
isValid = false;
}

if (!toString(product.stock).trim()) {
tempErrors.stock = "Stock is required";
isValid = false;
}
else if (parseFloat(product.stock) <=0) {
tempErrors.stock="Stock cannot be 0 or negetive";
isValid = false;
}

if (!toString(product.reorderLevel).trim()) {
tempErrors.reorderLevel = "Reorder Level of stock is required";
isValid = false;
}
else if (parseFloat(product.reorderLevel) <=0) {
tempErrors.reorderLevel="Reorder Level cannot be 0 or negative";
isValid = false;
}

if (!product.skuId.trim()) {
tempErrors.skuId = "SKU is required";
isValid = false;
}
else if(product.skuId.trim()==='---')
{
    tempErrors.skuId = "SKU cannot be '---'";
isValid = false;
}


if (!product.vendorId.trim()) {
tempErrors.vendorId = "Vendor Id is required";
isValid = false;
}
else if(product.vendorId.trim()==="---")
{
tempErrors.vendorId = "Vendor cannot be '---'";
isValid = false;
}


setErrors(tempErrors);

if (isValid) {
saveProduct(event);
}
};

const nextEntry=()=>{
  newId="";
  product.productName="";
  product.skuId="";
  product.purchasePrice=0.0;
  product.reorderLevel=0.0;
  product.stock=0.0;
  product.vendorId="";

  setActivePage({ page: "productEntry" });
}

const returnBack = () => {
  setActivePage({ page: "dashboard" });
};

return (

<div className="product-page">

<div className="product-card">

<h2 className="form-title">New Product Addition</h2>

<form>

{/* PRODUCT ID */}
<div className="form-row-single">
<label>Product Id</label>
<input className="form-control" value={newId} disabled />
</div>

{/* SKU CATEGORY + SKU ID */}
<div className="form-row">

<div className="form-group">
<label>SKU Category</label>
<select
name="skuCategory"
className="form-control"
value={skuCategory}
onChange={(event) => handleStateChange(event)}
>
{skuCategoryList.map((skuCat,index)=>(
<option key={index} value={skuCat}>{skuCat}</option>
))}
</select>
{errors.skuCategory && <p className="error">{errors.skuCategory}</p>}
</div>

<div className="form-group">
<label>SKU Id</label>
<select
name="skuId"
className="form-control"
value={product.skuId}
onChange={onChangeHandler}
>
<option>---</option>
{skuIdList.map((skuNo,index)=>(
<option key={index} value={skuNo}>{skuNo}</option>
))}
</select>
{errors.skuId && <p className="error">{errors.skuId}</p>}
</div>

</div>

{/* PURCHASE + STOCK */}
<div className="form-row">

<div className="form-group">
<label>Purchase Price</label>
<input
name="purchasePrice"
className="form-control"
value={product.purchasePrice}
onChange={onChangeHandler}
/>
{errors.purchasePrice && <p className="error">{errors.purchasePrice}</p>}
</div>

<div className="form-group">
<label>Stock</label>
<input
name="stock"
className="form-control"
value={product.stock}
onChange={onChangeHandler}
/>
{errors.stock && <p className="error">{errors.stock}</p>}
</div>

</div>

{/* REORDER + VENDOR */}
<div className="form-row">

<div className="form-group">
<label>Reorder Level</label>
<input
name="reorderLevel"
className="form-control"
value={product.reorderLevel}
onChange={onChangeHandler}
/>
{errors.reorderLevel && <p className="error">{errors.reorderLevel}</p>}
</div>

<div className="form-group">
<label>Vendor Id</label>
<select
name="vendorId"
className="form-control"
value={product.vendorId}
onChange={onChangeHandler}
>
<option>---</option>
{vendorList.map((userId,index)=>(
<option key={index} value={userId}>{userId}</option>
))}
</select>
{errors.vendorId && <p className="error">{errors.vendorId}</p>}
</div>

</div>

{/* BUTTONS */}
<div className="button-group">

<button className="btn-save" onClick={handleValidation}>
Save
</button>

<button className="btn-reset" onClick={clearAll}>
Reset
</button>


<button className="btn-return"  onClick={returnBack}>
Return Back
</button>

</div>

</form>

{flag &&
<p className="success-msg">
New Product Added...
<button className="btn-next" onClick={nextEntry}>Next Entry</button>
</p>
}

</div>

</div>

);
}

export default ProductEntry