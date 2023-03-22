import {AuthContext, useAuth} from "../../services/AuthService";
import logo from '../../assets/banner-2.jpeg'
import "./index.scss";

export default function Login() {

	if (!AuthContext) return null;

	const {initLoginOrLogout} = useAuth();

	const initiateLogin = async () => {
        initLoginOrLogout("/");
	};
    const divStyle = {
        background: '#fcb900 no-repeat center/100% url(' + logo + ')',
      };

	return (
		<div className="Login" style={divStyle}>
            <p className="Login__text" onClick={initiateLogin}>Let's Star! Login or Signup</p>
		</div>
        );
}
