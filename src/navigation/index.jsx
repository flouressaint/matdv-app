import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Schedule } from "../pages/Schedule";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AuthProvider } from "../context/AuthProvider";
import { Auditorium } from "../pages/Admin/Auditorium";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { StudyGroupCategory } from "../pages/Admin/StudyGroupCategory";
import { Teachers } from "../pages/Admin/Teachers";
import { StudyGroups } from "../pages/Admin/StudyGroups";
// import { Footer } from "../components/Footer";

const Navigation = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/admin/auditoriums" element={<Auditorium />} />
            <Route path="/admin/teachers" element={<Teachers />} />
            <Route path="/admin/study-groups" element={<StudyGroups />} />
            <Route
              path="/admin/study-group-categories"
              element={<StudyGroupCategory />}
            />
          </Routes>
          {/* <Footer /> */}
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Navigation;
