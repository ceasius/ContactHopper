\*Welcome to Contact Hopper - Simple React & .Net Core Project\*\*

---

## Development Tools

This project has been developed using the following tools and may be required to run the application:

    1. Visual Studio 2017
    2. Visual Studio Code
    3. SQL Management Studio
    4. .NET Core 2.1 SDK
    5. NodeJS

---

## Migrating the EF Core Database

The database will be accessed by the Web API. For this implementation Entity Framework Core 2.1.1 Code First Migrations was selected.

    1. Run NuGet restore on the project to download any missing packages
    2. Connection string : ContactHopperDb should point to the desired database according to your server setup
    3. Create the Database using SSMS or equivalent tool
    4. Open up the Nuget Package Manager Console
    	4.1 Ensure that AG.DbEntities is set as the StartUp Project and selected as the Default Project in the PM Console drop down
    	4.2 PM> add-migration {migrationName} - to add any required changes for the database
    	4.3 PM> update-database - if the migration file needs to be applied

---

## Running the Web API

The Web API provides a secure method to access data for this application. It was written using ASP.NET Core 2.1.

    1. Run NuGet restore on the project to download any missing packages
    2. Follow the instructions on Migrating the EF Core Database
        2.1 Alternatively, In Memory database option is available in appsettings.json
    3. Set ContactHopper.API as the StartUp Project and Run

---

## Running the React Web App

The React component provides the front end for the system.

    1. Open the project with visual studio code at location \AG.Web\ClientApp
    2. Ensure the Web API is running in order to supply data
    2. Run the following commands in the console:
    	2.1 npm install - get all missing packages
    	2.2 npm start - will run app
