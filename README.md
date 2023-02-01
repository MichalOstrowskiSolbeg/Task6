
# Task 6 - "Personal finance app"

Web application "Personal finance app". 

Main tools and frameworks used in application: MS SQL Server, .NET Core Web API, Entity Framework, HTML, CSS, Tailwind, React.js, Axios





## Features

- 

## Documentation

Project contains of 4 layers (Repository, Service, API, UI). 
Each layer is a different project. 

Project uses EF to connect to MsSql database. 
Models in RepositoryLayer were created by scaffolding DbContext. 

Validation was made with FluentValidation library which could help me separate request objects from validation.

I used Automapper to map DTOs.

Users' passwords stored in database are hashed using Pbkdf2 HMACSHA_512 algorithm with 20000 iterations. 
To decrease chance of passwords getting broken I added random string "salt" which is hashed together with password. 

Authorization implemented with JWT Bearer Token. 
Some endpoint (for example '/Shopping/Purchase') require Bearer Token in request.

I installed Axios library in UI layer to fetch data from backend. 
It helped me reduce code and increased readability.

I created ApiControllerBase class which is inherited by all controllers in API layer. 
ApiControllerBase class has methods which check data stored in JWT: role, user ID. 
It allows me to process requested data for user without sending additional data.



## How to run (in Visual Studio)

- write 'cd ui' in Powershell terminal
- write 'npm install' (when running for the first time) 
- write 'npm start' to run React application
- run ASP .Net application using IIS Express

![first step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot1.png?raw=true)

![second step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot2.png?raw=true)

![third step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot3.png?raw=true)
## Login credentials

Login credentials for test account: (Username: "as", Password: "as")


## Database

Database is hosted on https://freeasphosting.net/

I added non-clustered index on "username" column, because every login request requires to find user by username value.
Also, I added unique constraint on that column.


![Database](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/Database2.png?raw=true)