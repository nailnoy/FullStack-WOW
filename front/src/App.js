import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home";
import Club from "../src/pages/Club";
import MyPage from "./pages/Mypage";
import ScrollToTop from "./components/common/ScrollToTop";
import GlobalStyles from "./GlobalStyles";
import ClubEdit from "./pages/ClubEdit";
import ClubView from "./pages/ClubView";

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<ScrollToTop>
				<Routes>
					<Route exact path="/" element={<Home/>} />
					<Route exact path="/clubs" element={<Club/>} />
					<Route exact path="/myPage" element={<MyPage/>} />
					<Route exact path="/clubs/edit" element={<ClubEdit/>} />
					<Route exact path="/clubpost/:id" element={<ClubView/>} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default App;
