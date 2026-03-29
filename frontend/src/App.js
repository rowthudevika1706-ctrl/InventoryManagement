import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import ManagerMenu from './Components/LoginComponent/ManagerMenu';
import VendorMenu from './Components/LoginComponent/VendorMenu';
import ProductPriceEdit from './Components/ProductComponent/ProductPriceEdit';
import SKUEdit from './Components/SKUComponent/SKUEdit';
import ProductStockEdit from './Components/ProductComponent/ProductStockEdit';
import TransactionReport from './Components/ProductComponent/TransactionReport';
// import ProductPieAnalysis from './Components/AnalysisComponent/ProductPieAnalysis';
// import SKUEntry from './Components/SKUComponent/SKUEntry';
// import SKUReport from './Components/SKUComponent/SKUReport';
// import ProductEntry from './Components/ProductComponent/ProductEntry';
// import ProductReport from './Components/ProductComponent/ProductReport';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterUser/>}/>
      <Route path="/admin-menu" element={<AdminMenu/>}/>
      <Route path="/manager-menu" element={<ManagerMenu/>}/>
      <Route path="/vendor-menu" element={<VendorMenu/>}/>
      <Route path="/edit-price/:pid" element={<ProductPriceEdit/>}/>
      <Route path="/update-sku/:skuno" element={<SKUEdit/>}/>
      <Route path="/edit-stock/:pid/:no" element={<ProductStockEdit/>}/>
      <Route path='/trans-repo/:pid' element={<TransactionReport/>}/>
     {/* <Route path='/product-pie' element={<ProductPieAnalysis/>}/> */}

    </Routes>
     </BrowserRouter>     
    </div>
  );
}

export default App;
