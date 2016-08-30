# drakescrowd

App is running as a sample on https://drakescrowd.herokuapp.com

prereq: 
  - make sure postgres is installed.
  - make sure node is installed.

<br><br>

1. clone this repo
2. cd into the repo
3. run $ npm install
4. run $ gulp
5. create a "drakescrowd" database in postgres
6. run $ npm start

<br><br>

If you like to populate table with sample data, run $ babel-node sampledata.js

<br><br>

The sample data has 2 investors and 2 companies:
  - investor:
    - username: drake, password: drake
    - username: john, password: john
  - company
    - username: abc, password: abc,
    - username: xyz, password: xyz
