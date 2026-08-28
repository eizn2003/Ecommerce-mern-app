import { assets, features } from "../assets/assets"
import { useEffect, useRef } from "react";

export const BottomBanner = () => {

    const sliderRef = useRef(null);

		useEffect(() => {
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
		}, []);
        
    return (
			<div className="relative mt-20 mb-2">
				{/* Desktop banner */}
				<img
					src={assets.bottom_banner_image}
					alt="Banner"
					className="w-full hidden md:block rounded-md"
				/>

				{/* Mobile banner */}
				<img
					src={assets.bottom_banner_image_sm}
					alt="Banner"
					className="w-full md:hidden rounded-md"
				/>

				{/* Content */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pt-16 md:pt-0 md:px-10">
					<div className="w-full px-4 md:px-0">
						<h1 className="text-center text-2xl md:text-3xl font-semibold text-red-200">
							Why We Are the Best?
						</h1>

						{/* Desktop */}
						<div className="hidden md:grid grid-cols-3 mt-6 gap-6">
							{features.map((feature, index) => (
								<div
									key={index}
									className="flex flex-col items-center gap-4 mt-2 rounded-md p-6 bg-linear-to-br from-white/10 to-black/20"
								>
									<img
										src={feature.icon}
										alt={feature.title}
										className="w-11"
									/>

									<h3 className="text-xl font-semibold text-yellow-500">
										{feature.title}
									</h3>

									<p className="text-red-300 text-sm text-center">
										{feature.description}
									</p>
								</div>
							))}
						</div>

						{/* Mobile slider */}
						<div className="md:hidden mt-6">
							<div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide [&::-webkit-scrollbar]:hidden" ref={sliderRef}>
								{features.map((feature, index) => (
									<div
										key={index}
										className="min-w-full snap-center flex flex-col items-center gap-4 rounded-md p-6 bg-linear-to-br from-white/10 to-black/20"
									>
										<img
											src={feature.icon}
											alt={feature.title}
											className="w-9"
										/>

										<h3 className="text-lg font-semibold text-yellow-500">
											{feature.title}
										</h3>

										<p className="text-red-300 text-xs text-center">
											{feature.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}