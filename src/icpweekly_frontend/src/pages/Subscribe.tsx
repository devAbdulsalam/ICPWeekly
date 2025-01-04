import React, { useState, ChangeEvent } from 'react';
import { icpweekly_backend } from '../../../declarations/icpweekly_backend';
import { useNavigate } from 'react-router-dom';


export default function Home() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState({ type: '', content: '' });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubscribe = async () => {
		if (!email) {
			setMessage({ type: 'error', content: 'Email address is required.' });
			return;
		}
		// validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setMessage({ type: 'error', content: 'Please enter a valid email address.' });
			return;
		}
		setLoading(true)
		const result = await icpweekly_backend.subscribe(email);
		console.log('result', result);
		setLoading(false);
		setMessage({
			type: 'success',
			content: 'Subscription successful! 🎉',
		});
		navigate('/');
		setMessage({ type: '', content: '' });
	};

	return (
		<main className="flex h-screen flex-col p-8 items-center justify-center">
			<div className="text-center">
				<h2 className="text-3xl font-bold mb-6">Subscribe to ICPWeekly</h2>
				<p className="mb-4 w-full flex-row text-center font-medium text-gray-800 ">
					Stay updated with the latest from the ICP ecosystem!
				</p>
			</div>

			<div className="mt-4 flex w-full flex-col justify-center gap-3 rounded-xl bg-white p-3 md:w-[60%] md:flex-row md:items-center md:gap-4 md:p-1 lg:w-[40%]">
				<input
					type="email"
					placeholder="Enter your email address"
					value={email}
					onChange={handleChange}
					className="w-full py-3 px-6 border-gray-600 border-[1px] rounded-md "
				/>
				<button
					aria-label="Subscribe to Newsletter"
					className={`rounded-lg px-8 py-2 text-sm font-medium text-white transition-colors duration-300 md:text-lg ${
						loading
							? 'cursor-not-allowed bg-gray-300'
							: 'bg-indigo-900 hover:bg-indigo-500'
					}`}
					onClick={handleSubscribe}
					disabled={loading}
				>
					{loading ? 'Subscribing...' : 'Subscribe'}
				</button>
			</div>
			<div className="flex items-center gap-3">
				{message.content && (
					<p
						className={`mt-1 text-lg font-bold ${
							message.type === 'success' ? 'text-green-500' : 'text-red-400'
						}`}
					>
						{message.content}
					</p>
				)}
			</div>
		</main>
	);
}
