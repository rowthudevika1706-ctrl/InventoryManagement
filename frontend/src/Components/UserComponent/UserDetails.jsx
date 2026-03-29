import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../Services/UserService";

const UserDetails = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserDetails()
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
      });
  }, []);

  return (
    <div className="container mt-4">

      <h3 className="text-center">
        <u>User Details</u>
      </h3>

      <table className="table table-bordered mt-3">

        <tbody>

          <tr>
            <th>Username</th>
            <td>{user.username}</td>
          </tr>

          <tr>
            <th>Name</th>
            <td>{user.personalName}</td>
          </tr>

          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>

          <tr>
            <th>Role</th>
            <td>{user.role}</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
};

export default UserDetails;