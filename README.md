## My personal example of an E-Commerce website using React.js, Express.js and MongDB



# Setup:
1) **In order to make the project run, you need to have node.js, and MongoDB installed**

    * Windows users:
        * Node.js - please download from [here](https://nodejs.org/en/download/), and perform the installation
        * MongoDB - please follow these [instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition). You can also download directly through a microsoft installer (.msi) from [here](https://www.mongodb.com/try/download/community?tck=docs_server).
             
    * Linux users:
        * Node.js - please follow these [instructions](https://nodejs.org/en/download/package-manager/)
        * MongoDB - please follow these [instructions](https://docs.mongodb.com/manual/administration/install-on-linux/)
        
    * macOS users:
        * Node.js - please download from [here](https://nodejs.org/en/download/), and perform the installation
        * MongoDB - please follow these [instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)  
<br />

2) **Setup MongoDB:**
    * before starting MongoDB, make sure the service is started:
        * Windows:
            * To install mongodb Windows service, use the following command in Command Prompt as Administrator:
                * ```C:MongoDB\bin\mongod.exe” — config “C:\MongoDB\mongod.cfg” — install```
                
            * To start the service: ```net start MongoDB```
            * To stop the service: ```net stop MongoDB```
            
        * Linux and macOS:
            * To start the service: ```systemctl start mongod``` or ```service mongod start```
            * To stop the service: ```systemctl stop mongod``` or ```service mongod stop```
            * To heck if it is running: ```systemctl status mongod``` or ```service mongod status ```
        
    * in order to be able to work with the DB, it needs to be stored in mongoDB. execute the following command in your terminal/console/cmd_prompt:
        * ```mongorestore <path_to_repo>/e-commerce-website_React.js/mongoDB/products.bson```
        
    * check if the db is present in MongoDB:
        ```
            mongo
            show databases
      
            output should contain this line:
            ecomWebsiteDB  0.000GB
        ```
      <br />

3) **Install node modules for backend and frontend**:    
    * Change directory to **<location_of_repo>/e-commerce-website_React.js/backend** and run ```npm install``` in the console/terminal/cmd_prompt. This will install the backend part of the project - Express.js
        
    * Change directory to **<location_of_repo>/e-commerce-website_React.js/frontend** and run ```npm install``` in the console/terminal/cmd_prompt. This will install the frontend part of the project - React.js



# How to run 

* Open two terminals, one for backend and one for frontend. ***It is important to run the command for backend first!***
    * Backend - change directory to <location of repo/e-commerce-website_React.js/backend, and run the following command:
    ```node app.js```
        * success if the following lines are printed:
        ```
           Listening on port 3001
           Connected to DB successfully
        ```
    
    * Frontend - change directory to <location of repo/e-commerce-website_React.js/frontend, and run the following command:
    ```npm start```
        * it will open a new browser window with the ```http://localhost:3000/``` URL. if this does not happen, please access it by yourself.



# Side notes

* The project currently runs only on Mobile View, which means the UI for desktop is still under construction, therefore for a better experience, please reduce the width of the browser in between 500 - 750 px



# Creator
* [Sebastian Pacurar](https://github.com/sebastianpacurar)
