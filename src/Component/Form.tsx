import React, { useState, useEffect } from "react";
// import Table from './Table';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Paint.css";

type Item = {
  id: number;
  name: string;
  age: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmedPassword: string;
  address: string;
  gender: string;
};

type FormProps = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

const Form: React.FC<FormProps> = ({ items, setItems }) => {
  const location = useLocation();
  const selectedItem = location.state?.item || null;
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: "",
    age: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmedPassword: "",
    address: "",
    gender: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track if in editing mode
  const [editItemId, setEditItemId] = useState<boolean>(false); // Track the id being edited

  const [editsItemId, setEditsItemId] = useState<number | null>(null);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (selectedItem) {
      setNewItem(selectedItem);

      setIsEditing(true);
      setEditItemId(selectedItem.id);
    }
  }, [selectedItem]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!newItem.name.trim()) {
      errors.name = "Name is required";
    } else if (newItem.name.trim().length < 3) {
      errors.name = "Name must be atlest 3 letters";
    }

    if (!newItem.age.trim()) {
      errors.age = "Age is required";
    }

    if (!newItem.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(newItem.phoneNumber.trim())) {
      errors.phoneNumber = "Phone Number must be a 10-digit number";
    }

    if (!newItem.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newItem.email)) {
      errors.email = "Invalid email address";
    }

    if (!newItem.password.trim()) {
      errors.password = "Password is required";
    }

    if (!newItem.confirmedPassword.trim()) {
      errors.confirmedPassword = "Confirm Password is required";
    } else if (newItem.password.trim() !== newItem.confirmedPassword.trim()) {
      errors.confirmedPassword = "Confirmed Password does not match";
    }

    if (!newItem.address.trim()) {
      errors.address = "Address is required";
    }

    if (!newItem.gender.trim()) {
      errors.gender = "Gender is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        if (isEditing && editItemId !== false) {
          const response = await fetch(
            `https://64d60e47754d3e0f13618812.mockapi.io/form/Usestate/${editItemId}`,

            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newItem), // Include the updated data in the request body
            }
          );

          if (response.ok) {
            const updatedItem = await response.json();
            setItems((prevItems) =>
              prevItems.map((item) =>
                item.id === editsItemId ? updatedItem : item
              )
            );
            // You may choose to reset state and navigate here

            // setIsEditing(false);
            // setEditsItemId(null);
            navigate("/table");
          } else {
            console.error("Error updating item:", response.statusText);
          }
        } else {
          const response = await fetch(
            "https://64d60e47754d3e0f13618812.mockapi.io/form/Usestate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newItem),
            }
          );

          if (response.ok) {
            const data = await response.json();
            setItems((prevItems) => [...prevItems, data]);
            setNewItem({
              id: 0,
              name: "",
              age: "",
              phoneNumber: "",
              email: "",
              password: "",
              confirmedPassword: "",
              address: "",
              gender: "",
            });
            setIsEditing(false);
            setEditsItemId(null);
            navigate("/table");
          } else {
            console.error("Error adding item:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error adding/updating item:", error);
      }
    }
  };

  const handeltable = () => {
    navigate("/table");
  };

  return (
    <div>
      <button className="rounded mt-5 mb-3 ms-5" onClick={handeltable}>
        Go To Table
      </button>
      <div className="container w-75">
        <div className="width ">
          <div className=" mt-5">
            <h1 className="ms- mt-3 text-center text-success">
              Crud operation
            </h1>
          </div>

          <div className="row mt-5">
            <div className="col-md-6">
              <label>Name:</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => {
                  setNewItem((prev) => ({ ...prev, name: e.target.value }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    name:
                      e.target.value.trim().length < 3
                        ? "Name must be at least 3 letters"
                        : "",
                  }));
                }}
              />
              {validationErrors.name && (
                <p className="error text-danger">{validationErrors.name}</p>
              )}
            </div>

            <div className="col-md-6">
              <label>Age:</label>
              <input
                type="number"
                value={newItem.age}
                onChange={(e) => {
                  setNewItem((prev) => ({ ...prev, age: e.target.value }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    age: e.target.value.trim() === "" ? "Age is required" : "",
                  }));
                }}
              />
              {validationErrors.age && (
                <p className="error text-danger">{validationErrors.age}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Phone Number:</label>
              <input
                type="number"
                value={newItem.phoneNumber}
                onChange={(e) => {
                  setNewItem((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    phoneNumber: /^\d{10}$/.test(e.target.value)
                      ? ""
                      : "Phone Number must be a 10-digit number",
                  }));
                }}
              />
              {validationErrors.phoneNumber && (
                <p className="error text-danger">
                  {validationErrors.phoneNumber}
                </p>
              )}
            </div>

            <div className="col-md-6">
              <label>Email:</label>
              <input
                type="email"
                value={newItem.email}
                onChange={(e) => {
                  setNewItem((prev) => ({ ...prev, email: e.target.value }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    email: /\S+@\S+\.\S+/.test(e.target.value)
                      ? ""
                      : "Invalid email address",
                  }));
                }}
              />
              {validationErrors.email && (
                <p className="error text-danger">{validationErrors.email}</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Password:</label>
              <input
                type="password"
                value={newItem.password}
                onChange={(e) => {
                  setNewItem((prev) => ({ ...prev, password: e.target.value }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    password:
                      e.target.value.trim() === ""
                        ? "Password is required"
                        : "",
                  }));
                }}
              />
              {validationErrors.password && (
                <p className="error text-danger">{validationErrors.password}</p>
              )}
            </div>

            <div className="col-md-6">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={newItem.confirmedPassword}
                onChange={(e) => {
                  setNewItem((prev) => ({
                    ...prev,
                    confirmedPassword: e.target.value,
                  }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmedPassword:
                      e.target.value.trim() === ""
                        ? "Confirm Password is required"
                        : "",
                  }));
                }}
              />
              {validationErrors.confirmedPassword && (
                <p className="error text-danger">
                  {validationErrors.confirmedPassword}
                </p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Gender:</label>
              <select
                value={newItem.gender}
                onChange={(e) => {
                  setNewItem((prev) => ({ ...prev, gender: e.target.value }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    gender:
                      e.target.value.trim() === "" ? "Gender is required" : "",
                  }));
                }}
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              {validationErrors.gender && (
                <p className="error text-danger">{validationErrors.gender}</p>
              )}
            </div>

            <div className="col-md-6">
              <label>Address:</label>
              <input
                type="text"
                value={newItem.address}
                onChange={(e) => {
                  setNewItem((prev) => ({ ...prev, address: e.target.value }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    address:
                      e.target.value.trim() === "" ? "Address is required" : "",
                  }));
                }}
              />
              {validationErrors.address && (
                <p className="error text-danger">{validationErrors.address}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <button className="sub mb-5 mt-4" onClick={handleSubmit}>
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
