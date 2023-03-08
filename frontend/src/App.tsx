import './App.scss'
import { Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import AddExperience from "./pages/AddExperience";

function App() {
   
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
