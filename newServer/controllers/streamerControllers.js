const db = require("../sqlite/sqlite");
const logger = require("../middleware/logger");

const getAllStreamers = (req, res) => {
	try {
		db.all("SELECT * FROM users", (err, rows) => {
			if (err) {
				throw err;
			}
			if (rows.length > 0) {
				res.status(200).json(rows);
			} else {
				res.status(404).send("Users not found");
			}
		});
	} catch (error) {
		logger.error("Error fetching data:", error);
		res.status(500).send("Error fetching data");
	}
};

const getStreamerById = (req, res) => {
	try {
		db.get(`SELECT * FROM users WHERE id = ?`, [req.params.id], (err, row) => {
			if (err) {
				throw err;
			}
			if (row) {
				res.status(200).json(row);
			} else {
				res.status(404).send("User not found");
			}
		});
	} catch (error) {
		logger.error("Error fetching data:", error);
		res.status(500).send("Error fetching data");
	}
};

const addStreamer = (req, res) => {
	const { name, description, platform, votes } = req.body;

	if (!name || !description || !platform || !votes) {
		return res.status(400).send("Missing required fields");
	}

	const newUser = [name, description, platform, votes];

	db.run(
		`INSERT INTO users(name, description, platform, votes) VALUES(?, ?, ?, ?)`,
		newUser,
		function (err) {
			if (err) {
				return console.log(err.message);
			}
			res
				.status(201)
				.json({
					user: {
						id: this.lastID,
						name: name,
						description: description,
						platform: platform,
						votes: votes,
					},
				});
		}
	);
};

const updateStreamer = (req, res) => {
	const { id } = req.params;
	const newUser = req.body;
	db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
		if (err) {
			throw err;
		}
		if (row) {
			db.run(
				`UPDATE users SET name = ?, description = ?, platform = ?, votes = ? WHERE id = ?`,
				[
					newUser.name,
					newUser.description,
					newUser.platform,
					newUser.votes,
					id,
				],
				(err) => {
					if (err) {
						return console.error(err.message);
					}
					res.status(200).send("User updated");
				}
			);
		} else {
			res.status(404).send("User not found");
		}
	});
};

const deleteStreamer = (req, res) => {
	const { id } = req.params;
	db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
		if (err) {
			throw err;
		}
		if (row) {
			db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
				if (err) {
					return console.error(err.message);
				}
				res.status(200).send("User deleted");
			});
		} else {
			res.status(404).send("User not found");
		}
	});
};

module.exports = {
	getAllStreamers,
	getStreamerById,
	addStreamer,
	updateStreamer,
	deleteStreamer,
};
