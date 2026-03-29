// import React,{useState} from "react";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import {logoutUser} from '../../Services/LoginService';
// import {useNavigate} from 'react-router-dom';
// import "./AdminMenu.css";
// import "../../styles/DashboardLayout.css";

// import SKUEntry from "../SKUComponent/SKUEntry";
// import SKUReport from "../SKUComponent/SKUReport";
// import ProductEntry from "../ProductComponent/ProductEntry";
// import ProductReport from "../ProductComponent/ProductReport";

// import "./AdminMenu.css";

// const AdminMenu = () => {

// const navigate = useNavigate();

// const [activePage,setActivePage]=useState("dashboard");

// const handleLogout = () => {
// logoutUser().then(() => {
// localStorage.clear();
// sessionStorage.clear();
// navigate('/');
// })
// };

// const renderContent=()=>{

// switch(activePage){

// case "skuList":
// return <SKUReport/>

// case "skuEntry":
// return <SKUEntry/>

// case "productEntry":
// return <ProductEntry/>

// case "productList":
// return <ProductReport/>

// case "issueReport":
//   return <TransactionReport type="OUT" />

// case "purchaseReport":
//   return <TransactionReport type="IN" />

// default:
// return (

// <div className="dashboard-home">

// <h2 className="welcome-text">Welcome Admin</h2>

// <div className="dashboard-cards">

// <div className="dashboard-card">
// <h3>Total SKUs</h3>
// <p>--</p>
// </div>

// <div className="dashboard-card">
// <h3>Total Products</h3>
// <p>--</p>
// </div>

// <div className="dashboard-card">
// <h3>Low Stock</h3>
// <p>--</p>
// </div>

// <div className="dashboard-card">
// <h3>Vendors</h3>
// <p>--</p>
// </div>

// </div>

// <div className="quick-actions">

// <h3>Quick Actions</h3>

// <div className="action-buttons">

// <button onClick={()=>setActivePage("skuEntry")}>Add SKU</button>

// <button onClick={()=>setActivePage("productEntry")}>Add Product</button>

// <button onClick={()=>setActivePage("skuList")}>View SKU List</button>

// <button onClick={()=>setActivePage("productList")}>View Products</button>

// </div>

// </div>

// </div>

// )
// }
// }

// return (

// <div className="admin-layout">

// {/* SIDEBAR */}

// <div className="sidebar">

// <div className="sidebar-title">
// Inventory Admin
// </div>

// <Nav className="flex-column">

// <NavDropdown title="SKU" className="sidebar-item">

// <NavDropdown.Item
// onClick={()=>setActivePage("skuList")}
// >
// SKU List
// </NavDropdown.Item>

// <NavDropdown.Item
// onClick={()=>setActivePage("skuEntry")}
// >
// SKU Addition
// </NavDropdown.Item>

// </NavDropdown>


// <NavDropdown title="Product" className="sidebar-item">

// <NavDropdown.Item
// onClick={()=>setActivePage("productEntry")}
// >
// Product Addition
// </NavDropdown.Item>

// <NavDropdown.Item
// onClick={()=>setActivePage("productList")}
// >
// Product List
// </NavDropdown.Item>

// <DropdownButton
// as={ButtonGroup}
// drop='end'
// variant="light"
// title='Product Analysis'
// >

// <Dropdown.Item>
// All Products Analysis
// </Dropdown.Item>

// <Dropdown.Item>
// Single Product Demand Analysis
// </Dropdown.Item>

// </DropdownButton>

// </NavDropdown>

// <NavDropdown title="Transaction Report" className="sidebar-item">

//   <NavDropdown.Item
//     onClick={() => setActivePage("issueReport")}
//   >
//     Issue Report
//   </NavDropdown.Item>

//   <NavDropdown.Item
//     onClick={() => setActivePage("purchaseReport")}
//   >
//     Purchase Report
//   </NavDropdown.Item>

// </NavDropdown>


// <Nav.Link className="sidebar-item">
// Show User Details
// </Nav.Link>

// <Nav.Link
// onClick={handleLogout}
// className="sidebar-item logout"
// >
// Logout
// </Nav.Link>

// </Nav>

// </div>

// {/* MAIN CONTENT */}

// <div className="main-content">

// <div className="admin-title">
// Inventory Admin Dashboard
// </div>

// <div className="dashboard-content">

// {renderContent()}

// </div>

// </div>

// </div>

// );
// }

// export default AdminMenu;

import React,{useState,useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {logoutUser} from '../../Services/LoginService';
import {useNavigate} from 'react-router-dom';
import ProductPieAnalysis from "../AnalysisComponent/ProductPieAnalysis";
import "./AdminMenu.css";
import "../../styles/DashboardLayout.css";

import { getDashboardStats } from "../../Services/DashboardService";
import SKUEntry from "../SKUComponent/SKUEntry";
import SKUReport from "../SKUComponent/SKUReport";
import ProductEntry from "../ProductComponent/ProductEntry";
import ProductReport from "../ProductComponent/ProductReport";
import TransactionReport from "../ProductComponent/TransactionReport";
import ProductStockEdit from "../ProductComponent/ProductStockEdit";
import ProductPriceEdit from "../ProductComponent/ProductPriceEdit";

const AdminMenu = () => {

const navigate = useNavigate();

const [activePage, setActivePage] = useState({ page: "dashboard" });

const [stats, setStats] = useState({
  totalSkus: 0,
  totalProducts: 0,
  lowStock: 0,
  vendors: 0
});



useEffect(() => {
  getDashboardStats().then(res => {
    setStats(res.data);
  });
}, []);

const handleLogout = () => {
logoutUser().then(() => {
localStorage.clear();
sessionStorage.clear();
navigate('/');
})
};



const renderContent=()=>{

switch(activePage.page){

case "skuList":
return <SKUReport setActivePage={setActivePage}/>

case "skuEntry":
return <SKUEntry setActivePage={setActivePage}/>

case "productEntry":
return <ProductEntry setActivePage={setActivePage}/>

case "productList":
return <ProductReport setActivePage={setActivePage}/>

case "editPrice":
  return <ProductPriceEdit pid={activePage.pid} setActivePage={setActivePage} />

case "editStock":
  return (
    <ProductStockEdit
      pid={activePage.pid}
      no={activePage.type}
      setActivePage={setActivePage}
    />
  )

case "issueReport":
  return <TransactionReport type="OUT" setActivePage={setActivePage}/>

case "purchaseReport":
  return <TransactionReport type="IN" setActivePage={setActivePage}/>

case "productPie":
  return <ProductPieAnalysis setActivePage={setActivePage} />

default:
return (

<div className="dashboard-home">

<h2 className="welcome-text">Welcome Admin</h2>

<div className="dashboard-cards">

<div className="dashboard-card">
  <h3>Total SKUs</h3>
  <p>{stats.totalSkus}</p>
</div>

<div className="dashboard-card">
  <h3>Total Products</h3>
  <p>{stats.totalProducts}</p>
</div>

<div className="dashboard-card">
  <h3>Low Stock</h3>
  <p>{stats.lowStock}</p>
</div>

<div className="dashboard-card">
  <h3>Vendors</h3>
  <p>{stats.vendors}</p>
</div>

</div>

<div className="quick-actions">

<h3>Quick Actions</h3>

<div className="action-buttons">

<button onClick={()=>setActivePage({page:"skuEntry"})}>Add SKU</button>

<button onClick={()=>setActivePage({page:"productEntry"})}>Add Product</button>

<button onClick={()=>setActivePage({page:"skuList"})}>View SKU List</button>

<button onClick={()=>setActivePage({page:"productList"})}>View Products</button>

</div>

</div>

</div>

)
}
}

return (

<div className="admin-layout">

{/* SIDEBAR */}

<div className="sidebar">

<div className="sidebar-title">
Inventory Admin
</div>

<Nav className="flex-column">

<NavDropdown title="SKU" className="sidebar-item">

<NavDropdown.Item onClick={()=>setActivePage({page:"skuList"})}>
SKU List
</NavDropdown.Item>

<NavDropdown.Item onClick={()=>setActivePage({page:"skuEntry"})}>
SKU Addition
</NavDropdown.Item>

</NavDropdown>

<NavDropdown title="Product" className="sidebar-item">

<NavDropdown.Item onClick={()=>setActivePage({page:"productEntry"})}>
Product Addition
</NavDropdown.Item>

<NavDropdown.Item onClick={()=>setActivePage({page:"productList"})}>
Product List
</NavDropdown.Item>

{/* <DropdownButton
as={ButtonGroup}
drop='end'
variant="light"
title='Product Analysis'
>
<Dropdown.Item>
All Products Analysis
</Dropdown.Item>

<Dropdown.Item>
Single Product Demand Analysis
</Dropdown.Item>

</DropdownButton> */}
<DropdownButton
  as={ButtonGroup}
  drop='end'
  variant="light"
  title='Product Analysis'
>
  <Dropdown.Item onClick={() => setActivePage({page:"productPie"})}>
    All Products Analysis
  </Dropdown.Item>

  <Dropdown.Item>
    Single Product Demand Analysis
  </Dropdown.Item>
</DropdownButton>

</NavDropdown>

<NavDropdown title="Transaction Report" className="sidebar-item">

  <NavDropdown.Item onClick={()=>setActivePage({page:"issueReport"})}>
  Issue Report
  </NavDropdown.Item>

  <NavDropdown.Item onClick={()=>setActivePage({page:"purchaseReport"})}>
  Purchase Report
  </NavDropdown.Item>

</NavDropdown>

<Nav.Link className="sidebar-item">
Show User Details
</Nav.Link>

<Nav.Link
onClick={handleLogout}
className="sidebar-item logout"
>
Logout
</Nav.Link>

</Nav>

</div>

{/* MAIN CONTENT */}

<div className="main-content">

<div className="admin-title">
Inventory Admin Dashboard
</div>

<div className="dashboard-content">

{renderContent()}

</div>

</div>

</div>

);
}

export default AdminMenu;