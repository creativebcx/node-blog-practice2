exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      "mongodb://test:test@ds135592.mlab.com:35592/seedtest";
exports.PORT = process.env.PORT || 8080;


// blog db
// mLab db to Heroku command
// mongodb://test:test@ds135592.mlab.com:35592/blogpostdb

// local computer to mLab upload command
// mongoimport --db blogpostdb --collection blogposts --drop --file ~/Downloads/seed-data.json --host ds135592.mlab.com --port 35592  -u test -p test

//seedtest db
// mLab
// mongoimport --db seedtest --collection blogposts --drop --file ~/Downloads/seed-data.json --host ds135592.mlab.com --port 35592  -u test -p test
// Heroku
// mongodb://test:test@ds135592.mlab.com:35592/seedtest