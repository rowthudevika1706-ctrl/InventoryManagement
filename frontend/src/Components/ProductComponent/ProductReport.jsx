import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { displayAllProducts, deleteAProduct } from '../../Services/ProductService'
import { getRole } from '../../Services/LoginService'
import "./Product.css";

const ProductReport = ({ setActivePage }) => {

  const [products, setProducts] = useState([]);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const setProductData = () => {
    displayAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch(error => {
        alert("Error Occured while loading data:" + error);
      });
  }

  const setRoleData = () => {
    getRole().then((response) => {
      setRole(response.data);
    })
  }

  useEffect(() => {
    setRoleData();
    setProductData();
  }, []);

  const removeProduct = (id) => {
    deleteAProduct(id).then(() => {
      const remainProducts = products.filter(
        (product) => product.productId !== id
      );
      setProducts(remainProducts);
    });

    navigate('/product-repo');
  }

  // const returnBack = () => {
  //   if (role === 'Admin')
  //     navigate('/admin-menu')
  //   else if (role === 'Manager')
  //     navigate('/manager-menu');
  // }
const returnBack = () => {
  setActivePage({ page: "dashboard" });
};

  const totalProducts = products.length;

const lowStockProducts = products.filter(
  (p) => p.status === false
).length;

const availableProducts = products.filter(
  (p) => p.status === true
).length;

const vendors = new Set(products.map(p => p.vendorId)).size;

  return (

    <div className="product-report-container">

      <h2 className="page-title">
        {role === 'Admin' ? "Admin Product List" : "Manager Product List"}
      </h2>

      <div className="dashboard-cards">

<div className="card-box">
<div className="card-title">Total Products</div>
<div className="card-value">{totalProducts}</div>
</div>

<div className="card-box warning">
<div className="card-title">Low Stock</div>
<div className="card-value">{lowStockProducts}</div>
</div>

<div className="card-box success">
<div className="card-title">Available</div>
<div className="card-value">{availableProducts}</div>
</div>

<div className="card-box info">
<div className="card-title">Vendors</div>
<div className="card-value">{vendors}</div>
</div>

</div>

      <div className="table-wrapper">

        <table className="product-table table table-striped table-bordered">

          <thead>
            <tr>
              <th>Product Id</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Vendor Id</th>
              <th>Purchase Price</th>
              <th>Sales Price</th>
              <th>Stock</th>
              <th>Reorder Level</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => {

              const flag = !product.status;

              return (

                <tr key={product.productId}>

                  <td>{product.productId}</td>
                  <td>{product.skuId}</td>
                  <td>{product.productName}</td>
                  <td>{product.vendorId}</td>
                  <td>{product.purchasePrice}</td>
                  <td>{product.salesPrice}</td>
                  <td>{product.stock}</td>
                  <td>{product.reorderLevel}</td>

                  <td>
                    {product.status
                      ? <span className="status-available">Available</span>
                      : <span className="status-low">Low Stock</span>}
                  </td>

                  <td>

                    <div className="action-dropdown">

                      <button className="action-trigger">
                        &#8942;
                      </button>

                      <div className="action-menu">

                        <div className="menu-header">
                          Available Actions
                        </div>

                       <button
                            className="menu-item"
                            disabled={flag}
                            onClick={() =>
                              setActivePage({ page: "editStock", pid: product.productId, type: "2" })
                            }
                          >
                            <span className="icon">📤</span>
                            Issue
                          </button>

                        <button
                          className="menu-item"
                          onClick={() =>
                            setActivePage({ page: "editStock", pid: product.productId, type: "1" })
                          }
                        >
                          <span className="icon">📥</span>
                          Purchase
                        </button>

                        {role === 'Admin' && (
                          <>
                            <div className="menu-divider"></div>

                           <button
                              className="menu-item"
                              onClick={() =>
                                setActivePage({ page: "editPrice", pid: product.productId })
                              }
                            >
                              <span className="icon">🏷️</span>
                              Price Update
                            </button>

                            <button
                              onClick={() => removeProduct(product.productId)}
                              className="menu-item delete-action"
                            >
                              <span className="icon">🗑️</span>
                              Delete Product
                            </button>
                          </>
                        )}

                      </div>

                    </div>

                  </td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

      <div className="return-container">
        <button
          onClick={returnBack}
          className="btn-return-fixed"
        >
          ← Return to Menu
        </button>
      </div>

    </div>

  );
}

export default ProductReport