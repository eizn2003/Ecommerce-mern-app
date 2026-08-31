export const errorHandler = (err, req, res, next) => {
	console.log(err);
	const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
	res.status(statusCode).json({
		success: false,
		message: "Internal server error",
	});
};
