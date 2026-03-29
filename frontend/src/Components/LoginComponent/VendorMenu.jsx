import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { logoutUser } from '../../Services/LoginService';
import { useNavigate } from 'react-router-dom';

import UserDetails from "../UserComponent/UserDetails";

import "./VendorMenu.css";
import "../../styles/DashboardLayout.css";

const VendorMenu = () => {

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

      case "userDetails":
        return <UserDetails />

      default:
        return (
          <div className="dashboard-home">

            <h2 className="welcome-text">Welcome Vendor</h2>

            <div className="dashboard-cards">

              <div className="dashboard-card">
                <h3>My Orders</h3>
                <p>--</p>
              </div>

              <div className="dashboard-card">
                <h3>Pending Requests</h3>
                <p>--</p>
              </div>

            </div>

            <div className="quick-actions">

              <h3>Quick Actions</h3>

              <div className="action-buttons">

                <button onClick={() => setActivePage("userDetails")}>
                  View My Details
                </button>

              </div>

            </div>

          </div>
        )
    }
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div className="sidebar-title">
          Inventory Vendor
        </div>

        <Nav className="flex-column">

          <Nav.Link
            className="sidebar-item"
            onClick={() => setActivePage("userDetails")}
          >
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
          Vendor Dashboard
        </div>

        <div className="dashboard-content">
          {renderContent()}
        </div>

      </div>

    </div>
  );
};

export default VendorMenu;