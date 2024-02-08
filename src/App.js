import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import UserProfile from "./pages/UserProfile/UserProfile";
import Error from "./pages/Error/Error";

import Footer from "./components/Footer/Footer";

import AppInitializer from './AppInitializer';


function App() {
  return (
    <AppInitializer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppInitializer>
  );
}

export default App;