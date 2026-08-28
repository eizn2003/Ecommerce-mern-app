import { NavLink } from "react-router-dom";
import { assets, footerLinks } from "../assets/assets";

export const Footer = () => {
	return (
		<div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-linear-to-bl from-white to-primary/30 mt-10">
			<div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
				<div>
					<NavLink to="/" className="flex flex-row gap-2 items-center">
						<img src={assets.favicon} alt="Logo" className="h-9" />
						<span className="text-green-500 font-bold text-xl">
							trendora<span className="text-red-500">.</span>
						</span>
					</NavLink>
					<p className="max-w-[410px] mt-6">
						We believe fashion should be accessible, expressive, and enjoyable.
						Explore our collection of carefully selected styles, designed to
						help you look and feel your best wherever you go.
					</p>
				</div>
				<div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
					{footerLinks.map((section, index) => (
						<div key={index}>
							<h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
								{section.title}
							</h3>
							<ul className="text-sm space-y-1">
								{section.links.map((link, i) => (
									<li key={i}>
										<a href={link.url} className="hover:underline transition">
											{link.text}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<p className="py-4 text-center text-sm md:text-base text-gray-500/80">
				Copyright {new Date().getFullYear()} © Trendora All Right Reserved.
			</p>
		</div>
	);
};
