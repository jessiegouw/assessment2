# be-assessment-2
![cover](https://github.com/jessiegouw/be-assessment-2/blob/master/cookingsite.png)
A web app made with Node and data in a mysql database.
In this web app people can share their cooking recipes with the community.

## Install
First of all, type in these commands in your terminal to get the project.
```shell
cd be-assessment-2
git clone git@github.com:jessiegouw/be-assessment-2
npm install
```

The next thing you want do is log in to mysql:
>If access is denied, login to your root account. From there on you can change priviliges for users.

```shell
mysql -u [username] -p
# Enter your password
```

…and run the following SQL to set up a database and create a user table:
```shell
CREATE TABLE IF NOT EXISTS User (
  ID INT NOT NULL AUTO_INCREMENT,
  FirstName TEXT CHARACTER SET utf8,
  LastName TEXT CHARACTER SET utf8,
  Username TEXT CHARACTER SET utf8,
  Password TEXT CHARACTER SET utf8,
  Details TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);
```

For the recipes you also need a database, run this SQL to create a recipe table:
```shell
CREATE TABLE IF NOT EXISTS recipe (
  ID INT NOT NULL AUTO_INCREMENT,
  Name TEXT CHARACTER SET utf8,
  Description TEXT CHARACTER SET utf8,
  Ingredients TEXT CHARACTER SET utf8,
  Instructions TEXT CHARACTER SET utf8,
  cover TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);

-- Add some recipes by running these SQLs:
INSERT INTO recipe (Name, Description, Ingredients, Instructions) VALUES (
  'Proteine wrap',
  'This is a little wrap, you could eat it as a post workout meal.',
  'Wholewheat wraps, grilled chicken, cucumber, tomatoes, hummus, red chilli peppers and black beans.',
  'Warm up the wholewheat wraps for 10 seconds and then throw all of the ingredients in it. Enjoy!'
);

INSERT INTO recipe (Name, Description, Ingredients, Instructions) VALUES (
  'Gado Gado',
  'Indonesian comfort meal',
  'Potatoes, bean sprouts, green beans, spinach, tofu, eggs, fried onions, sambal oelek, peanutbutter, bumbu gado gado',
  'Gado Gado means mix mix and is typical Indonesian streetfood. Boil all the vegetables and the egg and put them on a plate. For the sauce you mix all the leftover ingredients together and you are good to go!'
);
```

Almost there, now you need to create a `.env` file with the following info (Replace the values with your own values):

```env
DB_HOST=localhost
DB_USER=myusername
DB_NAME=mydatabase
DB_PASSWORD=mypassword
```

Last step is to start the server:
```shell
npm start
```
## What I used
* [`Express`](https://www.npmjs.com/package/express)
* [`Express-session`](https://www.npmjs.com/package/express-session)
* [`body-parser`](https://www.npmjs.com/package/body-parser)
* [`mysql`](https://www.npmjs.com/package/mysql)
* [`argon2`](https://www.npmjs.com/package/argon2)
* [`multer`](https://www.npmjs.com/package/multer)
* [`helmet`](https://www.npmjs.com/package/helmet)

The reason that I used [`Express`](https://www.npmjs.com/package/express) as a framework is because it has the biggest community. When you are troubleshooting, chances are big that alot of other people have stumbled on the same problem and probably have solutions for it.

The reason that I used [`mysql`](https://www.npmjs.com/package/mysql) as an open source database manager is because I feel comfortable with the way it works. Though, a big con of MySQL is that it's owned by Oracle instead of a community. This worries some developers because the big company who owns MySQL does not accept patches which is not making things easier.

## Checklist
- [x] Sign up
- [ ] Delete account
- [x] Log in/out
- [x] Being logged in/out
- [x] Look on detail page of a recipe
- [ ] Update profile, for example update profile picture or bio
- [x] Being able to post recipes
- [ ] Being able to post recipes on your own profile
- [ ] Being able to react on recipes of other users

## Brief description of npm scripts
* `npm start` -- Starts the server (port:8000)
* `npm run watch` -- Starts the server with Nodemon
* `npm test` -- Runs unit tests
* `npm run sass` -- Open a new tab in terminal and run this command to edit style.scss file
* `npm run lint` -- Runs linter for consistent code

## Database structure
![db_structure](https://github.com/jessiegouw/be-assessment-2/blob/master/dbstructure.png)

## Sources
* [`mysql-server example`](https://github.com/cmda-be/course-17-18/tree/master/examples/mysql-server)
* [`Auth Server`](https://github.com/cmda-be/course-17-18/tree/master/examples/auth-server)
* [`How do Express.js Sessions work?`](https://nodewebapps.com/2017/06/18/how-do-nodejs-sessions-work/)
* [`Google Fonts`](https://fonts.google.com/specimen/Open+Sans?selection.family=Cabin+Sketch|Open+Sans:400,700)
* [`Express Tutorial Part 7: Deploying to production`](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)

### Troubleshooting
* [`MySQL commands`](https://gist.github.com/hofmannsven/9164408)
* [`ERROR 1819 mysql`](https://www.youtube.com/watch?v=XGHZRC94-_M&feature=youtu.be)

## License
[MIT](https://github.com/jessiegouw/package/blob/master/LICENSE) © 2018 [Jessie Gouw](https://github.com/jessiegouw)
