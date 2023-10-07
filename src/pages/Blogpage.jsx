import {
	Link,
	useLoaderData,
	useSearchParams,
	defer,
	Await,
} from "react-router-dom";
import BlogFilter from "../components/BlogFilter";
import { Suspense } from "react";

const Blogpage = () => {
	const { posts } = useLoaderData();
	const [searchParams, setSearchParams] = useSearchParams();

	const postQuery = searchParams.get("find") || "";
	const latest = searchParams.has("latest");
	const startFrom = latest ? 80 : 1;

	return (
		<div>
			<h1>Our news</h1>

			<BlogFilter
				setSearchParams={setSearchParams}
				postQuery={postQuery}
				latest={latest}
			/>
			<Link to="/post/new">Add new post</Link>
			<Suspense fallback={<h2>Loading ...</h2>}>
				<Await resolve={posts}>
					{(resolvedPosts) => (
						<>
							{resolvedPosts
								.filter((post) => {
									return post.title.includes(postQuery) && post.id >= startFrom;
								})
								.map((item) => (
									<Link key={item.id} to={`/posts/${item.id}`}>
										<li>{item.title}</li>
									</Link>
								))}
						</>
					)}
				</Await>
			</Suspense>
		</div>
	);
};

async function getPosts() {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
	return res.json();
}

const blogLoader = async ({ request, params }) => {
	return defer({
		posts: getPosts(),
	});
};
export { blogLoader };
export default Blogpage;
