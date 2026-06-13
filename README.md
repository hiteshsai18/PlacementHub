# Placement Preparation Hub

## Project Overview

Placement Preparation Hub is a full stack web application designed to help students prepare for campus placements through aptitude practice, coding challenges, company specific preparation resources, interview experiences, and progress tracking.

The project is being developed incrementally with a day wise roadmap to ensure structured learning and implementation.

## Technology Stack

### Frontend

React.js

React Router DOM

Axios

Vite

### Backend

Node.js

Express.js

JWT Authentication

bcryptjs

### Database

MongoDB Atlas

Mongoose

### Version Control

Git

GitHub

## Development Progress

### Day 0

Project Initialization

Created frontend using Vite

Created backend using Node.js and Express

Configured project folder structure

MongoDB Setup

Created MongoDB Atlas cluster

Created database user

Configured network access

Connected backend to MongoDB Atlas

Completed

MongoDB Atlas connection established

Express server running successfully

React frontend initialized

## Day 1

Authentication Backend

Created User model

Implemented user registration

Implemented user login

Added password hashing using bcryptjs

Implemented JWT token generation

Created authentication middleware

Implemented protected profile route

API Endpoints

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

Completed

User registration

User login

Password hashing

JWT authentication

Protected routes

Profile endpoint

## Day 2

Authentication Frontend

Created Login page

Created Register page

Created Dashboard page

Configured Axios for API communication

Connected frontend with backend APIs

Implemented localStorage based session storage

Stored JWT token after login

Stored user information after login

Completed

Frontend authentication pages

Backend integration

Session storage

Dashboard access

## Day 3

Authentication Flow Improvements

Implemented protected routes

Added route redirection for unauthorized users

Created navigation component

Implemented logout functionality

Maintained user session after page refresh

Completed

Protected dashboard access

Logout functionality

Navigation system

Session persistence

### Day 4

Dashboard UI

Sidebar navigation

Dashboard cards

Responsive layout

New Pages

Aptitude Tests

Companies

Interview Experiences

Profile

Completed

## Upcoming Development

### Day 5

Company Preparation Module

Company specific preparation resources

Hiring process information

Interview patterns

Preparation strategies

### Day 6

Interview Experiences Module

Add interview experiences

View interview experiences

Search by company

### Day 7

Aptitude Test Engine

Multiple choice questions

Timer functionality

Score calculation

Topic wise practice

### Day 8

Progress Tracking

Performance analytics

Score tracking

Progress reports

Dashboard statistics

### Day 9

Coding Challenges Module

Coding questions

Difficulty levels

Test cases

Submission tracking

### Day 10

Online Compiler Integration

Judge0 API integration

Run code functionality

Submit code functionality

Automatic test case evaluation

## Project Structure

```text
placement-prep-hub

frontend
│
├── src
│   ├── pages
│   ├── components
│   ├── services
│   └── App.jsx

backend
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── server.js
└── .env
```

## Current Status

Day 0 Completed

Day 1 Completed

Day 2 Completed

Day 3 Completed

Day 4 In Progress

Day 5 Pending

Day 6 Pending

Day 7 Pending

Day 8 Pending

Day 9 Pending

Day 10 Pending

## Author

Hitesh Sai Emmaneni

## Objective

To build a production ready Placement Preparation Platform that helps students prepare effectively for campus placements through structured learning resources, practice modules, company specific guidance, and performance tracking.
