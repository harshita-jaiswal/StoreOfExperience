import {httpClient, updateAxios} from "./HttpService";
import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContextProps} from "../types/ExperienceTypes";
import { useEffect } from "react";
import Cookies from 'js-cookie'

// @ts-ignore
const serverIP = import.meta.env.VITE_AUTH_IP;
// @ts-ignore
const serverPort = import.meta.env.VITE_AUTH_PORT;

const authServerUrl = `http://${serverIP}:${serverPort}`;

const initialToken = getTokenFromCookie();

export const AuthProvider = ({children}) => {
	const navigate = useNavigate();
	const [token, setToken] = useState<string>(initialToken!);
	const [loader, isLoading] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<any>(null);

	useEffect( () => {
		const updateAuth = async() => {
			await updateAxios(token);
			navigate("/home");
		};
		const combineAuth = async() => {
			const user = await Promise.all([
				httpClient.get('/authenticate'),
				httpClient.get('/user')
			]).then(response => {
				console.log(response);
				let data = {
					authenticate: response[0].data,
					userInfo: response[1].data
				}
				return data;
			  });
			// const user = await httpClient.get('/authenticate');
			console.log('user---', user)
			setUserInfo(user.userInfo);
			return user;
		}
		if(token?.length) {
			updateAuth()
			.catch(console.error);
			combineAuth()
				.catch(console.error)
		}
	},[token]);
	

	// const handleLogin = async () => {
	// 	// const newToken = await getLoginTokenFromServer(email, password);
	// 	// await saveToken(newToken);
	// 	return getTokenFromCookie() ? navigate("/home") : "";
	// };

	const handleLogout = async () => {
		// await saveToken(null);
		console.log('handleLogout')
		Cookies.remove('token');
		navigate('/');
	};

	// const saveToken =  async (token: string) => {
	// 	setToken(token);

	// 	localStorage.setItem("token", JSON.stringify(token));

	// 	await updateAxios(token);
	// };

	const initLoginOrLogout = (endpoint: string) => {
		isLoading(true);
		window.location.replace(`${authServerUrl}${endpoint}`)
	}

	const useAuthContextPackage = {
		token,
		loader,
		userInfo,
		// handleLogin,
		handleLogout,
		initLoginOrLogout
	};

	return (
		<AuthContext.Provider value={useAuthContextPackage}>
			{children}
		</AuthContext.Provider>);
};


async function getLoginTokenFromServer(email: string, password: string) {
	console.log("In get login token from server", email, password);
	let res = await httpClient.post("/login", {
		email,
		password
	});

	return res.data.token;
}

function getTokenFromCookie() {
	const tokenString = Cookies.get('token');
	// const tokenString = localStorage.getItem('token');
	if ( tokenString == null) {
		return null;
	}
	// const userToken = JSON.parse(tokenString);
	// return userToken?.token;
	return tokenString;
}

// This is a single abstraction layer to tuck away the creation of the React context itself
export const AuthContext = createContext<AuthContextProps | null>(null);

// This is a SECOND abstraction layer to also tuck away the usage of the Context
// Note this is the ONLY export from all of Auth except for the Provider component itself
// This is because of our abstraction layers
export const useAuth = () => {
	return useContext(AuthContext);
}
