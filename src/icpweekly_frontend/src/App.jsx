import { Routes, Route } from 'react-router-dom';
// import ProtectedRoutes from './hooks/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/admin/Register';
// import NotFound from './NotFound';
// import Layout from './Layout';
// import Dashboard from './pages/Dashboard';
import PublishNewsletter from './pages/admin/PublishNewsletter';
// import IndexPage from './pages/IndexPage';
import Index from './pages/Index';
import Subscribe from './pages/Subscribe';
// import DashboardLayout from './pages/DashboardLayout';
function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			{/* <Route path="/" element={<IndexPage />} /> */}
			<Route path="/index" element={<Index />} />
			<Route path="/" element={<PublishNewsletter />} />
			<Route path="/admin/register" element={<Register />} />
			<Route path="/subscribe" element={<Subscribe />} />
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
	);
}

export default App;
