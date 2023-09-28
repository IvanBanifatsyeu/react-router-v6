import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogpage = () => {
	const [list, setList] = useState([]);
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((data) => setList(data));
	}, []);

	return (
		<div>
			<h1>Our news</h1>
			<Link to="/post/new">Add new post</Link>
			<ul>
				{list.map((item) => (
					<Link key={item.id} to={`/posts/${item.id}`}>
						<li>{item.title}</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Blogpage;
