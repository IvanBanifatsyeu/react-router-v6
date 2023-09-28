import { Outlet, useNavigate } from "react-router-dom";
import CustomLink from "./CustomLink";
import { useAuth } from "../hook/useAuth";
const Layout = () => {
	const { user, signin, signout } = useAuth();
	const navigate = useNavigate();
	return (
		<>
			<header>
				<CustomLink to="/" title="xxx">
					Home
				</CustomLink>
				<CustomLink to="/posts">Blog</CustomLink>
				<CustomLink to="/about">About</CustomLink>
			</header>
			<Outlet />
			<footer>
				{user ? (
					<>
						<p style={{ color: "green" }}>you are logged in</p>
						<button
							onClick={() => signout(() => navigate("/", { replace: true }))}
						>
							Log out
						</button>
					</>
				) : (
					<>
						<p style={{ color: "red" }}>you are not logged in</p>
						<button onClick={() => navigate("/login")}>Log in</button>
					</>
				)}
			</footer>
		</>
	);
};

export default Layout;
