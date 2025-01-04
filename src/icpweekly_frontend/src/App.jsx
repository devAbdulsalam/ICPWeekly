import { Routes, Route } from 'react-router-dom';
// import ProtectedRoutes from './hooks/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/admin/Register';
// import NotFound from './NotFound';
// import Layout from './Layout';
// import Dashboard from './pages/Dashboard';
import PublishNewsletter from './pages/admin/PublishNewsletter';
// import IndexPage from './pages/IndexPage';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import Subscribed from './pages/Subscribed';
// import DashboardLayout from './pages/DashboardLayout';
import Navbar from './components/Navbar';
import Posts from './pages/Posts';
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
				{/* <Route path="/" element={<Layout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<IndexPage />} />
				<Route element={<ProtectedRoutes />}>
					<Route exact path="/" element={<DashboardLayout />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
				</Route> <Route path="*" element={<NotFound />} />
			{/* </Route> */}
			</Routes>
		</>
	);
}

export default App;
