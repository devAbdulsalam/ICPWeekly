import React, { useState, useEffect, useContext } from 'react';
import { icpweekly_backend } from '../../../../declarations/icpweekly_backend';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from '../../components/Editor';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/context';

function IndexPage() {
	const [content, setContent] = useState<string>('');
	const [subject, setSubject] = useState<string>('');
	const [status, setStatus] = useState<string>('draft');
	const { post, setPost } = useAppContext();
	const navigate = useNavigate();
	const [date, setDate] = useState<string>(
		new Date().toISOString().split('T')[0]
	); // Format for `type="date"`
	const [isDisabled, setDisabled] = useState<boolean>(true);
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (post) {
			setContent(post.content);
			setSubject(post.title);
			setStatus(post.status);
			setDate(post.scheduled);
		}
	}, []);

	useEffect(() => {
		setDisabled(!content.trim() || !subject.trim());
	}, [content, subject]);

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setStatus(e.target.value);
	};

	const handleSubmit = async () => {
		if (!content.trim() || !subject.trim()) {
			toast.error('Title and content are required.');
			return;
		}
		// validate date and time to future
		const currentTime = new Date().toISOString().split('T')[1].split('.')[0];
		const scheduledTime = new Date(date)
			.toISOString()
			.split('T')[1]
			.split('.')[0];
		console.log('currentTime', currentTime);
		console.log('scheduledTime', scheduledTime);
		if (currentTime >= scheduledTime) {
			toast.error('Scheduled date and time must be in the future.');
			return;
		}
		setLoading(true);
		try {
			const data: {
				title: string;
				date: string;
				status: string;
				content: string;
				author: string;
				scheduled: string;
			} = {
				title: subject,
				status,
				content,
				author: 'admin',
				scheduled: date,
				date: new Date(date).toISOString(), // Convert date to ISO string
			};

			const result = await icpweekly_backend.createPost(
				data.title,
				data.content,
				data.author,
				data.date,
				status
			);
			console.log(result);
			setPost(null);
			navigate(`/posts/${subject}`);
			setLoading(false);
		} catch (error) {
			console.error('Error generating content:', error);
		}
	};

	const handlePreview = () => {
		if (!content.trim() || !subject.trim()) {
			toast.error('Title and content are required.');
			return;
		}
		setPost({
			title: subject,
			content,
			author: 'admin',
			scheduled: date || new Date().toISOString,
		});
		navigate(`/preview-post`);
	};

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-4 w-full md:max-w-4xl mx-auto p-2">
				<div>
					<h2 className="text-2xl font-semibold mt-4 text-center">
						Draft Newsletter
					</h2>
				</div>
				<div className="mt-3">
					<label
						htmlFor="subject"
						id="subject"
						className="text-lg font-semibold"
					>
						Subject
					</label>
					<input
						type="text"
						placeholder="Subject"
						name="subject"
						id="subject"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						className="w-full py-3 px-3 border-gray-600 border-[1px] rounded-md"
					/>
				</div>

				<div className="flex gap-2 flex-col md:flex-row items-end justify-between mb-4">
					<div className="w-full">
						<label htmlFor="date" id="date" className="text-lg font-semibold">
							Date
						</label>
						<input
							type="datetime-local"
							id="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="w-full py-2 px-3 border-gray-600 border-[1px] rounded-md "
						/>
					</div>
					<div className="w-full">
						<label htmlFor="date" id="date" className="text-lg font-semibold">
							Status
						</label>
						<select
							onChange={handleStatusChange}
							className="w-full bg-transparent border px-2 outline-none flex items-center justify-center space-x-3  py-3 rounded-lg"
						>
							<option value="draft">Draft</option>
							<option value="publish">Publish</option>
							<option value="schedule">Schedule</option>
						</select>
					</div>
				</div>
				<div className="md:p-2 h-fit flex flex-col">
					<div className="min-h-[600px] relative my-2">
						<Editor content={content} setContent={setContent} />
					</div>
					<div className=" space-y-2 md:space-y-0 gap-2 sm:flex justify-between items-center">
						<button
							onClick={handlePreview}
							className="py-3 px-10 w-full md:w-fit rounded-lg bg-gray-400 text-white hover:bg-gray-500 cursor-pointer"
						>
							Preview mail
						</button>

						<button
							onClick={handleSubmit}
							className={`${
								isDisabled
									? 'bg-gray-600 text-white'
									: 'bg-black text-gray-50 cursor-pointer'
							} flex items-center justify-center space-x-3  py-3 px-10 w-full md:w-fit rounded-lg `}
							disabled={isDisabled || isLoading}
						>
							{isLoading ? 'Submitting...' : 'Submit'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IndexPage;
