import {
	Route,
	Navigate,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Blogpage, { blogLoader } from "./pages/Blogpage";
import Notfoundpage from "./pages/Notfoundpage";
import Layout from "./components/Layout";
import Singlepage, { postLoader } from "./pages/Singlepage";
import Loginpage from "./pages/Loginpage";
import Createpost from "./pages/Createpost";
import RequireAuth from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import Editpost from "./pages/Editpost";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Homepage />} />
			<Route path="about" element={<Aboutpage />}>
				<Route path="contacts" element={<p>Our contact</p>} />
				<Route path="team" element={<p>Our Team</p>} />
			</Route>
			<Route path="about-us" element={<Navigate to="/about" replace />} />
			<Route path="posts" element={<Blogpage />} loader={blogLoader} />
			<Route path="posts/:id" element={<Singlepage />} loader={postLoader} />
			<Route path="*" element={<Notfoundpage />} />
			<Route path="login" element={<Loginpage />} />
			<Route path="posts/:id/edit" element={<Editpost />} />
			<Route
				path="post/new"
				element={
					<RequireAuth>
						<Createpost />
					</RequireAuth>
				}
			/>
		</Route>
	)
);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
