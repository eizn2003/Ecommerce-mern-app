import "./index.css";
import { NavBar } from "./components/NavBar.jsx";
import { Home } from "./pages/Home.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer.jsx";
import { UseAppContext } from "./context/AppContext.jsx";
import { Login } from "./components/Login.jsx";
import { AllProducts } from "./pages/AllProducts.jsx";
import { ProductCategory } from "./pages/ProductCategory.jsx";
import { ProductDetails } from "./pages/ProductDetails.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Address } from "./pages/Address.jsx";
import { MyOrders } from "./pages/MyOrders.jsx";
import { SellerLogin } from "./components/SellerLogin.jsx";
import { SellerLayout } from "./pages/seller/SellerLayout.jsx";
import { AddProduct } from "./pages/seller/AddProduct.jsx";
import { ProductList } from "./pages/seller/ProductList.jsx";
import { Order } from "./pages/seller/Order.jsx";

const App = () => {
	const isSellerPath = useLocation().pathname.includes("seller");
	const { showUserLogin, isSeller } = UseAppContext();
	return (
		<div className="text-default min-h-screen text-gray-700 bg-white">
			{isSellerPath ? null : <NavBar />}
			{showUserLogin ? <Login /> : null}
			<Toaster />
			<div
				className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<AllProducts />} />
					<Route path="/products/:category" element={<ProductCategory />} />
					<Route path="/products/:category/:id" element={<ProductDetails />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/add-address" element={<Address />} />
					<Route path="/my-orders" element={<MyOrders />} />
					<Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
						<Route index element={isSeller ? <AddProduct /> : null} />
						<Route path="product-list" element={<ProductList />} />
						<Route path="orders" element={<Order />} />
					</Route>
				</Routes> 
			</div>
			{!isSellerPath && <Footer />}
		</div>
	);
};

export default App;
