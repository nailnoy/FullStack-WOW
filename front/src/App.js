import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home";
import Club from "../src/pages/Club";
import MyPage from "./pages/Mypage";
import ScrollToTop from "./components/common/ScrollToTop";
import GlobalStyles from "./GlobalStyles";
import CreateClub from "./pages/CreateClub";
import ClubPostView from "./pages/ClubPostView";

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<ScrollToTop>
				<Routes>
					<Route exact path="/" element={<Home/>} />
					<Route exact path="/clubs" element={<Club/>} />
					<Route exact path="/myPage" element={<MyPage/>} />
					<Route exact path="/clubs/create" element={<CreateClub/>} />
					<Route exact path="/clubs/detail" element={<ClubPostView/>} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default App;
