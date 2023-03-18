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
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims5aXFGZjMxMlRMekJoX0pGZEV1OCJ9.eyJuaWNrbmFtZSI6ImhqNyszIiwibmFtZSI6ImhqNyszQHBkeC5lZHUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvZWQwMGY3ZWFiMzUxMmMzZjVkODRjNWZkMDVjOTlkNGE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZoai5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMy0wMy0xOFQwMjoxNDozOS4zMTdaIiwiZW1haWwiOiJoajcrM0BwZHguZWR1IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1xdXR3ZHhrenNwbDhiNG9pLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJBWHA1MGhzQ3F5WjFYQVBTVkFwUGRqd3NSZTV1UVhubSIsImlhdCI6MTY3OTEwNTY4NCwiZXhwIjoxNjc5MTQxNjg0LCJzdWIiOiJhdXRoMHw2NDE1MWU4ZmY5MzkzNjVhNTY4ZTQxYzgiLCJzaWQiOiI1WVpocU5MMl9JanNEak9XUWFPOXZ0MEdvd0tUcnBMdyIsIm5vbmNlIjoianFVNTc2TE5GYW9SSG4yU3hFNEMifQ.egGEQI1Z5BHeGfRhLAKWp9yJ3NQU8ZHtXZx-S_MWT38orfoSXKeu2cHBW9CaMp7vKpqlWlCPVp6XMsNFXdJrl8TAb893H534tV0EPgMNpOGpnQkFx3Gcz9f_jXboXXwgbh6o6W6GqWTaUZqOdhU9rtq_0NzjMct3c_pz0ftGrrOHR1zrxrA6ijCMM0CWskBHVFP3jOHXnw1jPhA-XXJzEsm7K4KEDsd0cMbI-3IA7EO_ZVrWO3qIHSLeKHMi1GFA76o8qnsGo8dH4WbQ2pZG-UlXDYQNHft7nKy1Kfmqyt7Qqewb4N1yqnj9-f5LnzeoIGM9eDGh_-5RkaBEOTGyhA";
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