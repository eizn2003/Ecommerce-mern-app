import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UseAppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";

export const NavBar = () => {
	const [open, setOpen] = useState(false);
	const {
		user,
		setUser,
		setShowUserLogin,
		navigate,
		setSearchQuery,
		searchQuery,
		getCartCount,
		axios,
	} = UseAppContext();

	const logout = async () => {
		try {
			const { data } = await axios.get("/api/users/logout");
			if (data.success) {
				toast.success(data.message);
				setUser(null);
				navigate("/");
			}else{
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message);
		}

	};

	useEffect(() => {
		if (searchQuery.length) {
			navigate("/products");
		}
	}, [searchQuery]);

	return (
		<nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-linear-to-br from-red-100 to-white relative transition-all">
			<NavLink
				to="/"
				onClick={() => setOpen(false)}
				className="flex flex-row gap-2 items-center"
			>
				<img src={assets.favicon} alt="Logo" className="h-9" />
				<span className="text-green-500 font-bold text-xl">
					trendora<span className="text-red-500">.</span>
				</span>
			</NavLink>

			{/* Desktop Menu */}
			<div className="hidden sm:flex items-center gap-8">
				<NavLink to="/" className="cursor-pointer">
					Home
				</NavLink>
				<NavLink to="/products" className="cursor-pointer">
					All Product
				</NavLink>
				<NavLink to="/" className="cursor-pointer">
					Contact
				</NavLink>

				<div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
					<input
						onChange={(e) => setSearchQuery(e.target.value)}
						className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
						type="text"
						placeholder="Search products"
					/>
					<img
						src={assets.search_icon}
						alt="Search"
						className="w-5 h-5 opacity-80"
					/>
				</div>

				<div
					onClick={() => {
						navigate("cart");
					}}
					className="relative cursor-pointer"
				>
					<img
						src={assets.shopping_cart}
						alt="Cart"
						className="w-6 opacity-80"
					/>
					<button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
						{getCartCount()}
					</button>
				</div>

				{!user ? (
					<button
						onClick={() => setShowUserLogin(true)}
						className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
					>
						Login
					</button>
				) : (
					<div className="relative group">
						<img src={assets.profile_icon} className="w-10" alt="" />
						<ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
							<li
								onClick={() => {
									navigate("my-orders");
								}}
								className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
							>
								My Orders
							</li>
							<li
								onClick={logout}
								className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
							>
								Logout
							</li>
						</ul>
					</div>
				)}
			</div>

			<div className="flex items-center gap-6 sm:hidden">
				<div
					onClick={() => {
						navigate("cart");
					}}
					className="relative cursor-pointer"
				>
					<img
						src={assets.shopping_cart}
						alt="Cart"
						className="w-6 opacity-80"
					/>
					<button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
						{getCartCount()}
					</button>
				</div>
				<button
					onClick={() => (open ? setOpen(false) : setOpen(true))}
					aria-label="Menu"
					className="sm:hidden"
				>
					{/* Menu Icon SVG */}
					<img src={assets.menu_icon} alt="Menu" />
				</button>
			</div>

			{/* Mobile Menu */}
			{open && (
				<div
					className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}
				>
					<NavLink to="/" onClick={() => setOpen(false)}>
						Home
					</NavLink>
					<NavLink to="/products" onClick={() => setOpen(false)}>
						All Product
					</NavLink>
					{user && (
						<NavLink to="/" onClick={() => setOpen(false)}>
							My Orders
						</NavLink>
					)}
					<NavLink to="/" onClick={() => setOpen(false)}>
						Contact
					</NavLink>
					{!user ? (
						<button
							onClick={() => {
								setOpen(false);
								setShowUserLogin(true);
							}}
							className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
						>
							Login
						</button>
					) : (
						<button
							onClick={logout}
							className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
						>
							Logout
						</button>
					)}
				</div>
			)}
		</nav>
	);
};
