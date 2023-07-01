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
	const { name, description, platform } = req.body;
	if (!name || !description || !platform) {
		return res.status(400).send("Missing required fields");
	}

	const newStreamer = [name, description, platform];

	db.run(
		`INSERT INTO streamers(name, description, platform, votes) VALUES(?, ?, ?, 0)`,
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
					votes: 0,
				},
			});
		}
	);
};

const updateStreamerVotes = (streamerId) => {
	console.log("Updating streamer votes" + streamerId);
	debugger;
	db.get(
		`SELECT SUM(case when voteType = 'upVote' then 1 else 0 end) as upVotes,
         SUM(case when voteType = 'downVote' then 1 else 0 end) as downVotes
         FROM UserVotes WHERE streamer_id = ?`,
		[streamerId],
		(err, row) => {
			if (err) {
				return console.log(err.message);
			}
			const votes = row.upVotes - row.downVotes;
			db.run(
				`UPDATE Streamers SET votes = ? WHERE id = ?`,
				[votes, streamerId],
				function (err) {
					if (err) {
						return console.log(err.message);
					}
				}
			);
		}
	);
};

const voteStreamer = (req, res) => {
	console.log("Request body:", req.body);
	console.log("User from req:", req.user);
	console.log("Request params:", req.params);
	debugger;
	const { id: streamer_id } = req.params;
	const { id: user_id } = req.user;
	const { voteType } = req.body;

	if (!req.user) {
		res.status(403).send("You must be logged in to vote");
		return;
	}

	if (voteType !== "upVote" && voteType !== "downVote") {
		res.status(400).send("Invalid vote type");
		return;
	}

	db.get(`SELECT * FROM Streamers WHERE id = ?`, [streamer_id], (err, row) => {
		if (err) {
			console.error("Error when fetching streamer:", err);
			throw err;
		}
		if (row) {
			db.get(
				`SELECT * FROM UserVotes WHERE user_id = ? AND streamer_id = ?`,
				[user_id, streamer_id],
				(err, row) => {
					if (err) {
						console.error("Error when fetching vote:", err);
						throw err;
					}

					if (row) {
						res.status(400).send("You have already voted for this streamer");
					} else {
						db.run(
							`INSERT INTO UserVotes(user_id, streamer_id, voteType) VALUES(?, ?, ?)`,
							[user_id, streamer_id, voteType],
							(err) => {
								if (err) {
									console.error("Error when inserting vote:", err);
									return console.error(err.message);
								}
								updateStreamerVotes(streamer_id); // Aktualizacja głosów po dodaniu głosu
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
	voteStreamer,
};
