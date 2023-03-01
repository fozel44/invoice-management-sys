# Invoice Management System

   This application is the public beta version of a project made to monitor the monthly invoicing processes of the managers and employees using the application via a     web interface.
 
   The administrator using the application can register new employees or users with different roles and authorizations to the system after logging in to her/his account.
   
   Employees, upload the document and details of the invoice they have issued to the system at the turn of the month.
   
   In this month, the manager issues an invoice to the company hired for that employee and enters the system in the same way.
   
   The system includes invoices as well as time sheets and allows SLA reporting.
 
## While Starting

The steps you need to follow to run the application on your local computer are listed below.

### Prerequisites

Before installing the application, make the following installations.

```
Java 11
Angular 10+
npm 6+
OpenJDK 14+
MariaDB
```

### installation

Make sure you installed the prerequisites for the installation to complete and the application to run on your computer.

The steps required for installation are listed below.

After getting the project files with git clone, run the following command in the frontend>invcms folder in the terminal.

```
npm install
```

Then run the interface with the following command.

```
ng serve --open
```

At this stage, after the frontend of the project is running, run the following command in the backend folder
 
```
mvn clean install
```

Then get the name and path of the jar file from the target folder created in the backend source codes.

Run the following command in the relevant directory on the terminal.

```
javac -jar filename.jar
```

By default the backend is on localhost:8080 port

The frontend should also be running on the localhost:4200 port.

You can use the application by accessing it from your browser using the following path.

```
http://localhost:4200
```

Default admin login

```
id: 	test@test.com
şifre:  test
```

## Built With

* [Maven](https://maven.apache.org/) - Dependency Management


