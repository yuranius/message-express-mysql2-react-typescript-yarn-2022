import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import React from "react";


import { MessagePage } from "./pages/MessagePage";
//import { CollocutorsPage } from "./pages/Collocutors/CollocutorsPage";
import { UsersPage } from "./pages/Users/UsersPage";

import { ProfilePageContainer } from "./pages/ProfilePage/ProfilePageContainer";
import { AuthPage } from "./pages/AuthPage";
//import { FoundCollocutorsContainer } from "./pages/FindCollocutors/FindCollocutorsContainer";
import { FoundUsersContainer } from "./pages/FindUsers/FindCusersContainer";


export const useRoutes = (isAuthenticated) => {
	// isAuthenticated = true;
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/" element={<MessagePage/>}/>
				<Route path="/all" element={ <FoundCollocutorsContainer />}/>
				<Route path="/friends" exact element={<CollocutorsPage />} />
				<Route path="/messages" exact element={<MessagePage />} />
				<Route path="/profile" element={<ProfilePageContainer />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}

	return (
		<>
		<Routes>
			<Route path="*" element={<Navigate to="/" />} />
			<Route path="/" element={<AuthPage />} />
		</Routes>
		</>
	);
};