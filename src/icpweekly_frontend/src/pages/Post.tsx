import DOMPurify from 'dompurify';
import React, { useState, useEffect } from 'react';
import { icpweekly_backend } from '../../../declarations/icpweekly_backend';
import Loader from '../components/Loader';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Post() {
	const [post, setPost] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
	useEffect(() => {
        const fetchResources = async () => {
            if (!id) {
                return
            }
			setLoading(true);
            const res = await icpweekly_backend.getPost(id);
            setLoading(false);
			if (res) {
				console.log('res', res);
			   return  setPost(res);
			} else {
				toast.error('Error fetching post:', res);
				console.error('Error fetching post:', res);
                navigate('../posts')
            }
		};
		fetchResources();
	}, [id]);
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
	const createMarkup = (html: any) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<main className="flex h-screen flex-col p-2 md:p-8 items-start justify-center">
					<div className="w-full h-full">
						<h2 className="text-2xl font-semibold my-4 text-center">
							Preview Newsletter
						</h2>
						<div className="max-w-3xl mx-auto rounded-sm border p-1">
							<div className="flex flex-col w-full py-2">
								<h2 className="font-semibold text-lg text-slate-700">
									Subject: {post?.title}
								</h2>
								<p className="text-lg text-slate-700">
									Author: {post?.author}
								</p>
								<p className="text-lg text-slate-700">
									Date: {post?.scheduled}
								</p>
							</div>
							<div className="flex flex-col space-y-4 w-full border-t ">
								<div style={{ marginTop: '10px' }}>
									<div dangerouslySetInnerHTML={createMarkup(post?.content)} />
								</div>
							</div>
						</div>
					</div>
				</main>
			)}
		</>
	);
}
