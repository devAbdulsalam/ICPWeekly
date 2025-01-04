import React, { useState } from 'react';
// import nodemailer from 'nodemailer';
// import { render } from '@react-email/components';
import Modal from './Modal';
import Preview from './Preview';

function PreviewModal({
	title,
	content,
	isModal,
	setIsModal,
}: {
	content: string;
	title: string;
	isModal: boolean;
	setIsModal: (value: boolean) => void;
}) {
	const [isLoading, setLoading] = useState<boolean>(false);
	// const transporter = nodemailer.createTransport({
	// 	host: 'smtp.forwardemail.net',
	// 	port: 465,
	// 	secure: true,
	// 	auth: {
	// 		user: 'my_user',
	// 		pass: 'my_password',
	// 	},
	// });

	const handleSubmit = async () => {
		if (!content.trim() || !title.trim()) {
			return;
		}
		try {
			setLoading(true);

			console.log('Values', { title, content });

			// const emailHtml = await render(
			// 	<Preview content={content} title={title} />
			// );
			// const options = {
			// 	from: 'you@example.com',
			// 	to: 'user@gmail.com',
			// 	subject: 'hello world',
			// 	html: emailHtml,
			// };

			// await transporter.sendMail(options);
			setLoading(false);
			setIsModal(false);
		} catch (error) {
			console.error('Error generating content:', error);
		}
	};
	return (
		<Modal show={isModal}>
			<div className="transform overflow-hidden min-w-[400px] rounded-2xl bg-white text-left align-middle shadow-xl transition-all font-josefin h-full">
				<div className="flex flex-col space-y-4 w-full md:max-w-4xl mx-auto">
					<div style={{ marginTop: '20px' }}>
						<Preview content={content} title={title} />
					</div>
					<div className="flex justify-between w-full">
						<button className="w-full" onClick={() => setIsModal(false)}>
							Close
						</button>
						<button
							className="w-full"
							disabled={isLoading}
							onClick={handleSubmit}
						>
							Send Mail
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PreviewModal;
