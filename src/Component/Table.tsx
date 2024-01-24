import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import './Paint.css';

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

const Table: React.FC = () => {
  const navigate = useNavigate(); 
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: '',
    age: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmedPassword: '',
    address: '',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);

  const handleDeleteItem = async (id: number) => {
    try {
      // Your delete logic here

      const response = await fetch(`https://64d60e47754d3e0f13618812.mockapi.io/form/Usestate/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setEditItemId(null);
        setIsEditing(false);
      } else {
        console.error('Error deleting item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://64d60e47754d3e0f13618812.mockapi.io/form/Usestate/`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('API response is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setItems]);


  const handleEditItem = async (id: number) => {
    try {
      const response = await fetch(`https://64d60e47754d3e0f13618812.mockapi.io/form/Usestate/${id}`);
      if (response.ok) {
        const selectedItem = await response.json();
  
        if (selectedItem) {
          setNewItem(selectedItem);
          setIsEditing(true);
          setEditItemId(id);
          navigate(`/form/${id}`, { state: { item: selectedItem } });
        } else {
          console.error('Error fetching item for editing:', response.statusText);
        }
      } else {
        console.error('Error fetching item for editing:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching item for editing:', error);
    }
  };
  
const handelForm=()=>{
  navigate("/form")
}
  return (
    <div>
       <button className='rounded mt-5 ms-5' onClick={handelForm}>Go To Form
        
        </button>
  
    <div className='table-responsive  mb-3 mt-5 ms-4 p-4 '>
       
        
      <table className='table   table-bordered table-striped text-center mt-5'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Password</th>
            <th>Confirm Password</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.confirmedPassword}</td>
              <td>{item.address}</td>
              <td>{item.gender}</td>
              <td>
                <div className='editing'>
                <button onClick={() => handleEditItem(item.id)} className='btn btn-success '>
                  Edit
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className='btn btn-danger ms-2'>
                  Delete
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Table;

