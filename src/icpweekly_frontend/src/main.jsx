import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/context';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AppProvider>
				<Toaster />
				<App />
			</AppProvider>
		</BrowserRouter>
	</StrictMode>
);
