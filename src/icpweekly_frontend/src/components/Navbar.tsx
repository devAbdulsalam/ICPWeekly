import { useState } from 'react';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-blue-600 text-white px-4 py-2">
			<div className="container mx-auto flex justify-between">
				<h1 className="text-lg font-bold">
					<a href="/" className="hover:underline">
						ICPWeekly
					</a>
				</h1>
				<button
					className="block md:hidden"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</button>
				<ul
					className={`md:flex space-x-4 ${
						isOpen ? 'block' : 'hidden'
					}`}
				>
					<li>
						<a href="/" className="hover:underline">
							Home
						</a>
					</li>
					<li>
						<a href="/subscribe" className="hover:underline">
							Subscribe
						</a>
					</li>
					<li>
						<a href="/publish" className="hover:underline">
							Publish
						</a>
					</li>
					<li>
						<a href="/posts" className="hover:underline">
							Posts
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;

