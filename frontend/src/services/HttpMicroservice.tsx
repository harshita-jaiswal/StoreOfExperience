import axios from "axios";

// @ts-ignore
const serverIP = import.meta.env.VITE_AUTH_IP;
// @ts-ignore
const serverPort = import.meta.env.VITE_AUTH_PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

// This is why I use Axios over Fetch
// Now instead of axios.get("http://localhost:8080/users")
// we have AuthHttpClient.get("/users")
export const AuthHttpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json"
	}
});

// This is called by AuthService.handleLogin/handleLogout
export const updateAxios = async (token: string) => {
	console.log("In update axios");
	AuthHttpClient.interceptors.request.use(
		async config => {

			// @ts-ignore
			config.headers = {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			};

			return config;
		},
		error => {
			console.log("REJECTED PROMISE");
			Promise.reject(error);
		});
};
