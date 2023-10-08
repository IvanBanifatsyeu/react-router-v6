import { Fragment, Suspense } from "react";
import {
	useLoaderData,
	useNavigate,
	Link,
	Await,
	useAsyncValue,
} from "react-router-dom";

const Post = () => {
	const post = useAsyncValue();
	return (
		<>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</>
	);
};

const Comments = () => {
	const comments = useAsyncValue();

	return (
		<div>
			<h2>Comments</h2>
			{comments.map((comment, ind) => (
				<Fragment key={ind}>
					<h3>{comment.email}</h3>
					<h4>{comment.name}</h4>
					<p>{comment.body}</p>
				</Fragment>
			))}
		</div>
	);
};

const Singlepage = () => {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	const { post, id, comments } = useLoaderData();

	return (
		<div>
			<button onClick={goBack}>Go Back</button>
			<Suspense fallback={<h2>Loading post...</h2>}>
				<Await resolve={post}>
					<Post />
				</Await>
			</Suspense>
			<Suspense fallback={<h2>Loading comments...</h2>}>
				<Await resolve={comments}>
					<Comments />
				</Await>
			</Suspense>

			<Link to={`/posts/${id}/edit`}>Edit this post with ID = {id}</Link>
		</div>
	);
};

async function getPostById(id) {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	return res.json();
}

async function getCommentsById(id) {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}/comments`
	);
	return res.json();
}

const postLoader = async ({ params }) => {
	const id = params.id;

	return { post: await getPostById(id), id, comments: getCommentsById(id) };
};

export default Singlepage;
export { postLoader };
