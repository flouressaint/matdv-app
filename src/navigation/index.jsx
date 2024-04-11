import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Schedule } from "../pages/Schedule";
// import { Footer } from "../components/Footer";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Navigation;
