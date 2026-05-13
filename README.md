Cloud Resource Request and Cost Governance Mini System
Project Overview

The Cloud Resource Request and Cost Governance Mini System is a mini cloud governance platform developed to manage cloud resource requests in a structured and controlled manner.

The project was developed as a medium-level hands-on cloud governance project that simulates real-world cloud operations workflows used by organizations to manage cloud infrastructure requests, approvals, ownership tracking, cost visibility, and governance reporting.

This system helps organizations:

maintain visibility of cloud resource requests
track ownership and accountability
reduce unnecessary cloud spending
validate business justification
monitor resource lifecycle
improve governance and operational transparency

The project supports request creation, validation, approval workflow, cost categorization, filtering, reporting, expiry tracking, and governance dashboard functionality.

Problem Statement

Many organizations provision cloud resources without maintaining proper ownership records, business justification, expiry tracking, or cost awareness.

This creates problems such as:

unnecessary cloud spending
orphaned resources
lack of accountability
unclear ownership
poor governance visibility
unmanaged cloud growth

The objective of this project is to build a governance-focused cloud resource request management system that allows users to request cloud resources while enabling administrators to review, approve, reject, monitor, and report on cloud resource usage.

Project Objectives

The main objectives of this project are:

Build a cloud resource request workflow
Implement governance validation rules
Track request lifecycle status
Add cost awareness logic
Provide approval and rejection workflow
Generate governance reports and insights
Improve visibility into cloud operations
Simulate enterprise cloud governance practices
Features Implemented
1. Resource Request Creation

Users can create cloud resource requests by providing:

requester name
department
resource type
purpose
environment
duration
usage estimate
access justification
2. Input Validation

The system validates:

missing requester name
missing purpose
invalid duration
invalid usage estimate
incomplete access justification
duplicate requests
3. Request Lifecycle Tracking

The project supports the following request statuses:

submitted
under_review
approved
rejected
active
expired
closed
4. Approval and Rejection Workflow

Reviewers can:

approve requests
reject requests
add reviewer comments
assign ownership
define expiry dates
5. Cost Governance Logic

The project classifies requests into:

low cost
medium cost
high cost

Cost classification is based on:

resource type
duration
usage estimate
6. Governance Dashboard

The governance dashboard provides:

total requests
approved requests
rejected requests
active resources
expired resources
high-cost requests
7. Expiry Monitoring

The project tracks:

resources nearing expiry
resources missing ownership information
8. Filtering and Search

Requests can be filtered using:

requester name
status
environment
resource type
cost category
9. Final Governance Report

The system provides a final governance report containing:

governance summary
all request records
operational visibility
governance insights
Technologies Used
Backend
Node.js
Express.js
Sequelize ORM
Database
AWS RDS MySQL
Frontend
HTML
CSS
JavaScript
API Testing
Postman
Version Control
Git
GitHub
Deployment
Render
System Architecture

Frontend → Backend APIs → Validation Layer → AWS RDS Database → Governance Reporting

Workflow:

User submits cloud resource request
Backend validates request data
Request stored in AWS RDS
Reviewer approves/rejects request
System tracks lifecycle status
Governance APIs generate reports and summaries
Project Folder Structure
cloud-governance-project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── README.md
└── .gitignore
Database Design
Request Table Fields
Field	Purpose
requester_name	Tracks accountability
department	Organizational visibility
resource_type	Resource classification
purpose	Business justification
environment	Dev/Test/Production tracking
duration_days	Expiry governance
usage_estimate	Cost estimation
access_justification	Security governance
status	Lifecycle tracking
reviewer_comments	Audit visibility
owner	Ownership tracking
expiry_date	Expiry monitoring
cost_category	Cost governance
API Endpoints
Request APIs
Method	Endpoint	Description
POST	/requests/create	Create resource request
GET	/requests/all	View all requests
Approval APIs
Method	Endpoint	Description
PUT	/requests/approve/:id	Approve request
PUT	/requests/reject/:id	Reject request
Status APIs
Method	Endpoint	Description
PUT	/requests/status/:id	Update request status
PUT	/requests/check-expiry	Run expiry check
Filter APIs
Method	Endpoint	Description
GET	/requests/filter	Filter requests
Governance APIs
Method	Endpoint	Description
GET	/requests/dashboard/summary	Governance dashboard
GET	/requests/dashboard/reminders	Expiry reminders
GET	/requests/report/final	Final governance report
AWS RDS Configuration

The project uses AWS RDS MySQL as the cloud database.

AWS RDS was selected because:

managed cloud database service
enterprise-level reliability
scalability
real-world cloud environment simulation
persistent storage capability

Database connection is configured using Sequelize ORM.

Environment Variables

Create a .env file in backend folder:

DB_NAME=cloud_governance
DB_USER=admin
DB_PASSWORD=yourpassword
DB_HOST=your-rds-endpoint.amazonaws.com
PORT=3000
Installation and Setup
Step 1 — Clone Repository
git clone <repository-url>
Step 2 — Install Dependencies
npm install
Step 3 — Configure Environment Variables

Create .env file and configure AWS RDS credentials.

Step 4 — Start Backend Server
nodemon app.js

OR

node app.js
Step 5 — Run Frontend

Open:

frontend/index.html

OR use VS Code Live Server.

Sample Request JSON
{
  "requester_name": "Sumeet",
  "department": "IT",
  "resource_type": "compute",
  "purpose": "Lab server for testing",
  "environment": "development",
  "duration_days": 15,
  "usage_estimate": 50,
  "access_justification": "Need access for application testing"
}
Validation Rules Implemented

The project validates:

missing requester name
missing purpose
invalid duration
duplicate requests
incomplete access justification
invalid approval actions
invalid close operations
Cost Categorization Logic

Cost category is calculated based on:

resource type
duration
usage estimate

Example:

high compute usage + long duration = high cost
low storage usage + short duration = low cost
Governance Principles Implemented

The project implements:

Accountability

Tracking requester and owner information.

Cost Awareness

Classifying requests based on estimated usage.

Lifecycle Governance

Tracking requests from creation to closure.

Access Governance

Validating access justification.

Operational Visibility

Providing dashboard and governance reporting.

Testing Performed
Positive Test Cases
Test Case	Result
Create valid request	Passed
Approve request	Passed
Filter request	Passed
Generate dashboard report	Passed
Expiry monitoring	Passed
Negative Test Cases
Test Case	Result
Missing requester name	Validation error shown
Invalid duration	Validation error shown
Duplicate request	Duplicate prevention successful
Invalid close operation	Error handled
Incomplete approval	Validation prevented approval
Challenges Faced

Some challenges faced during development:

configuring AWS RDS connectivity
implementing governance validation logic
handling status transitions correctly
managing expiry tracking
integrating frontend with backend APIs
Future Improvements

Possible future enhancements:

user authentication
role-based access control
email notifications
real cloud cost estimation APIs
monitoring dashboards
automated approval workflows
audit logging
Kubernetes deployment
microservice architecture
Learning Outcomes

Through this project, the following concepts were learned:

cloud governance principles
AWS RDS integration
REST API development
Node.js backend development
database design
approval workflow implementation
cost governance logic
validation and error handling
frontend-backend integration
deployment and version control
Conclusion

The Cloud Resource Request and Cost Governance Mini System successfully demonstrates how cloud governance practices can be implemented in a real-world cloud operations workflow.

The project provides:

structured cloud request management
governance enforcement
operational visibility
lifecycle tracking
cost awareness
reporting and monitoring

This solution helps organizations improve accountability, reduce unnecessary cloud spending, and manage cloud resources more effectively.

Author

Name: Sumeet

Project: Cloud Resource Request and Cost Governance Mini System

Technology Stack:

Node.js
Express.js
AWS RDS MySQL
Sequelize ORM
HTML/CSS/JavaScript
Postman
GitHub
Render
