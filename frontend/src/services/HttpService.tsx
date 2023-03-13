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
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims5aXFGZjMxMlRMekJoX0pGZEV1OCJ9.eyJuaWNrbmFtZSI6ImhqNysyIiwibmFtZSI6ImhqNysyQHBkeC5lZHUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNjk4YmZkMjY1YmE0MWZiYTIyY2U2MjQzZDhiOWY5NGI_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZoai5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMy0wMy0xMlQxMDowMDoyMi44NzNaIiwiZW1haWwiOiJoajcrMkBwZHguZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LXF1dHdkeGt6c3BsOGI0b2kudXMuYXV0aDAuY29tLyIsImF1ZCI6IkFYcDUwaHNDcXlaMVhBUFNWQXBQZGp3c1JlNXVRWG5tIiwiaWF0IjoxNjc4NjU4NDE4LCJleHAiOjE2Nzg2OTQ0MTgsInN1YiI6ImF1dGgwfDY0MGEyOTMwNmE5NDkyYzUyNTE5MWY5OCIsInNpZCI6Il9DUHk2WXZqVXkxMFlrYjVnZFJpRUlFaDE0NkNMYUJ3Iiwibm9uY2UiOiJoSk9zTUprTnJCclNvU29zckMxVyJ9.2ht8ibPd6Ut1JpVejHEb-Z4lvLaeLBCgg-dEtHA450qcdXxx8pe-Glc8Sh4KNiNNuR1vaS1fCtoD933k-hf5JdflQx6RE-AxDvW5bi5PZg-aw1xfsSgO0d8AWxiHcgGHhPRPL3TIRcfxZiEK1cmCAmQkt211AVjqEN1G5XVmECrcgX5u9SmxMwVJ58Jq87xi1ACf7ZB3u-t7UTR_umx89xAcWkAOO1m6o8ugAwSSwWM4FMUeRWMVCPgmJKYZKxuRelY6Ctya7bRoykzHn-rs23glkzZpsHJaMRQkzILMjvKQK-Nq5v_o49wPHrWTkZhLh1QFfPYNf6lIHMnh3PbmEg";
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