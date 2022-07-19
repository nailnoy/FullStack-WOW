import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home";
import Club from "../src/pages/Club";
import MyPage from "./pages/Mypage";
import ScrollToTop from "./components/common/ScrollToTop";
import GlobalStyles from "./GlobalStyles";

import ClubView from "./pages/ClubView";
import CreateClub from "./pages/CreateClub";



const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<ScrollToTop>
				<Routes>
					<Route exact path="/" element={<Home/>} />
					<Route exact path="/clubs" element={<Club/>} />
					<Route exact path="/myPage" element={<MyPage/>} />
					<Route exact path="/clubs/:id" element={<ClubView/>} />
					<Route exact path="/clubs/create" element={<CreateClub/>} />

				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default App;
