<!-- INTRO SECTION -->
<br />
<p align="center">
  <a href="https://github.com/Jenil-Vekaria/Trackit">
    <img src="client/src/assests/Trackit_Background.png" alt="Trackit">
  </a>

  <h3 align="center">Issue and Project Tracking System</h3>

  <p align="center">
    Use Trackit! Tracking system that allows team members to collaborate, discuss and manage projects effectively 
    <br />
    <br />
  </p>
</p>

<!-- FEATURE SECTION -->

## ✨ Features

- Team management
- Project management
- Ticket management
- User assignment
- Search
- Statistics
- Comments
- Role based organization (Create custom permissions)
- Ticket Type field (Create custom ticket type)
- Attachments (TODO)
- Change tracker (TODO)

<!-- TECHNOLOGY SECTION -->

## 🛠️Technologies

| **Front-end** | <p align="center"><img src="https://www.svgrepo.com/show/303500/react-1-logo.svg" width="100" height="100" /><br/> React</p>                                                                                        | <p align="center"><img src="https://avatars.githubusercontent.com/u/54212428?s=200&v=4" width="100" height="100" /><br/>Chakra UI</p>                                                                | <p align="center"><img src="https://axios-http.com/assets/logo.svg" width="100" height="100" /><br/>Axios</p>                                                          | <p align="center"><img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" width="100" height="100" /><br/>Redux</p>      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Back-end**  | <p align="center"><img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png" width="100" height="100" /><br/>NodeJs</p> | <p align="center"><img src="https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png" width="100" height="100" /><br/>ExpressJS</p> | <p align="center"><img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_wordmark_logo_icon_146425.png" width="100" height="100" /><br/>MongoDB</p> | <p align="center"><img src="https://cdn.freebiesupply.com/logos/large/2x/jest-logo-png-transparent.png" width="100" height="100" /><br/>Jest</p> |

## 🚀 Quick start

Start developing locally.

### Step 1: Download Node.js and MongoDB

Download: [MongoDB](https://www.mongodb.com/try/download/community)
Download: [Node.js](https://nodejs.org/en/)

### Step 2: Clone the repo

Fork the repository then clone it locally by doing

```sh
git clone https://github.com/Jenil-Vekaria/Trackit.git
```

### Step 2: Install Dependencies

cd into the client and server directory, and install the dependencies

```sh
cd client & npm install
```

```sh
cd server & npm install
```

### Step 3: Setup .env

To run the server you will also need to provide the `.env` variables

- create a new file <b>.env</b> in the root
- open [.env.EXAMPLE](./server/.env.EXAMPLE)
- copy the contents and paste it to the .env with valid keys

### Step 4: Seed database

Make the following POST request to seed the database (Only can run this in `development` or `testing` environment)

```sh
http://localhost:5000/test/populate
```

##### Login Info

| Email                        | Password | Role Type       |
| ---------------------------- | -------- | --------------- |
| james.smith@bugtracker.com   | password | Admin           |
| michael.smith@bugtracker.com | password | Developer       |
| robert.smith@bugtracker.com  | password | Project Manager |
| maria.garcia@bugtracker.com  | password | Submitter       |

#### You are all setup!

Run client application

```sh
npm start
```

Run server application

```sh
nodemon server.js
```

### Give a ⭐, if you liked the project

## 📸 Screenshots

#### TODO: Descriptions to be added

<div>
  <h3>Login</h3>
  <p>Log into the application with your credentials. If you don't have an account, click <strong>Sign Up</strong> to create a new account. Once you have logged in, you will be directed to projects page</p>
  <img src="./screenshots/login.png"/>
</div>

<div>
  <h3>View All Projects</h3>
  <p>You will find all the projects you have created or belong to. You can also search and sort the projects. Click on <b>Add Project</b> to create new project</p>
  <em><b>If your permissions doesn't allow you to manage project, "Add Project" will not be displayed</b></em>
  <img src="./screenshots/all_projects.png"/>
</div>

<div>
  <h3>Add Project</h3>
  <p>Enter your project information here (Title and description)</p>
  <img src="./screenshots/add_project.png"/>
</div>

<div>
  <h3>Add Project (Contributor)</h3>
  <p>Select all the project contributors. You will also see what type of role the user belong to.</p>
  <img src="./screenshots/add_project_contributors.png"/>
</div>

<div>
  <h3>View Project Info</h3>
  <p>Once you have created your project, you will see all your project tickets (intially none). You create new tickets, view project info and edit exisiting ticket.</p>
   <em><b>If your permissions doesn't allow you to manage tickets, "Add Ticket" will not be displayed</b></em>
  <img src="./screenshots/view_project.png"/>
</div>

<div>
  <h3>Project Overview</h3>
  <p>Click on <b>Overview</b> to see the project statistics</p>
  <img src="./screenshots/project_overview.png"/>
</div>

<div>
  <h3>View Ticket Info</h3>
  <p>Click on the existing ticket, you can edit the ticket info, add comment or update the ticket assignee</p>
  <em><b>If your permission doesn't allow you to manage tickets, all the fields, comments, assigness will be disabled</b></em>
  <img src="./screenshots/view_ticket.png"/>
</div>

<div>
  <h3>View Ticket Comments</h3>
  <p>Click on comments tab, you will see all the ticket comments and you can also comment on it.</p>
  <em><b>If your permission doesn't allow you to manage comments, you will not be able to comment</b></em>
  <img src="./screenshots/ticket_comments.png"/>
</div>

<div>
  <h3>My Tickets</h3>
  <p>Click on <b>Tickets</b> tab to see all your tickets regarless of what project it belongs to. Clicking on the ticket will allow you to edit it</p>
  <img src="./screenshots/my_tickets.png"/>
</div>

<div>
  <h3>Admin - Manage Users</h3>
  <p>Click on <b>Admin</b> to manage the organization (Users, Roles, Custom Ticket Type)</p>
  <p>Click on <b>Manage User</b> to manage all the users and their roles. Clicking on the user will allow you to update their role</p>
  <em><b>This tab will only be displayed if you are the admin</b></em>
  <img src="./screenshots/admin_manage_users.png"/>
</div>

<div>
  <h3>Admin - Manage Roles</h3>
  <p>Manage Roles tab will display all the roles and their respective permissions. To create custom role, click on <b>Add New Role</b></p>
  <img src="./screenshots/admin_manage_roles.png"/>
</div>

<div>
  <h3>Admin - Manage Roles (Add)</h3>
  <p>You can create your custom role by giving a role name and selecting the types of allowed actions</p>
  <img src="./screenshots/admin_create_role.png"/>
</div>

<div>
  <h3>Admin - Manage Ticket Types</h3>
  <p>You will see all the ticket types here. There are some pre-defined ticket types (Feature, Bug, Documentation, Support), but you may create custom ticket types by clicking on <b>Add New Ticket Type</b></p>
  <img src="./screenshots/admin_manage_ticket_types.png"/>
</div>

<div>
  <h3>Admin - Manage Ticket Types (Add)</h3>
  <p>Create custom ticket type by giving ticket type name, selecting an icon, and the icon colour</p>
  <img src="./screenshots/admin_create_ticket_types.png"/>
</div>

## Author

- Github: [@Jenil-Vekara](https://github.com/Jenil-Vekaria)
- Portfolio: [Jenil-Vekaria.netlify.app](https://jenil-vekaria.netlify.app/)
- LinkedIn: [@JenilVekaria](https://www.linkedin.com/in/jenilvekaria/)
