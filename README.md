# Project-management-system

<h3>BackEnd</h3>

Set up the database: <br>
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
  Set up the backend:
  
  1.Install all the dependencies
    ```
    npm install
    ```
  2. Set up the .env.development file (The default structure is given in .env.example) 
  3. Run the node app
    ```
    npm start
    ```
   
