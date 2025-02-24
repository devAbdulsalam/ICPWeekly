import React, { useEffect, useState } from 'react';
import Subscribed from '../pages/Subscribed';

interface SubscribersData {
	email: string;
	Subscribed: boolean;
}

export default function Newsletters() {
	const [recipients, setRecipients] = useState<string[]>([]);
	const [subject, setSubject] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [disabled, setDisable] = useState<boolean>(false);
	const [subscribers, setSubscribers] = useState<SubscribersData[]>([]);
	const [newsLetters, setNewsletters] = useState<string[]>([]);

	const handleSendNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		emailNewsletter();
	};

	const emailNewsletter = async () => {
		//👉🏻 send newsletter
	};

	const fetchRecipients = async () => {
		//👉🏻 fetch all subscribers
	};

	const fetchNewsLetters = async () => {
		//👉🏻 fetch all newsletters
	};

	useEffect(() => {
		fetchRecipients();
		fetchNewsLetters();
	}, []);

	return (
		<main className="w-full">
			<h2 className="font-bold text-2xl mb-4">Create Campaign</h2>
			<form onSubmit={handleSendNewsletter} className="mb-8">
				<label htmlFor="subject">Subject</label>
				<input
					type="text"
					id="subject"
					value={subject}
					required
					onChange={(e) => setSubject(e.target.value)}
					className="w-full px-4 py-3 border-[1px] border-gray-600 rounded-sm mb-3"
				/>

				<label htmlFor="recipients">Recipients</label>
				<input
					type="text"
					id="recipients"
					className="w-full px-4 py-3 border-[1px] border-gray-600 rounded-sm mb-3"
					disabled
					readOnly
					value={recipients.join(', ')}
				/>
				<label htmlFor="message">Message</label>
				<textarea
					id="message"
					rows={5}
					value={message}
					required
					onChange={(e) => setMessage(e.target.value)}
					className="w-full px-4 py-3 border-[1px] border-gray-600 rounded-sm"
				></textarea>
				<button
					className="bg-blue-500 text-white py-3 px-6 rounded my-3"
					disabled={disabled}
				>
					{disabled ? 'Sending...' : 'Send Newsletter'}
				</button>
			</form>

			<h2 className="font-bold text-2xl ">Recent Newsletters</h2>
			<div className="flex flex-col gap-4">
				{newsLetters.map((item, index) => (
					<div
						className="flex justify-between items-center bg-gray-100 p-4"
						key={index}
					>
						<h3 className="font-bold text-md">{item}</h3>
						<button className="bg-green-500 text-gray-50 px-4 py-2 rounded-md">
							Sent
						</button>
					</div>
				))}
			</div>
		</main>
	);
}
