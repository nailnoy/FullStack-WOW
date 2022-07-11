import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
				<Routes>
					<Route exact path="/" />
					<Route exact path="/board" />
					<Route exact path="/detail/:id"  />
					<Route exact path="/myPage"  />
				</Routes>
		</BrowserRouter>
	);
};

export default App;
