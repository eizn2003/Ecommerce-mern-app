import { useEffect, useRef, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import { ProductCard } from "./ProductCard";

export const BestSeller = () => {
	const { products } = UseAppContext();
	const sliderRef = useRef(null);
	const [isPaused,setIsPaused] = useState(false)

	useEffect(() => {
		if (isPaused) return;

		const slider = sliderRef.current;

		if (!slider) return;

		const interval = setInterval(() => {
			const nextSlide = slider.scrollLeft + slider.clientWidth;

			if (nextSlide >= slider.scrollWidth - slider.clientWidth) {
				slider.scrollTo({
					left: 0,
					behavior: "smooth",
				});
			} else {
				slider.scrollTo({
					left: nextSlide,
					behavior: "smooth",
				});
			}
		}, 4000);

		return () => clearInterval(interval);
	}, [isPaused]);

	return (
		<div className="mt-6">
			<p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

			{/* Mobile slider */}
			<div
				ref={sliderRef}
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				onFocus={() => setIsPaused(true)}
				onBlur={() => setIsPaused(false)}
				className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-3 mt-6 scrollbar-hide"
			>
				{products
					.filter((product) => product.inStock)
					.slice(0, 5)
					.map((product, index) => (
						<div key={index} className="min-w-full snap-center">
							<ProductCard product={product} />
						</div>
					))}
			</div>

			{/* Desktop grid */}
			<div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 gap-3 md:gap-6">
				{products
					.filter((product) => product.inStock)
					.slice(0, 5)
					.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
			</div>
		</div>
	);
};
