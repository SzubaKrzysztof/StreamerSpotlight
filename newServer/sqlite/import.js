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
				"CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, platform TEXT, votes INTEGER)",
				(err) => {
					if (err) {
						console.log("Error creating table");
					}
				}
			);

			const stmt = db.prepare(
				"INSERT INTO users (name, description, platform, votes) VALUES (?, ?, ?, ?)"
			);

			jsonData.users.forEach((user) => {
				stmt.run(user.name, user.description, user.platform, user.votes);
			});

			stmt.finalize();
		});

		db.close((err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log("Close the database connection.");
		});
	}
});
