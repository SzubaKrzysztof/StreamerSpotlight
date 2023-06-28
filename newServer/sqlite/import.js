const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

fs.readFile("data.json", "utf8", (err, data) => {
	if (err) {
		console.error(`Error reading file from disk: ${err}`);
	} else {
		const jsonData = JSON.parse(data);

		let db = new sqlite3.Database("./mydb.sqlite3", (err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log("Connected to the SQlite database.");
		});

		db.serialize(() => {
			db.run(
				`CREATE TABLE IF NOT EXISTS Streamers (
                id INTEGER PRIMARY KEY,
                name TEXT,
                description TEXT,
                platform TEXT,
                votes INTEGER
                )`,
				(err) => {
					if (err) {
						console.log("Error creating Streamers table");
					}
				}
			);

			db.run(
				`CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY,
                username TEXT,
                password TEXT
                )`,
				(err) => {
					if (err) {
						console.log("Error creating Users table");
					}
				}
			);

			db.run(
				`CREATE TABLE IF NOT EXISTS UserVotes (
                id INTEGER PRIMARY KEY,
                user_id INTEGER,
                streamer_id INTEGER,
                UNIQUE(user_id, streamer_id),
                FOREIGN KEY(user_id) REFERENCES Users(id),
                FOREIGN KEY(streamer_id) REFERENCES Streamers(id)
                )`,
				(err) => {
					if (err) {
						console.log("Error creating UserVotes table");
					}
				}
			);

			const stmtStreamers = db.prepare(
				"INSERT INTO Streamers (id, name, description, platform, votes) VALUES (?, ?, ?, ?, ?)"
			);

			jsonData.streamers.forEach((streamer) => {
				stmtStreamers.run(
					streamer.id,
					streamer.name,
					streamer.description,
					streamer.platform,
					streamer.votes
				);
			});

			stmtStreamers.finalize();

			const stmtUsers = db.prepare(
				"INSERT INTO Users (id, username, password) VALUES (?, ?, ?)"
			);

			jsonData.users.forEach((user) => {
				stmtUsers.run(user.id, user.username, user.password);
			});

			stmtUsers.finalize();

			const stmtUserVotes = db.prepare(
				"INSERT INTO UserVotes (id, user_id, streamer_id) VALUES (?, ?, ?)"
			);

			stmtUserVotes.run(
				jsonData.UserVotes.id,
				jsonData.UserVotes.user_id,
				jsonData.UserVotes.streamer_id
			);

			stmtUserVotes.finalize();
		});

		db.close((err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log("Close the database connection.");
		});
	}
});
