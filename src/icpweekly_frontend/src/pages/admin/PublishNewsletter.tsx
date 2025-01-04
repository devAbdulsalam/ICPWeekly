import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from '../../components/Editor';
import PreviewModal from '../../components/PreviewModal';
// import Preview from '../../components/Preview';

function IndexPage() {
	const [content, setContent] = useState<string>('');
	const [subject, setSubject] = useState<string>('');
	const [status, setStatus] = useState<string>('draft');
	const [date, setDate] = useState<string>(
		new Date().toISOString().split('T')[0]
	); // Format for `type="date"`
	const [isDisabled, setDisabled] = useState<boolean>(true);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isShowPreview, setIsShowPreview] = useState<boolean>(false);

	useEffect(() => {
		setDisabled(!content.trim() || !subject.trim());
	}, [content, subject]);

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setStatus(e.target.value);
	};

	const handleSubmit = async () => {
		if (!content.trim() || !subject.trim()) {
			return;
		}
		setLoading(true);
		try {
			console.log('Values', { subject, date, status, content });
			setLoading(false);
		} catch (error) {
			console.error('Error generating content:', error);
		}
	};

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-4 w-full md:max-w-4xl mx-auto p-2">
				<div>
					<h2 className="text-2xl font-semibold mt-4 text-center">
						Draft mail
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
				<div className="mt-1">
					<label htmlFor="date" id="date" className="text-lg font-semibold">
						Date
					</label>
					<input
						type="datetime"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="w-full py-3 px-3 border-gray-600 border-[1px] rounded-md mb-4"
					/>
				</div>
				{/* <div className="p-2 h-fit debug"> */}
				<div className=" h-[650px] md:min-h-[600px] relative my-4  ">
					<Editor content={content} setContent={setContent} />
				</div>
				<div className="space-y-4 md:flex justify-between items-center md:mt-10">
					<div>
						<button onClick={() => setIsShowPreview(true)}>Preview mail</button>
					</div>
					<div>
						<select
							onChange={handleStatusChange}
							className="w-full md:w-fit bg-transparent border px-2 outline-none flex items-center justify-center space-x-3  py-3 rounded-lg"
						>
							<option value="draft">Draft</option>
							<option value="publish">Publish</option>
						</select>
					</div>
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
			{isShowPreview && (
				<PreviewModal
					content={content}
					title={subject}
					isModal={isShowPreview}
					setIsModal={setIsShowPreview}
				/>
			)}
		</div>
	);
}

export default IndexPage;
