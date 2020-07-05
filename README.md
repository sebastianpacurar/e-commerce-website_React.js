## My personal example of an E-Commerce website using React.js, Express.js and MongDB



# Setup:
1) **In order to make the project run, you need to have node.js, and MongoDB installed**

    * Windows users:
        * Node.js - please download from [here](https://nodejs.org/en/download/), and perform the installation
        * MongoDB - please follow these [instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition). You can also download directly through a microsoft installer (.msi) from [here](https://www.mongodb.com/try/download/community?tck=docs_server).
             
    * Linux users:
        * Node.js - please follow these [instructions](https://nodejs.org/en/download/package-manager/)
        * MongoDB - please follow these [instructions](https://docs.mongodb.com/manual/administration/install-on-linux/)
        
    * MacOS users:
        * Node.js - please download from [here](https://nodejs.org/en/download/), and perform the installation
        * MongoDB - please follow these [instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)  
<br />

2) **Setup MongoDB:**
    * Before starting MongoDB, make sure the service is started:
        * Windows:
            * To install mongodb Windows service, use the following command in Command Prompt as Administrator:
                * ```C:MongoDB\bin\mongod.exe” — config “C:\MongoDB\mongod.cfg” — install```
                
            * To start the service: ```net start MongoDB```
            * To stop the service: ```net stop MongoDB```
            
        * Linux:
            * To start the service: ```systemctl start mongod``` or ```service mongod start```
                * If the service does not start, please run the following commands, and try to start the service again
                ```
                    sudo chown -R mongodb:mongodb /var/lib/mongodb
                    sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
                ```
            * To stop the service: ```systemctl stop mongod``` or ```service mongod stop```
            
        * MacOS
            * Follow these [instructions](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
        
    * In order to be able to work with the DB, it needs to be stored in mongoDB. execute the following command in your terminal/console/cmd_prompt:
        * ```mongorestore <path_to_repo>/e-commerce-website_React.js/mongoDB/products.bson```
        
    * Check if the db is present in MongoDB. ```mongo``` command is to start mongo shell:
        ```
            mongo
            show databases
      
            output should contain this line:
            ecomWebsiteDB  0.000GB
        ```
      <br />

3) **Install node modules for back-end and front-end**:    
    * Change directory to **<path_to_repo>/e-commerce-website_React.js/back-end** and run ```npm install``` in the console/terminal/cmd_prompt. This will install the back-end part of the project - Express.js
        
    * Change directory to **<path_to_repo>/e-commerce-website_React.js/front-end** and run ```npm install``` in the console/terminal/cmd_prompt. This will install the front-end part of the project - React.js



# How to run 

* Open two terminals, one for back-end and one for front-end. ***It is important to run the command for back-end first!***
    * Back-end - change directory to <location of repo/e-commerce-website_React.js/back-end, and run the following command:
    ```node app.js```
        * Success if the following lines are printed:
        ```
           Listening on port 3001
           Connected to DB successfully
        ```
    
    * Front-end - change directory to <location of repo/e-commerce-website_React.js/front-end, and run the following command:
    ```npm start```
        * It will open a new browser window with the ```http://localhost:3000/``` URL. if this does not happen, please access it by yourself.



# Side notes

* The project currently runs only on Mobile View, which means the UI for desktop is still under construction, therefore for a better experience, please reduce the width of the browser in between 500 - 750 px



# Creator
* [Sebastian Pacurar](https://github.com/sebastianpacurar)
