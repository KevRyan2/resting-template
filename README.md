Sleepy API Framework
================

######resting-template

A basic template for RESTful Web Services in many popular web languages. With an AngularJS front-end template.

######Main Functionality

- GET
- POST
- PUT
- DELETE

###### Setup on Mac OSX

NodeJS Setup
-----
1. Open OSX Terminal.
2. Install Homebrew: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. Update Homebrew: `brew update`
4. Install Node: `brew install node`
5. Install Express: `npm install -g express`
6. Install Mongo: `brew install mongodb` and `brew upgrade mongodb`
7. Create Data Directory: `mkdir -p /data/db`
8. Start Mongo Server: `mongod`
9. Clone the Repo: `git clone git://github.com/leorue/resting-template.git`
10. Enter Node API Directory: `cd resting-template/api/node/bin`
11. Start up the server: `node www.js`
12. View in browser at [http://localhost:8000/api/movies/](http://localhost:8000/api/movies/)

Python Setup
-----
* Coming Soon!!


PHP and Angular App Setup
-----
1. Download and Run MAMP or MAMP Pro.
2. Set Root Directory to the `resting-template` Directory: Hosts > General > Document Root > Set to `resting-template`
3. Set Index permissions: Hosts > Extended > Check: `Indexes` and Check: `SymLinksIfOwnerMatch`
5. Create SQL Database: [Load PHPmyAdmin](http://localhost:8888/phpmyadmin/) > New > Enter: data > create > SQL Tab > Copy/Paste Cellar.sql > Go
6. Create New User: Home > Users > Add User > `Username: data, Host: localhost, Password: jh43it87` > Global Privilages > Check All > Go
4. View in browser at [http://localhost:8888/api/php/wines/:id](http://localhost:8888/api/php/wines/1)


If you have any questions or requests, email us at [schultz.leo@gmail.com](mailto:schultz.leo@gmail.com) and we'll keep updating this to make it perfect.