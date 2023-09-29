import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import NotFound from "../../pages/NotFound";
import AdminPanel from "../../pages/AdminPanel";
import Protected from "../../pages/Protected";
import Quiz from "../../pages/Quiz";


export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="Quiz" element={<Protected Screen={Quiz} />} />
          <Route path="/" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route path="AdminPanel/*" element={<Protected Screen={AdminPanel} />} />
        </Routes>
      </Router>
    </>
  );
}
