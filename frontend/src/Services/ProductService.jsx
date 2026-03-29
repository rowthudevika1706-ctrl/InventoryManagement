import axios from 'axios';

const PRODUCT_URL='http://localhost:9191/invent/product';
const VENDOR_URL='http://localhost:9191/invent/vendor';
const ID_GEN_URL='http://localhost:9191/invent/id-gen';

   export const displayAllProducts=()=>{
        return axios.get(PRODUCT_URL, {
            withCredentials: true
        });
    }
    
    export const saveNewProduct=(product)=>{
    	 return axios.post(PRODUCT_URL, product,{
            withCredentials: true
        });
    }
    
    export const getProductById=(id)=>{
    	 return axios.get(`${PRODUCT_URL}/${id}`, {
            withCredentials: true
        });
    }
    
    export const deleteAProduct=(id)=>{
    	return axios.delete(`${PRODUCT_URL}/${id}`, {
            withCredentials: true
        });
    }
    
    export const editProductStock=(product,qty,flag)=>{
    	 return axios.put(`${PRODUCT_URL}/${qty}/${flag}`,product, {
            withCredentials: true
        });
    }
    
    export const editProductPrice=(product)=>{
    	 return axios.put(PRODUCT_URL, product,{
            withCredentials: true
        });
    }
    
    export const productIdGenerator=()=> {
    	  return axios.get(ID_GEN_URL, {
            withCredentials: true
        });
    }
    
    export const getProductByAVendor=()=>{
    	 return axios.get(VENDOR_URL, {
            withCredentials: true
        });
    }
    
    export const getProductByVendor=(id)=>{
    	 return axios.get(`${VENDOR_URL}/${id}`, {
            withCredentials: true
        });
    }


//     export const getProductByVendor = (id) => {
//     if(id){
//         return axios.get(`${VENDOR_URL}/${id}`, {
//             withCredentials: true
//         });
//     } else {
//         return axios.get(VENDOR_URL, {
//             withCredentials: true
//         });
//     }
    
// }