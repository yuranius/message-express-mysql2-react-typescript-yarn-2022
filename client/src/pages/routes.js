import { Routes, Route } from "react-router";
import  { Navigate }  from "react-router-dom";
import React from "react";
import { FriendsContainer } from "./FriendsPage/FriendsContainer";
import { ProfilePageContainer } from "./ProfilePage/ProfilePageContainer";
import { FoundCollocutorsContainer } from "./UsersPage/UsersContainer";
import {AuthPageContainer} from "./AuthPage/AuthPageContainer";
import MassagesContainer from "./MassagePage/MassagesContainer";


export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/" element={<MassagesContainer/>}/>
				<Route path="/users" element={ <FoundCollocutorsContainer />}/>
				<Route path="/friends" exact element={<FriendsContainer />} />
				<Route path="/messages" exact element={<MassagesContainer />} />

				<Route path="/profile" element={<ProfilePageContainer />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}

	return (
		<>

		<Routes>
			<Route path="*" element={<Navigate to="/" />} />
			<Route path="/" element={<AuthPageContainer />} />
		</Routes>
		</>
	);
};
