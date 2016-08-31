# drakescrowd

App is running on https://drakescrowd.herokuapp.com

##prereq: 
  - make sure postgres is installed.
  - make sure node is installed.
  - running commands such as babel-node may require additional setups (just follow what the terminal tells you to do).

##instructions:
1. clone and cd into this repo
    ```
    $ git clone https://github.com/yochess/drakescrowd.git && cd drakescrowd
    ```
    
2. install node dependencies
    ```
    $ npm install
    ```
    
3. create a postgres database named drakescrowd  
   (ps. you can swap out postgres db for mySQL db or any other supported SQL db in the dbconfig file)
    ```
    $ psql
    # CREATE DATABASE drakescrowd;
    # \q
    ```
    
3. OPTIONAL: populate the db with sample data
    ```
    $ babel-node sampledata.js
    ```

4. start the server
    ```
    $ babel-node ./src/app.js
    ```
    or (with nodemon)
    ```
    $ nodemon ./src/app.js --exec babel-node --presets es2015
    ```

##Deployment
1. run the gulp build
    ```
    $ gulp build
    ```
    
2. make sure the production version works
    ```
    $ env build=production node ./dist/app.js
    ```

3. goto www.heroku.com, login (or signup), click create a new project, and follow their instructions  
    (note: a Procfile is not necessary for our app)
4. setup a db in heroku postgres (some research may be necessary)
5. under settings, save the following env variables:
    ADDRESS="your_link"
    build=production
    DATABASE_URL="your_db_link"

##Current Issues
- uploads storage needs to be permenant. Everytime the current app is pushed to heroku, the uploads folder in the dist folder is ignored. Consider using an online storage or a separate link to host images.
- 
