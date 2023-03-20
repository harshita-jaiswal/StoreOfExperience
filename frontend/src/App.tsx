import {AuthProvider} from "./services/AuthService";
import Main from "./template/main";

// Note this is APP SPECIFIC css not included in our sitewide index.css
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
