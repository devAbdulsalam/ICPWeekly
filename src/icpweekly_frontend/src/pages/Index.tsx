import React, { useState, ChangeEvent } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { icpweekly_backend } from 'declarations/icpweekly_backend';

const Button = ({
	isLoading,
	label,
	onClick,
	icon: Icon,
}: {
	isLoading: boolean;
	label: string;
	onClick: () => void;
	icon?: React.ComponentType;
}) => (
	<button
		className="py-3 px-6 flex items-center justify-center rounded-md border-gray-600 border-2 w-3/5 mb-4 text-lg hover:bg-gray-800 hover:text-gray-50"
		onClick={onClick}
		disabled={isLoading}
	>
		{Icon && <Icon className="inline-block mr-2" />}
		{isLoading ? 'Processing...' : label}
	</button>
);

export default function Home() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState({ type: '', content: '' });
	const [loading, setLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubscribe = async () => {
		if (!email) {
			setMessage({ type: 'error', content: 'Email address is required.' });
			return;
		}
		setLoading(true);
		setMessage({ type: '', content: '' });

		setLoading(false);

		// const result = await icpweekly_backend.putPoint({ name }, { point });
		//  icpweekly_backend.greet(name).then((res) => {
		// 		setUser(name);
		// 		setIsLoading(false);
		// 		setIsInstruction(res);
		// 	});
		const isSuccess = Math.random() > 0.5;

		setMessage({
			type: isSuccess ? 'success' : 'error',
			content: isSuccess
				? 'Subscription successful! 🎉'
				: 'Subscription failed. Please try again.',
		});
	};

	return (
		<main className="flex h-screen flex-col p-8 items-center justify-center">
			<div>
				<h2 className="text-3xl font-bold mb-6">Sign up to the Newsletter</h2>
				<p className="mb-4 w-full flex-row text-center font-medium text-gray-200 md:w-[60%] lg:w-[50%]">
					Subscribe to get custom React hooks, prebuilt UI components, and
					exclusive developer resources delivered to your inbox.
				</p>
			</div>

			<div className="mt-4 flex w-full flex-col gap-3 rounded-xl bg-white p-3 md:w-[60%] md:flex-row md:items-center md:gap-4 md:p-1 lg:w-[40%]">
				<input
					type="email"
					placeholder="Enter your email address"
					className="w-full outline-none md:pl-4"
					value={email}
					onChange={handleChange}
				/>
				<div className="flex items-center gap-3">
					{message.content && (
						<p
							className={`mt-1 text-lg font-bold ${
								message.type === 'success' ? 'text-green-500' : 'text-red-500'
							}`}
						>
							{message.content}
						</p>
					)}
				</div>
				<button
					aria-label="Subscribe to Newsletter"
					className={`rounded-lg px-8 py-2 text-sm font-medium text-white transition-colors duration-300 md:text-lg ${
						loading.subscribe
							? 'cursor-not-allowed bg-gray-300'
							: 'bg-indigo-900 hover:bg-indigo-500'
					}`}
					onClick={handleSubscribe}
					disabled={loading.subscribe}
				>
					{loading.subscribe ? 'Subscribing...' : 'Subscribe'}
				</button>
			</div>
		</main>
	);
}
