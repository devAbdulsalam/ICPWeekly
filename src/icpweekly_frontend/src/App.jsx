import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/admin/Register';
import NotFound from './NotFound';
import PublishNewsletter from './pages/admin/PublishNewsletter';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import Subscribed from './pages/Subscribed';
import Navbar from './components/Navbar';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Preview from './pages/Preview';
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/admin/login" element={<Login />} />
				{/* <Route path="/" element={<IndexPage />} /> */}
				<Route path="/" element={<Home />} />
				<Route path="/subscribe" element={<Subscribe />} />
				<Route path="/publish" element={<PublishNewsletter />} />
				<Route path="/admin/register" element={<Register />} />
				<Route path="/subscribed" element={<Subscribed />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/preview-post" element={<Preview />} />
				<Route path="/posts/:id" element={<Post />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
