import {
	Routes,
	Route,
	NavLink,
	Navigate,
	useNavigate
} from 'react-router-dom';
import { useAuth } from "../../services/AuthService";

const ProtectedRoute = ({ children }) => {
	const { token } = useAuth();
	console.log('protected route---', token);
	if (!token) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;