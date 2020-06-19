# Team_13
* ZuChao (Aaron) Xiong
* Akshatkumar Patel
* Arash Negari
* QingLian (Alice) Liu

## System Description
We would like to develop a responsive web-application that will allow a non-profit organization to manage volunteers' roles,
schedules, and the activities/classes provided by the organization. This application will also work as a registration platform for
new people to volunteer at the organization.

## Description of Prototype to be delivered in BTS530
We plan to deliver a prototype system (web application) that provides authentication for both admin and volunteer. The system allows the admin to manage each class session and the required roles for each class session. The system also provides admin assign the role to volunteers. The system is capable of generating a weekly schedule automatically, based on the roles needed for the class session and the availability of each volunteer. The system is also capable of recording the hours that volunteers have volunteered.

# BTS530


### Iteration 1 Tasks

#### To Do:
1. ~~Database Design~~
2. ~~Create a Demo of the Login page and the User Profile page~~
3. ~~Pick a scheduling library and explain why~~
#### Complete: 
- Database Design 
- Create a Demo of the Login page and the User Profile page
- Pick a scheduling library and explain why

### Iteration 2 Tasks

#### To Do:
1. ~~Show the Models that you are creating in Mongoose, as well as a few simple methods to perform CRUD operations using it. Write the models in your Iteration2.md~~
2. ~~Show views for User Profile Editing and User Profile View~~
#### Complete:
- Show the Models that you are creating in Mongoose, as well as a few simple methods to perform CRUD operations using it. Write the models in your Iteration2.md
- Show views for User Profile Editing and User Profile View

### Iteration 3 Tasks

#### To Do:
1. ~~Users should be able to sign up and login (full-stack)~~
2. ~~Users can edit their info (user profile). Also, the system should make it clear that there are users with different roles.~~
3. ~~Demonstrate a use case of Angular 6.0+ Calendar, with multiple different views. You should be able to show the calendar (weekly or daily schedule) for one individual (regular user view), or the calendar for multiple individuals (manager role view).~~
4. ~~Database Design including the calendar data.~~
#### Complete:
- Users should be able to sign up and login (full-stack)
- Users can edit their info (user profile). Also, the system should make it clear that there are users with different roles.
- Demonstrate a use case of Angular 6.0+ Calendar, with multiple different views. You should be able to show the calendar (weekly or daily schedule) for one individual (regular user view), or the calendar for multiple individuals (manager role view).
- Database Design including the calendar data.


### Iteration 4 Tasks

#### To Do:
1. ~~Connect database to calendar~~
2. ~~Split the website into two~~
#### Complete:
1. Connect database to calendar
2. Split the website into two


### Full task List:
1. ~~Database Design~~
2. ~~Create a Demo of the Login page and the User Profile page~~
3. ~~Pick a scheduling library and explain why~~
4. ~~Create the CRUD Commands for the database using Mongoose~~
5. ~~Connect User Profile to database through API & allow Editing (Update Profile)~~
6. ~~Create the API~~
7. ~~Allow users to login (Add Passport.js and BCrypt.js)~~
8. Registration Page and allow users to register (Email verification will be done in BTS630)
9. ~~Create the Home Page after Login which shows the schedule (Calendar interface, etc)~~
10. Create Manage roles page
11. Password Change
12. ~~Split the website into two (Start seperating admin features from volunteers) - Allow Admins to see a list of all volunteers~~

# BTS630

### Iteration 1 Tasks
#### To Do:
- ~~Registration: email confirmation~~
   - ~~Generate JWT (JSON Web Token) and send email from server with link~~
   - ~~Create API for confirming token~~
   - ~~Notify user if account hasn't been verified when they login (Perhaps a header above navbar)~~
   - ~~Set up email & Oauth2 token (Send secure emails using Gmail API)~~
   - ~~Adjust database (Send email after saving account to database)~~
   - ~~Create page to notify email has been confirmed or notify if their token has expired~~
   - ~~Create a resend email API~~
- ~~Password change ONLY for logged in users.~~
   - ~~Update existing user information to allow users to change passwords.~~
   - ~~Update backend to allow password reset (WILL ONLY BE ABLE TO BE USED BY LOGGED IN USERS FOR SECURITY REASONS)~~
#### Complete:
- Registration: email confirmation
   - Generate JWT (JSON Web Token) and send email from server with link
   - Create API for confirming token
   - Notify user if account hasn't been verified when they login (Perhaps a header above navbar)
   - Set up email & Oauth2 token (Send secure emails using Gmail API)
   - Adjust database (Send email after saving account to database)
   - Create page to notify email has been confirmed or notify if their token has expired
   - Create a resend email API
- Password change ONLY for logged in users.
   - Update existing user information to allow users to change passwords.
   - Update backend to allow password reset (WILL ONLY BE ABLE TO BE USED BY LOGGED IN USERS FOR SECURITY REASONS)
  
  
### Iteration 2 Tasks
- ~~Improvements in the calendar UI~~
   - ~~Create event using a modal.~~
     - ~~Create an updated form in modal~~
- ~~Password reset and password change~~
   - ~~Create a reset button in login page~~
   - ~~Update API to send emails~~
   - ~~Generate JWT (JSON Web Token) and send email from server with link~~
   - ~~Create a password reset page (users still have to login after)~~
   - ~~Update existing user information to allow users to change passwords.~~
   - ~~Create password reset componenets~~

#### To Do:
#### Complete:

### Iteration 3 Tasks
#### To Do:
3. ~~Filtering~~
   - ~~Allow admins to search for users BASED ON THE UPCOMING EVENTS.~~
   - ~~Filtering algorithm~~
5. ~~Create, Read, Update USERS for admins~~
   - ~~Fullstack (MongoDB, Expressjs, Angular, Node.js)~~
   - ~~Manage user status (Inactive or Active)~~
   - ~~View User Contact Information (ONLY Contact information)~~
   - ~~Create Views for the above functionalities~~
6. ~~User management~~
   - ~~Allow admins to UPDATE roles for users (volunteers, admins, class leader, webmaster)~~
      - ~~Relates to step 5~~
#### Complete:
3. Filtering
   - Allow admins to search for users BASED ON THE UPCOMING EVENTS.
   - Filtering algorithm
5. Create, Read, Update USERS for admins~~
   - Fullstack (MongoDB, Expressjs, Angular, Node.js)
   - Manage user status (Inactive or Active)
   - View User Contact Information (ONLY Contact information)
   - Create Views for the above functionalities
6. User management
   - Allow admins to UPDATE roles for users (volunteers, admins, class leader, webmaster)
      - Relates to step 5
### Iteration 4 Tasks
#### To Do:
7. Auto-scheduling
   - Suggests volunteers that haven't volunteered in a while
8. Upload the project on Heroku
#### Complete:
7. ~~Auto-scheduling~~
   - ~~Suggests volunteers that haven't volunteered in a while~~
8. ~~Upload the project on Heroku~~


### Full task List:
- ~~Registration: email confirmation~~
   - ~~Generate JWT (JSON Web Token) and send email from server with link~~
   - ~~Create API for confirming token~~
   - ~~Notify user if account hasn't been verified when they login (Perhaps a header above navbar)~~
   - ~~Set up email & Oauth2 token (Send secure emails using Gmail API)~~
   - ~~Adjust database (Send email after saving account to database)~~
   - ~~Create page to notify email has been confirmed or notify if their token has expired~~
   - ~~Create a resend email API~~
2. ~~Improvements in the calendar UI~~
   - ~~Create event using a modal.~~
     - ~~Create an updated form in modal~~
3. ~~Filtering~~
   ~~- Allow admins to search for users BASED ON THE UPCOMING EVENTS.~~
   ~~- Filtering algorithm~~
4. ~~Password reset and password change~~
   - ~~Create a reset button in login page~~
   - ~~Update API to send emails~~
   - ~~Generate JWT (JSON Web Token) and send email from server with link~~
   - ~~Create a password reset page (users still have to login after)~~
   - ~~Update existing user information to allow users to change passwords.~~
5. ~~Create, Read, Update USERS for admins~~
   - ~~Fullstack (MongoDB, Expressjs, Angular, Node.js)~~
   - ~~Manage user status (Inactive or Active)~~
   - ~~View User Contact Information (ONLY Contact information)~~
   - ~~Create Views for the above functionalities~~
6. ~~User management~~
   - ~~Allow admins to UPDATE roles for users (volunteers, admins, class leader, webmaster)~~
      - ~~Relates to step 5~~
7. ~~Auto-scheduling~~
   - ~~Suggests volunteers that haven't volunteered in a while~~
8. ~~Upload the project on Heroku~~

