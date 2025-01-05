import React, {
	createContext,
	useContext,
	useState,
	useMemo,
	ReactNode,
} from 'react';

interface AppState {
	user: any; // Replace `any` with the appropriate type for `user`
	post: any; // Replace `any` with the appropriate type for `post`
}

interface AppContextType extends AppState {
	setUser: React.Dispatch<React.SetStateAction<any>>;
	setPost: React.Dispatch<React.SetStateAction<any>>;
}

interface AppProviderProps {
	children: ReactNode;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the AppContext
const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};

// Provider component
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [user, setUser] = useState<any>(null);
	const [post, setPost] = useState<any>(null);

	// Memoize the context value
	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			post,
			setPost,
		}),
		[user, post]
	);

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};

export { AppProvider, useAppContext };
