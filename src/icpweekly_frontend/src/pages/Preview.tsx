import React from 'react';
import DOMPurify from 'dompurify';
import { useAppContext } from '../context/context';

export const Preview = () => {
	const { post } = useAppContext();
	console.log('post', post);
	const createMarkup = (html: any) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};
	return (
		<main className="flex h-screen flex-col p-2 md:p-8 items-start justify-center">
			<div className="w-full h-full">
				<h2 className="text-2xl font-semibold my-4 text-center">Preview</h2>
				<div className="max-w-3xl mx-auto rounded-sm border p-1">
					<div className="flex flex-col w-full py-2">
						<h2 className="font-semibold text-lg text-slate-700">
							Subject: {post?.title}
						</h2>
						<p className="text-lg text-slate-700">Author: {post?.author}</p>
						<p className="text-lg text-slate-700">Date: {post?.scheduled}</p>
					</div>
					<div className="flex flex-col space-y-4 w-full border-t ">
						<div style={{ marginTop: '10px' }}>
							<div dangerouslySetInnerHTML={createMarkup(post?.content)} />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Preview;
