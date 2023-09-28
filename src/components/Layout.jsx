import { Outlet } from "react-router-dom";
import CustomLink from "./CustomLink";
const Layout = () => {
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
			<footer>2023</footer>
		</>
	);
};

export default Layout;
