import React from 'react';

const Card = ({ title, description, link }: { title: string; description: string; link: string }) => (
	<div className="border rounded-lg p-4 bg-white shadow-md">
		<h3 className="text-xl font-bold">{title}</h3>
		<p className="mt-2 text-gray-600">{description}</p>
		<a href={link} className="mt-4 text-blue-500 hover:underline block">
			Learn more
		</a>
	</div>
);

export default Card;
