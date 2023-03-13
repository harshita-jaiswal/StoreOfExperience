import './App.scss'
import { Link, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import AddExperience from "./pages/AddExperience";
import {httpClient, updateAxios} from "./services/HttpService";
import Cookies from 'js-cookie';

function App() {
    // const value = document.cookie.split("=")[1];
    const value = Cookies.get('userInfo') ;`    `
    console.log('cookie', (value?.replaceAll('\\', '')));
    // await updateAxios
    useEffect( () => {
		// Reminder that useEffect itself CANNOT be async!
		const fetchMatches = async() => {
            debugger
			// Note we no longer have to call axios with a huge url OR worry about auth, both automated!
			const matchesRes = await httpClient.get("/profiles");
			// setMatches(matchesRes.data);
            console.log('api---', matchesRes);
		};

		fetchMatches()
			.catch(console.error);
	},[]);
    return (
        <div className="App">
            {/* <nav>
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/converter">Converter</Link>
                </div>
            </nav> */}
            {/* <Routes>
                <Route path="/converter" element={<Converter />} />
                <Route path="/" element={<Home />} />
            </Routes> */}
            <Header/>
            {/* <Home/> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-experience" element={<AddExperience />} />
            </Routes>
            <Footer/>
        </div>
    )
}

export default App
