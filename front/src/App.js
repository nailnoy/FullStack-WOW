import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home";
import Clubs from "../src/pages/Clubs";
import Reviews from "./pages/Reviews";
import MyPage from "./pages/Mypage";
import ScrollToTop from "./components/common/ScrollToTop";
import GlobalStyles from "./GlobalStyles";

import ClubDetail from "./pages/ClubDetail";
import CreateClub from "./pages/CreateClub";
import UpdateClub from "./pages/UpdateClub";


const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<ScrollToTop>
				<Routes>
					<Route exact path="/" element={<Home/>} />
					<Route exact path="/clubs" element={<Clubs />} />
					<Route exact path="/reviews" element={<Reviews/>} />
					<Route exact path="/myPage" element={<MyPage/>} />
					<Route exact path="/detail/:id" element={<ClubDetail/>} />
					<Route exact path="/clubs/create" element={<CreateClub/>} />
					<Route exact path="/clubs/update/:id" element={<UpdateClub/>} />

				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default App;
