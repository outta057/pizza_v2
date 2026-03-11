import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./scss/app.scss";

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza"));

const MainLayout = React.lazy(() => import(/* webpackChunkName: "MainLayout" */ "./layouts/MainLayout"));

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<React.Suspense fallback={<div>Идет загрузка...</div>}>
						<MainLayout />
					</React.Suspense>
				}
			>
				<Route path="" element={<Home />} />
				<Route
					path="/cart"
					element={
						<React.Suspense fallback={<div>Идет загрузка корзины...</div>}>
							<Cart />
						</React.Suspense>
					}
				/>
				<Route
					path="/pizza/:id"
					element={
						<React.Suspense
							fallback={<div>Идет загрузка страницы пиццы...</div>}
						>
							<FullPizza />
						</React.Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<React.Suspense fallback={<div>Идет загрузка страницы...</div>}>
							<NotFound />
						</React.Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
