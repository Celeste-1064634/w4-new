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
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(sessionStorage.getItem("token"));
  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
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
