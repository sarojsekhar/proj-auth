import React, { useState } from 'react';
import axios from "axios";
// import { use } from 'react';
function App() {
  const [form, setForm] = useState( { username: "", email: "", password: "" } );
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm( { ...form, [e.target.name]: e.target.value } );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      setMessage(res.data.message);
    } catch ( err ) {
      console.error("Error Details: ", err);
      setMessage(err.response?.data?.message || "Errors");
    }
  }

  return (
    <>
      <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
          /><br />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          /><br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          /><br />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </>
  )
}

export default App
