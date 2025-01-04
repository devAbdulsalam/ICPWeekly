import React from 'react';
import DOMPurify from 'dompurify';

export const Preview = ({
	content,
	title,
}: {
	content: String;
	title: String;
}) => {
	const createMarkup = (html: any) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};
	return (
		<div className="max-w-3xl max-auto rounded-sm border p-2">
			<h2 className="font-bold text-2xl py-2 text-slate-700 text-center">{title}</h2>
			<div className="flex flex-col space-y-4 w-full">
				<div style={{ marginTop: '10px' }}>
					<div dangerouslySetInnerHTML={createMarkup(content)} />
				</div>
			</div>
		</div>
	);
};

export default Preview;
