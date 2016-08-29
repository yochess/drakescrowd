# drakescrowd

prereq: 
  - make sure mysql is installed and running.
  - make sure node is installed.

1. clone this repo
2. cd into the repo
3. run $ npm install
4. set environments as follows:
  - SQL_USER = your mysql account (by default the name will be 'root')
  - SQL_PW = your mysql pw (by default the password will be '')
  - SQL_DB = your mysql database (by default the name will be 'drakescrowd')
5. create the database in mysql
6. run $ npm start

If you like to populate table with sample data, run $ babel-node sampledata.js

The data has 2 investors and 2 companies:
  - investor:
    - username: drake, password: drake
    - username: john, password: john
  - company
    - username: abc, password: abc,
    - username: xyz, password: xyz
