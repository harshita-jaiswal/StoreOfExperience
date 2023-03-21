import {Link, Route, Routes} from "react-router-dom";
import {useAuth} from "../services/AuthService";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Home from "../pages/Home";
import AddExperience from "../pages/AddExperience";
import Login from "../pages/Login";


export default function Main() {
    const {token, loader} = useAuth();
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
           {/* {
                token ?
              <AppProtectedView />
                    : ""
            } */}
           {
                token ?
              <AppProtectedView />
                //     : <Routes>
                //     <Route path="/" element={<Login/>}/>
                // </Routes>
                : AppRoutes()
            }
            {/* <AppRoutes /> */}
        </>
    )
}

function AppProtectedView() {
	return (
		<>
        <Header/>
        {/* <Home/>
        <AddExperience /> */}
        <Routes>
            <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="/add-experience" element={<ProtectedRoute><AddExperience /></ProtectedRoute>} />
            {/* <Route path="/" element={<Login/>}/> */}
        </Routes>
        <Footer/>
        </>
	);
}


function AppRoutes() {
	return (
		<Routes>
            <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="/add-experience" element={<ProtectedRoute><AddExperience /></ProtectedRoute>} />
            <Route path="/" element={<Login/>}/>
		</Routes>
	);
}
