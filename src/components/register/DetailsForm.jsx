import { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import "./DetailsForm.css";

const UserForm = () => {
    const navigate=useNavigate();
  const location = useLocation();
  const { state } = location;

  const username = state?.username || "";
  const password = state?.password || "";

  const [formData, setFormData] = useState({
    name: "",
    username: username,
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: password,
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleGeoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        geo: {
          ...prevData.address.geo,
          [name]: value,
        },
      },
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enterNewUser();
  };

  async function enterNewUser() {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
    const json_response = await response.json();
    localStorage.setItem("currentUser", JSON.stringify(json_response));
    navigate(`/users/${json_response.id}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>{username} please complite your profile</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-z]+"
            maxLength="20"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            required
          />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={formData.address.zipcode}
            onChange={handleAddressChange}
          />
        </label>
        <label>
          Geography latitude:
          <input
            type="text"
            name="lat"
            value={formData.address.geo.lat}
            onChange={handleGeoChange}
          />
        </label>
        <label>
          Geography longitude:
          <input
            type="text"
            name="lng"
            value={formData.address.geo.lng}
            onChange={handleGeoChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </label>
        <label>
          Conpany name:
          <input
            type="text"
            name="name"
            value={formData.company.name}
            onChange={handleCompanyChange}
            required
          />
        </label>
        <label>
          Conpany catchPhrase:
          <input
            type="text"
            name="catchPhrase"
            value={formData.company.catchPhrase}
            onChange={handleCompanyChange}
          />
        </label>
        <label>
          Conpany bs:
          <input
            type="text"
            name="bs"
            value={formData.company.bs}
            onChange={handleCompanyChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
