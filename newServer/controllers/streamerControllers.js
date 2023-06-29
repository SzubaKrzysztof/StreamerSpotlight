const db = require("../sqlite/sqlite");
const logger = require("../middleware/logger");

const getAllStreamers = (req, res) => {
	try {
		const { user } = req;
		let query = "SELECT * FROM Streamers";
		let params = [];

		if (user) {
			query = `
				SELECT Streamers.*, 
					CASE WHEN UserVotes.id IS NULL THEN 0 ELSE 1 END AS userHasVoted
				FROM Streamers
				LEFT JOIN UserVotes 
				ON Streamers.id = UserVotes.streamer_id 
				AND UserVotes.user_id = ?
			`;
			params = [user.id];
		}

		db.all(query, params, (err, rows) => {
			if (err) {
				throw err;
			}
			if (rows.length > 0) {
				res.status(200).json(rows);
			} else {
				res.status(404).send("Streamers not found");
			}
		});
	} catch (error) {
		logger.error("Error fetching data:", error);
		res.status(500).send("Error fetching data");
	}
};

const getStreamerById = (req, res) => {
	const userId = req.user?.id;
	try {
		db.get(
			`SELECT * FROM streamers WHERE id = ?`,
			[req.params.id],
			(err, streamer) => {
				if (err) {
					throw err;
				}
				if (streamer) {
					if (userId) {
						db.get(
							`SELECT * FROM UserVotes WHERE user_id = ? AND streamer_id = ?`,
							[userId, streamer.id],
							(err, vote) => {
								if (err) {
									throw err;
								}
								streamer.hasVoted = Boolean(vote);
								res.status(200).json(streamer);
							}
						);
					} else {
						streamer.hasVoted = false;
						res.status(200).json(streamer);
					}
				} else {
					res.status(404).send("Streamer not found");
				}
			}
		);
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

	const newStreamer = [name, description, platform, votes];

	db.run(
		`INSERT INTO streamers(name, description, platform, votes) VALUES(?, ?, ?, ?)`,
		newStreamer,
		function (err) {
			if (err) {
				return console.log(err.message);
			}
			res.status(201).json({
				streamer: {
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
	const newStreamer = req.body;
	db.get(`SELECT * FROM streamers WHERE id = ?`, [id], (err, row) => {
		if (err) {
			throw err;
		}
		if (row) {
			db.run(
				`UPDATE streamers SET name = ?, description = ?, platform = ?, votes = ? WHERE id = ?`,
				[
					newStreamer.name,
					newStreamer.description,
					newStreamer.platform,
					newStreamer.votes,
					id,
				],
				(err) => {
					if (err) {
						return console.error(err.message);
					}
					res.status(200).send("Streamer updated");
				}
			);
		} else {
			res.status(404).send("Streamer not found");
		}
	});
};

const voteStreamer = (req, res) => {
	const { id: streamer_id } = req.params;
	const { id: user_id } = req.user;

	if (!isAuthenticated(req)) {
		res.status(403).send("You must be logged in to vote");
		return;
	}

	db.get(`SELECT * FROM streamers WHERE id = ?`, [streamer_id], (err, row) => {
		if (err) {
			throw err;
		}
		if (row) {
			// Sprawdź, czy użytkownik już głosował na tego streamera
			db.get(
				`SELECT * FROM UserVotes WHERE user_id = ? AND streamer_id = ?`,
				[user_id, streamer_id],
				(err, row) => {
					if (err) {
						throw err;
					}

					if (row) {
						res.status(400).send("You have already voted for this streamer");
					} else {
						db.run(
							`INSERT INTO UserVotes(user_id, streamer_id) VALUES(?, ?)`,
							[user_id, streamer_id],
							(err) => {
								if (err) {
									return console.error(err.message);
								}
								res.status(200).send("User voted");
							}
						);
					}
				}
			);
		} else {
			res.status(404).send("Streamer not found");
		}
	});
};

module.exports = {
	getAllStreamers,
	getStreamerById,
	addStreamer,
	updateStreamer,
	voteStreamer,
};
