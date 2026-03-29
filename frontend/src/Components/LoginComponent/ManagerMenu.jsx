import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from '../../Services/LoginService';
import { useNavigate } from 'react-router-dom';

import SKUReport from "../SKUComponent/SKUReport";
import ProductReport from "../ProductComponent/ProductReport";
import TransactionReport from "../ProductComponent/TransactionReport";

import "./ManagerMenu.css";
import "../../styles/DashboardLayout.css";

const ManagerMenu = () => {

  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    });
  };

  const renderContent = () => {

    switch (activePage) {

      case "skuList":
        return <SKUReport />

      case "productList":
        return <ProductReport />

      case "issueReport":
        return <TransactionReport type="OUT" setActivePage={setActivePage} />

      case "purchaseReport":
        return <TransactionReport type="IN" setActivePage={setActivePage} />

      default:
        return (
          <div className="dashboard-home">

            <h2 className="welcome-text">Welcome Manager</h2>

            <div className="dashboard-cards">

              <div className="dashboard-card">
                <h3>Total SKUs</h3>
                <p>--</p>
              </div>

              <div className="dashboard-card">
                <h3>Total Products</h3>
                <p>--</p>
              </div>

              <div className="dashboard-card">
                <h3>Low Stock</h3>
                <p>--</p>
              </div>

            </div>

            <div className="quick-actions">

              <h3>Quick Actions</h3>

              <div className="action-buttons">

                <button onClick={() => setActivePage("skuList")}>View SKU List</button>

                <button onClick={() => setActivePage("productList")}>View Products</button>

                <button onClick={() => setActivePage("issueReport")}>Issue Report</button>

                <button onClick={() => setActivePage("purchaseReport")}>Purchase Report</button>

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
          Inventory Manager
        </div>

        <Nav className="flex-column">

          <NavDropdown title="SKU" className="sidebar-item">
            <NavDropdown.Item onClick={() => setActivePage("skuList")}>
              SKU List
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Product" className="sidebar-item">
            <NavDropdown.Item onClick={() => setActivePage("productList")}>
              Product List
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Transaction Report" className="sidebar-item">
            <NavDropdown.Item onClick={() => setActivePage("issueReport")}>
              Out Transaction Report
            </NavDropdown.Item>

            <NavDropdown.Item onClick={() => setActivePage("purchaseReport")}>
              In Transaction Report
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
          Inventory Manager Dashboard
        </div>

        <div className="dashboard-content">
          {renderContent()}
        </div>

      </div>

    </div>
  );
}

export default ManagerMenu;