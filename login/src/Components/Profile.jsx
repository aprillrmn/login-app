import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const axiosHeader = { headers: { Authorization: `Bearer ${token}` } };

  // State untuk data profil pengguna
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    phone_number: '',
    gender: '',
    birth_place: '',
    birth_date: ''
  });

  useEffect(() => {
    // Memanggil API untuk mengambil data profil berdasarkan ID saat komponen dimuat
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://192.168.18.237:8080/api/profile/${id}`, axiosHeader);
        console.log(response.data.data);
        setUser(response.data.data); // asumsikan response.data sesuai dengan struktur data yang diharapkan
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error fetching data
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  // Fungsi untuk menyimpan perubahan data profil

  // Fungsi untuk logout
  const handleLogout = () => {
    // Hapus token dan user_id dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    // Navigate kembali ke halaman login
    navigate('/login');
  };

  // Event handler untuk perubahan input
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              value={user.phone_number}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              value={user.gender}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birth_place">Place of Birth</label>
            <input
              type="text"
              id="birth_place"
              value={user.birth_place}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birth_date">Date of Birth</label>
            <input
              type="date"
              id="birth_date"
              value={user.birth_date}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
