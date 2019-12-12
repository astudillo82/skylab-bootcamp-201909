# Rock API (Rock-Blog)

# URL

# Endpoints

https://skylabcoders.herokuapp.com/api/

# Register

* path: /users

* Method : POST

* Headers: 

        Content-Type : application/json; charset=utf-8

* body :

        {	
            name: string,
            surname": string,
            email: string,
            username": string,
            password": string
        }

* returns : 
    
        // Success

        {
            message: string
        }


        // Failure

        {
            error: string
        }

* example : 

        //body:

        {	
            "name": "pepe",
            "surname": "grillo",
            "email":"d@d.com",
            "username": "pepe",
            "password": "123"
        }


        //response:

        {
            "message": "User correctly registered"
        }


      // on trying to repeat the same register: 

        {
            "error": "This user already exists"
        }


# Authenticate

* path /auth

* Method : POST

* Headers : 

        Content-Type : application/json;    charset=utf-8


* body :

        { 
            username: string, 
            password: string
        }

* Returns :

        //succed

        {
            message: string,
            id: string,
            token: string
        }

        //Failure 
        //NOT YET, POSTMAN PROBLEMS...HELPP!!!!! 

    

* Example:

    
        // body

        {	
            "username": "castud",
            "password" : "123"
        }
                

        //response
        
        { 
            "message": "user correctly authenticated",
            "id": "5df0e4459206cd1f84498648",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGYwZTQ0NTkyMDZjZDFmODQ0OTg2NDgiLCJpYXQiOjE1NzYwNzQzNzEsImV4cCI6MTU3NjE2MDc3MX0.yNBl2n-HyuwBMfS2H84bAOhNOzeQmadF77t6V4hdCsw"
        }

        // on trying to login with wrong username
        //NOT YET, POSTMAN PROBLEMS!...HELP!!!
        

# Retrieve User

# Delete User