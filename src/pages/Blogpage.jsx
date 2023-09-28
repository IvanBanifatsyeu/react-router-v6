import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BlogFilter from "../components/BlogFilter";

const Blogpage = () => {
	const [list, setList] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const postQuery = searchParams.get("find") || "";
	const latest = searchParams.has("latest");
	const startFrom = latest ? 80 : 1;

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((data) => setList(data));
	}, []);

	return (
		<div>
			<h1>Our news</h1>

			<BlogFilter
				setSearchParams={setSearchParams}
				postQuery={postQuery}
				latest={latest}
			/>
			<Link to="/post/new">Add new post</Link>
			<ul>
				{list
					.filter((post) => {
						console.log(postQuery);
						return post.title.includes(postQuery) && post.id >= startFrom;
					})
					.map((item) => (
						<Link key={item.id} to={`/posts/${item.id}`}>
							<li>{item.title}</li>
						</Link>
					))}
			</ul>
		</div>
	);
};

export default Blogpage;
