import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Schedule } from "../pages/Teacher/Schedule";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AuthProvider } from "../context/AuthProvider";
import { Auditorium } from "../pages/Admin/Auditorium";
import { StudyGroupCategory } from "../pages/Admin/StudyGroupCategory";
import { Teachers } from "../pages/Admin/Teachers";
import { StudyGroups } from "../pages/Admin/StudyGroups";
import { StudyGroup } from "../pages/Admin/StudyGroup";
import { Lessons } from "../pages/Admin/Lessons";
import { RequireAuth } from "../components/RequireAuth";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Profile } from "../pages/Profile";
import { SidebarTeacher } from "../components/SidebarTeacher";
// import { SidebarStudent } from "../components/SidebarStudent";
import { Schedule as ScheduleStudent } from "../pages/Student/Schedule";
import { StudyGroups as StudyGroupsTeacher } from "../pages/Teacher/StudyGroups";
import { StudyGroup as StudyGroupTeacher } from "../pages/Teacher/StudyGroup";

// import { Footer } from "../components/Footer";

const Navigation = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Header />}>
              <Route path="/profile" element={<Profile />} />
              <Route element={<Sidebar />}>
                <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
                  <Route path="/admin/auditoriums" element={<Auditorium />} />
                  <Route path="/admin/teachers" element={<Teachers />} />
                  <Route path="/admin/study-groups" element={<StudyGroups />} />
                  <Route
                    path="/admin/study-group-categories"
                    element={<StudyGroupCategory />}
                  />
                  <Route
                    path={`/admin/study-groups/:id`}
                    element={<StudyGroup />}
                  />
                  <Route path="/admin/lessons" element={<Lessons />} />
                </Route>
              </Route>
              <Route element={<SidebarTeacher />}>
                <Route
                  element={<RequireAuth allowedRoles={["ROLE_TEACHER"]} />}
                >
                  <Route path="/teacher/schedule" element={<Schedule />} />
                  <Route
                    path="/teacher/study-groups"
                    element={<StudyGroupsTeacher />}
                  />
                  <Route
                    path={`/teacher/study-groups/:id`}
                    element={<StudyGroupTeacher />}
                  />
                </Route>
              </Route>
              {/* <Route element={<SidebarStudent />}> */}
              <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
                <Route path="/schedule" element={<ScheduleStudent />} />
              </Route>
              {/* </Route> */}
            </Route>
          </Routes>
          {/* <Footer /> */}
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Navigation;
