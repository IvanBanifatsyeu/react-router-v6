import React from "react";
import { useAuth } from "../hook/useAuth";

const Homepage = () => {
	const { user } = useAuth();
	return (
		<div>
			<h1>Get started with React-Router 6</h1>
		</div>
	);
};

export default Homepage;
