# Project-management-system

## BackEnd

### Set up the database: <br>
1. Clone the repository
2. Open Postgres CLI from repo's root directory
3. Create a new database
  ```sql
  CREATE DATABASE project_management
  ```
4. Connect to the database
  ```
  \c project_management
  ```
5. Run the setup.sql file in the home directory
  ```
  \i setup.sql
  ```
  
### Set up the backend:<br>
1. Goto backend folder
2. Install all the dependencies
    ```
    npm install
    ```
3. Set up the .env.development file (The default structure is given in .env.example) 
4. Run the node app
    ```
    npm start
    ```
    
  ## FrontEnd
 1. Goto fronend folder
 2. Install all the dependencies
    ```
    npm install
    ```
3. Replace the api end point in config file ( /src/config.js ) to whatever endpoint you are running from backend
   ``` javascript
    export const API_URL = 'http://localhost:3001/api'; // Default
   ```
 4. Start the react app
     ```
    npm start
    ```
   
