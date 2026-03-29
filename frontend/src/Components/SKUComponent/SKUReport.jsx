import React,{useState,useEffect} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {getAllSKUs,deleteSKUById} from "../../Services/SKUService";
import {getRole} from '../../Services/LoginService';
import "./SKU.css";

const SKUReport = ({ setActivePage }) => {
 let navigate=useNavigate();
    const [role,setRole]=useState("");
    const [skuList,setSkuList]=useState([]);
    let count=1;
    const setRoleData=()=>{
      getRole().then((response)=>{
          setRole(response.data);  
           });
    }

    const setSKURecords=()=>{
      getAllSKUs().then((response)=>{
          setSkuList(response.data);  
           });
    }
 
    useEffect(() => {
      setRoleData();
      setSKURecords();
  }, []);
 
  // const returnBack=()=>{
  //     if(role==='Admin')
  //        navigate('/admin-menu');  
  //     else if(role==='Manager')
  //       navigate('/manager-menu');
  // };

  const returnBack = () => {
  setActivePage({ page: "dashboard" });
};
 
  const deleteSKU=(id)=>{
      deleteSKUById(id).then( res => {
          let remainSkus=skuList.filter((sku) => (sku.skuId!== id));
       setSkuList(remainSkus);
       navigate('/sku-repo');
     });
   }

//    return(
//     <div className="text-center">
//       <div>
//       { role==='Admin'?  <h2 className="text-center">Admin SKU List</h2>:<h2 className="text-center">Manager SKU List</h2>};
       
//         <hr style={{height: "3px", borderWidth:0, color:"yellow", backgroundColor:"red"}}/>
//         <div className = "row">
//           <table className = "table table-striped table-bordered">
//            <thead>
//             <tr>
//               <th>No.</th>
//               <th> SKU Id</th>
//               <th> Description</th>
//               <th>Category</th>
//               { role==='Admin'? <th>Action</th>:<span></span>}
//               </tr>
//            </thead>
//            <tbody>
//             {
//              skuList.map((sku, index) => (
//                <tr key = {sku.skuId}>
                     
//                  <td>{count}</td>
//                  <td>{sku.skuId}</td>
//                  <td>{sku.skuDescription}</td>
//                  <td>{sku.category}</td>
//                  <td>
//                  { role==='Admin'? <span><Link to={`/update-sku/${sku.skuId}`}><button style={{marginLeft: "10px"}}  className="btn btn-info">Update </button></Link><button style={{marginLeft: "10px"}} onClick={()=>deleteSKU(sku.skuId)} className="btn btn-danger">Delete</button></span>:<span/>}
                 
//                   </td>
//                  {count=count+1}
//               </tr>
//              ))}
//         </tbody>
//        </table>
//       </div>
//       <div>
//         <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>    
//       </div>
//   </div>
//  </div>
//    );

 return(
<div className="sku-page">

  <div className="sku-container">

    {role==='Admin' ?
      <h2 className="page-title">Admin SKU List</h2> :
      <h2 className="page-title">Manager SKU List</h2>
    }

    <hr className="title-line"/>

    <div className="table-wrapper">

      <table className="sku-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>SKU Id</th>
            <th>Description</th>
            <th>Category</th>
            {role==='Admin' ? <th>Action</th> : <span></span>}
          </tr>
        </thead>

        <tbody>
        {
          skuList.map((sku,index)=>(
            <tr key={sku.skuId}>

              <td>{index+1}</td>
              <td>{sku.skuId}</td>
              <td>{sku.skuDescription}</td>
              <td>{sku.category}</td>

                    <td>
            {role === 'Admin' ? (
              <div className="action-buttons">
                {/* Update Button */}
                <Link to={`/update-sku/${sku.skuId}`} style={{ textDecoration: 'none' }}>
                  <button className="update-btn">Update</button>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => deleteSKU(sku.skuId)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ) : (
              <span>N/A</span>
            )}
          </td>
            </tr>
          ))
        }
        </tbody>

      </table>

    </div>

    <div className="return-container">
      <button onClick={()=>returnBack()} className="return-btn">
        Return
      </button>
    </div>

  </div>
</div>
);
 
}

export default SKUReport;
