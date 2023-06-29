const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const db = require("../sqlite/sqlite");

const login = (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).send("Missing fields");
	}

	db.get(`SELECT * FROM Users WHERE user = ?`, [username], (err, user) => {
		if (err) {
			throw err;
		}

		if (!user) {
			return res.status(404).send("User not found");
		}

		if (user.password !== password) {
			return res.status(401).send("Invalid credentials");
		}

		const token = jwt.sign({ id: user.id }, secretKey);

		res.status(200).json({ token, username });
	});
};

module.exports = {
	login,
};
