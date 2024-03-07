const handleNotFound = (req, res, next) => {
	console.error(err);
	res.status(404).json({ status: 404, message: 'not found' });
};

export default handleNotFound;
