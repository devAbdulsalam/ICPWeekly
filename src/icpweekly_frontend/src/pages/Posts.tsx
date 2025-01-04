import React, { useState, useEffect } from 'react';
import { icpweekly_backend } from '../../../declarations/icpweekly_backend';
import Card from '../components/Card';
import Loader from '../components/Loader';

export default function Posts() {
	const [posts, setPosts] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchResources = async () => {
			setLoading(true);
			const res = await icpweekly_backend.getPosts();
			console.log('res', res);
			setPosts(res);
			setLoading(false);
		};
		fetchResources();
	}, []);
	const handlePreview = (post: any) => {
		//���� preview post
		console.log('handlePreview', post);
	};

	const getDate = (date: any) => {
		// convert Bigint to date format
		const createdDate = new Date(Number(date / 1_000_000n));
		return createdDate.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<main className="flex h-screen flex-col p-2 md:p-8 items-start justify-center">
					<div className="w-full h-full">
						<h2 className="text-2xl font-semibold my-4 text-center">Posts</h2>
						<div className=" grid grid-cols-1 md:grid-cols-3 gap-2 items-center w-full">
							{posts?.length > 0 &&
								posts.map((post, index) => {
									return (
										<div
											key={index}
											className="bg-white shadow-md rounded-md p-4 mt-4 w-full"
										>
											<h3 className="text-xl font-semibold">{post?.title}</h3>
											<p>Created on: {getDate(post?.createdAt)}</p>
											<p>Schedule for: {post?.scheduled}</p>
											<p>Last updated on: {getDate(post?.updatedAt)}</p>
											<p className="text-sm">{post?.status}</p>
											<button
												onClick={() => handlePreview(post)}
												className="bg-blue-500 text-white px-2 py-1 rounded-md"
											>
												Preview
											</button>
										</div>
									);
								})}
						</div>
					</div>
				</main>
			)}
		</>
	);
}
