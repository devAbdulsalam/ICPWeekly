export default function Subscribed() {
	const handleSignOut = () => {
		//👉🏻 signout the subscriber
	};

	return (
		<main className="p-8 min-h-screen flex flex-col items-center justify-center">
			<h3 className="text-3xl font-bold mb-4">You&apos;ve Subscribed!</h3>
			<button
				className="bg-black text-gray-50 px-8 py-4 rounded-md w-[200px]"
				onClick={handleSignOut}
			>
				Back
			</button>
		</main>
	);
}
