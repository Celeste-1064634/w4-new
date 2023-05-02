import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Answers from "./pages/Answers";
import EnqueteOverview from "./pages/EnqueteOverview";
import AdjustEnquete from "./pages/AdjustEnquete";
import Login from './pages/Login';
import { UserContext } from './UserContext';

import "./main.css";
import { useEffect, useState } from 'react';

export default function App() {
  const [user, setUser] = useState({});

  useEffect( () => {
    // update user info by jwt token
    async function fetchData(){
      
      let info = {
        method: "GET",
        headers: {
          "Authorization": "Bearer "+sessionStorage.getItem("token")
        }
      }
  
      try {
        const res = await fetch("/who_am_i", info)
        const data = await res.json()
        setUser({
          "token": sessionStorage.getItem("token"),
          "firstName": data.firstName,
          "lastName": data.lastName,
          "fullName": data.fullName,
          "email": data.email,
        })
      }
      catch (error) {
        console.log("INDEX", error)
      }
    }
    fetchData()
  }, [])
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="antwoorden" element={<Answers />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
            <Route path="vragenlijsten" element={<EnqueteOverview />} />
            <Route path="vragen" element={<AdjustEnquete />} />
            <Route path="inloggen" element={<Login />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
