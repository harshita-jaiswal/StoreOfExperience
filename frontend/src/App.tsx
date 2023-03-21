import {AuthProvider} from "./services/AuthService";
import Main from "./template/main";

import './App.scss';

export default function App() {
	return (
		<AuthProvider>
			<div className="App">
				<Main/>
			</div>
		</AuthProvider>
	);
}
