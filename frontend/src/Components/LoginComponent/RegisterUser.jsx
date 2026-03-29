import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerNewUser} from "../../Services/LoginService";
import '../../DisplayView.css';
const RegisterUser = () => {

    let navigate=useNavigate();
    const [errors,setErrors]=useState({});
    const [inventoryUser,setInventoryUser]=useState({
         username:"",
         password: "",
         personalName:"",
         email:"",
         role:"",
   });
   const [flag,setFlag]=useState(false);
   const [confirmPassword,setConfirmPassword]=useState("");
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
   useEffect(() => {
       setFlag(false);
   }, []);
   
   const createNewUser = (event) => {
     event.preventDefault();
        if(inventoryUser.password===confirmPassword){
          registerNewUser(inventoryUser).then((response)=>{
           setFlag(true);
           });
     }
  };

   const  onChangeHandler = (event) =>{
     event.persist();
     setFlag(false);
     const name = event.target.name;
         const value = event.target.value;
        setInventoryUser(values =>({...values, [name]: value }));
    };

    const handleValidation = (event) => {
     event.preventDefault();
     let tempErrors = {};
     let isValid = true;
 
     if (!inventoryUser.username.trim()) {
       tempErrors.username = "User Name is required";
       isValid = false;
     }
 
     if (!inventoryUser.password.trim()) {
       tempErrors.password = "Password is required";
       isValid = false;
     }
     else if (inventoryUser.password.length < 5 || inventoryUser.passwordlength > 10) {
        tempErrors.password="Password must be 5-10 characters long";
       isValid = false;
     }
     else if (inventoryUser.password!==confirmPassword) {
       tempErrors.password="Both the passwords are not matched";
      isValid = false;
    }
 
   if (!inventoryUser.personalName.trim()) {
         tempErrors.personalName = "Personal Name is required";
         isValid = false;
     }
 if (!inventoryUser.email.trim()) {
         tempErrors.email = "Email is required";
         isValid = false;
       }
       else if(!emailPattern.test(inventoryUser.email)){
         tempErrors.email = "Invalid Email Format";
         isValid = false;
       }
     if (!inventoryUser.role.trim()) {
         tempErrors.role = "Role is required";
         isValid = false;
       }
       if (!confirmPassword.trim()) {
         tempErrors.confirmPassword = "Confirm Password is required";
         isValid = false;
       }
 
    setErrors(tempErrors);
     if (isValid) {
         createNewUser(event);
     }
   };
 
 
const returnBack=()=>{
   navigate('/');
  }
 

 return (
  <div className="main-container register-page">

    {/* LEFT SIDE → FORM */}
    <div className="right-panel">
      <div className="form-box">
        <h2>New User Registration</h2>

        <form>
          <div className="input-group">
            <input
              placeholder="Username"
              name="username"
              value={inventoryUser.username}
              onChange={onChangeHandler}
            />
            {errors.username && <p className="error-msg">{errors.username}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inventoryUser.password}
              onChange={onChangeHandler}
            />
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
          </div>

          <div className="input-group">
            <input
              placeholder="Personal Name"
              name="personalName"
              value={inventoryUser.personalName}
              onChange={onChangeHandler}
            />
            {errors.personalName && <p className="error-msg">{errors.personalName}</p>}
          </div>

          <div className="input-group">
            <input
              placeholder="Email"
              name="email"
              value={inventoryUser.email}
              onChange={onChangeHandler}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              list="types"
              placeholder="Select Role"
              name="role"
              value={inventoryUser.role}
              onChange={onChangeHandler}
            />
            <datalist id="types">
              <option value="Manager" />
              <option value="Vendor" />
              <option value="Admin" />
            </datalist>
            {errors.role && <p className="error-msg">{errors.role}</p>}
          </div>

          <button onClick={handleValidation}>Register</button>
        </form>

        {flag && (
          <p style={{ color: "green", marginTop: "15px" }}>
            User Created Successfully!{" "}
            <span className="register-link" onClick={returnBack}>
              Go to Login
            </span>
          </p>
        )}
      </div>
    </div>

    {/* RIGHT SIDE → IMAGE PANEL */}
    <div className="left-panel">
      <div className="overlay">
        <div>
          <h1>Join Us Today</h1>
          <p className="tagline">Create your SmartShelfX account</p>
          <p className="description">
            Manage inventory, track vendors and control stock with ease.
          </p>
          <ul className="features">
            <li>Inventory Tracking</li>
            <li>Vendor Management</li>
            <li>Real-Time Updates</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
);
}

export default RegisterUser
