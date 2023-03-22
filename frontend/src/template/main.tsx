import {Link, Route, Routes} from "react-router-dom";
import {useAuth} from "../services/AuthService";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Home from "../pages/Home";
import Experience from "../pages/Experience";
import AddExperience from "../pages/AddExperience";
import Login from "../pages/Login";
import '../assets/styles/base.scss';


export default function Main() {
    const {loader} = useAuth();
    return (
       <>
        {
            loader ? <Loader /> : <AppMain/>
        }
        </>
    );
}
function AppMain() {
    const {token} = useAuth();
    return (
        <>
           {
                token ?
              <AppProtectedView />
                : AppRoutes()
            }
        </>
    )
}

function AppProtectedView() {
	return (
		<>
        <Header/>
        <div className="AppContent">
            <Routes>
                <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route path="/add-experience" element={<ProtectedRoute><AddExperience /></ProtectedRoute>} />
                <Route path="/experience/:experienceId" element={<ProtectedRoute><Experience /></ProtectedRoute>} />
            </Routes>
        </div>
        <Footer/>
        </>
	);
}


function AppRoutes() {
	return (
		<Routes>
            <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="/add-experience" element={<ProtectedRoute><AddExperience /></ProtectedRoute>} />
            <Route path="/experience/:experienceId" element={<ProtectedRoute><Experience /></ProtectedRoute>} />
            <Route path="/" element={<Login/>}/>
		</Routes>
	);
}
