import React from "react";
import { Form } from "react-router-dom";

const NewPost = ({ submitting }) => {
	return (
		<Form action="/post/new" method="post" className="formm">
			<label>
				Title:
				<input type="text" name="title" />
			</label>
			<label>
				Body:
				<input type="text" name="body" />
			</label>
			<input type="hidden" name="userId" value="1" />
			<input type="submit" value="Add post" disabled={submitting} />
		</Form>
	);
};

export default NewPost;
