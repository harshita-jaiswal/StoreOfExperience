import axios from "axios";

// @ts-ignore
const serverIP = import.meta.env.VITE_BACKEND_IP;
// @ts-ignore
const serverPort = import.meta.env.VITE_BACKEND_PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

// This is why I use Axios over Fetch
// Now instead of axios.get("http://localhost:8080/users")
// we have httpClient.get("/users")
console.log('base url----', serverUrl, import.meta)
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims5aXFGZjMxMlRMekJoX0pGZEV1OCJ9.eyJuaWNrbmFtZSI6ImhqNysyIiwibmFtZSI6ImhqNysyQHBkeC5lZHUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNjk4YmZkMjY1YmE0MWZiYTIyY2U2MjQzZDhiOWY5NGI_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZoai5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMy0wMy0xNVQxMDoxNjoxNS44NjJaIiwiZW1haWwiOiJoajcrMkBwZHguZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LXF1dHdkeGt6c3BsOGI0b2kudXMuYXV0aDAuY29tLyIsImF1ZCI6IkFYcDUwaHNDcXlaMVhBUFNWQXBQZGp3c1JlNXVRWG5tIiwiaWF0IjoxNjc4ODc1Mzc2LCJleHAiOjE2Nzg5MTEzNzYsInN1YiI6ImF1dGgwfDY0MGEyOTMwNmE5NDkyYzUyNTE5MWY5OCIsInNpZCI6ImIwemVsNDdqaURkWlBDQ1k4XzN5M1MtdVcyTHFkNnhMIiwibm9uY2UiOiJlT3JMeXI2VnpPeFdzQzhvQ2dYdyJ9.SyEV7MYtfPKpJr58joZeNhIWlEGdZnPLRJ82UBbR6CawsvjwKcb93dWzh3sddIDeAU4srlO5FYxo5eDzopIrqOAiOkrJTKQSKjcVPH09DCWts6DJWP5Lhnio98s0Q0yzRqFrEBfRSkoHasfM0cARBmeY3kcvbtp5nhJkuMTZTflGxDllYzw7DfZQPkyjgtuLT_fFxW2RyK-Q2VASZTc9drMiW7puHrOt3QMfCY9ZNnf5BEefhSMO5zZWkd6k26ZMeR6XpDIIbWxy1yCpG8aSn6lf8qsStHCKYBcbD72QZc9pRaVeGfgB-8MwAKvKvAXlrPep3M09LZoAP7aOE76wTQ";
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
	}
});

// This is called by AuthService.handleLogin/handleLogout
export const updateAxios = async (token: string) => {
	console.log("In update axios");
	httpClient.interceptors.request.use(
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