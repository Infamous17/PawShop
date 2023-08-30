import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import ReHome from "./Components/ReHome/ReHome";
import Adopt from "./Components/Adopt";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Footer from "./Components/Footer";
import Listings from "./Components/Listings";
import Favorites from "./Components/Favorites";
import Edit from "./Components/Edit";
import ChatPage from "./Components/Chat/ChatPage";

function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup"
  return (
    <div>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/listings/edit/:id" element={<Edit />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/rehome" element={<ReHome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
