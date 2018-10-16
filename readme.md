# Node-Express based Github Code Search App


Installation guide:
  1. after cloning, go to app/config/auth.js and replace the facebook and google credentials with yours.
  2. go to app/config/config.json and replace the database name, url, host, username and password with yours.
  
  - install node 6 in your system.
  - navigate to root directory and run npm install .
  - After installing node modules, run npm start.
  - open http://localhost:5000 and first sighnup and sign in.
  - 
  # Usage
- After Login, three section will be there
   1.Code Search
   2.Repository Search
   3.User Search
  
1. Code Search
   In code search, enter a particular keyword(optional) and select language and search. it will display the keyword related repository/file link and the line number at which the keyword matched.
2. Repository Search
   In repository search, enter any language/technology and enter search, it will display list of repository URLs and their owners.
3. User search
   In user search, Enter the name of user and press enter.
