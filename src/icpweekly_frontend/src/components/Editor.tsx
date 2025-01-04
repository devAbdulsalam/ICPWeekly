import React from 'react';
import ReactQuill from 'react-quill';
// import EditorToolbar, { formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';

export default function Editor({
	content,
	setContent,
}: {
	content: string;
	setContent: (value: string) => void;
}) {
	const toolbarOptions = [
		[{ header: '1' }, { header: '2' }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image', 'video'],
		['clean'], // remove formatting button
	];
	return (
		<ReactQuill
			theme="snow"
			value={content}
			placeholder="Write something..."
			onChange={setContent}
			style={{ height: '500px', marginBottom: '35px' }}
			// modules={modules}
			modules={{ toolbar: toolbarOptions }}
			// formats={formats}
		/>
	);
}

// var SizeStyle = Quill.import('attributors/style/size');
// Quill.register(SizeStyle, true);

// // Initialize as you would normally
// var quill = new Quill('#editor', {
// 	modules: {
// 		toolbar: true,
// 	},
// 	theme: 'snow',
// });