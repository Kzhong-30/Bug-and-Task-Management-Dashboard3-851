# Bug/Task Tracker

A web application built with Next.js/React.js for tracking bugs and tasks, equipped with user authentication, task creation, and time tracking functionalities.

## Table of Contents
- [Bug/Task Tracker](#bugtask-tracker)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Demo](#demo)

---

## Overview
This project is a bug and task tracker interface designed to demonstrate frontend development skills with a focus on UI/UX design and Next.js/React.js. The application allows users to manage and track tasks/bugs effectively.

## Features
- **User Authentication**: Mock authentication for login, redirecting to the dashboard on success.
- **Dashboard**: Displays a list of tasks with a trend line of concurrent tasks worked on each day.
- **Task/Bug Creation**: Users can create, edit, and delete tasks/bugs with various fields like title, description, priority, status, assignee, etc.
- **Task/Bug Management**: Filter and sort tasks based on priority, status, etc.
- **Time Tracker**: Log time spent on each task and display the total time.
- **Responsive UI**: A clean, user-friendly interface optimized for desktop and mobile devices.

##Example Login
- admin@example.com
- password = password


## Technology Stack
- **Frontend**: Next.js/React.js
- **Styling**: CSS / CSS-in-JS (e.g., styled-components)
- **State Management**: Optional library (e.g., Redux or Zustand)

## Project Structure
The project structure is organized as follows:

```
bug-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── ActivityChart.tsx
│   │   ├── LoginForm.tsx
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── NotificationCenter.tsx
│   │   ├── NotificationPanel.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TicketForm.tsx
│   │   ├── TimeTracker.tsx
│   │   ├── UserForm.tsx
│   │   ├── UserProfile.tsx
│   │   ├── UserSettings.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   ├── Tickets.tsx
│   │   ├── Users.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── style.css
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bug-tracker.git
   cd bug-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```

4. Access the app in your browser at `http://localhost:5173`.

## Demo
- [Live Demo Link](https://bugtracker-rho.vercel.app/login) 
- [Video Showcase](#) 

