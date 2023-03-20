import {useCallback, useContext, useEffect, useState} from "react";
import { Link, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import React from "react";
import {AuthContext, useAuth} from "../../services/AuthService";
import {AuthHttpClient} from "../../services/HttpMicroservice";
import "./index.scss";

export default function Login() {

	if (!AuthContext) return null;

	const {initLoginOrLogout} = useAuth();
	// const navigate = useNavigate();

    // let { status } = useParams();

    // useEffect(() => {
    //     console.log('login page---', status)
    //     if(status = "success") {
    //         navigate("/home");
    //     }
    // }, [statuss])

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitFailed, setSubmitFailed] = useState(false);

	const initiateLogin = async (event) => {
		// event.preventDefault();
		// handleLogin(email, password);
        initLoginOrLogout("/");
        // await AuthHttpClient("/");
        // handleLogin('fdf','fe');
        // window.location.replace(authServerUrl)
	};

	return (
		<div className="Login">
            <p>Login Page</p>
            <p onClick={initiateLogin}>Login</p>
		</div>
        );
}

// export function Logout() {
// 	// @ts-ignore
// 	const {handleLogout} = useAuth();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		handleLogout();
// 		navigate("/");
// 	})

// 	return(<></>)
// }

