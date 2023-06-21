# Lesson Scheduler App

## Intro

I created this app to demonstrate my knowledge and ability to develop using the MEAN stack and Docker. Users first select an instructor from a dropdown, and a date from a date picker. When a date is selected, a component with a list of available lesson times appears. When the user clicks a time, they are then able to fill out a form with their information and click the submit button to book the lesson. The user will receive a confirmation email with the instructor, date, and time of the lesson.

## Steps to Run

1. Make sure Docker is running on your machine.

2. Open a terminal window and run the following commands:
`docker pull jturbeville/lesson-scheduler-api`
`docker run -p 8080:8080 jturbeville/lesson-scheduler-api`
`docker pull jturbeville/lesson-scheduler-client`
`docker run -p 80:<INSERT PORT #> jturbeville/lesson-scheduler-client`

3. Navigate to [http://localhost:<INSERT PORT #>]() in any browser.

4. Play around. Feel free to test the app by changing screen sizes,
booking a lesson, etc.

## MongoDB

The Express server interacts with MongoDB (hosted on Atlas). The database has two collections: instructors and timelots. Instructor documents have fields for name, email, and the subject they teach. Timeslot documents have fields for instructor ID, time, and optional fields for student email, student name, and student notes (populated when someone books the timelot).

## Express

I built a REST API using Express that interacts with the database. It has models, controllers, and routes for the two collections (instructors and timeslots). The instructor controller is complete and performs all REST operations. The controller leverages query params to perform complex queries. For the time being, the timeslot controller only has operations to meet the needs of the app. The API also uses 'nodemailer' to send confirmation emails.

## Angular

The frontend is built on Angular 15. I used Angular Material to create a seamless UI. I followed a mobile-first approach to build the UI. It is responsive to changes in screen size. I used ReactiveForms to implement robust form behavior.

## Node

Node is an integral part of this project because both Angular and Express are built on Node. Furthermore, the app leverages modules such as 'nodemailer' to implement its functionality.

## Docker

Both frontend and backend are containerized using docker. This makes it easy for others to run my app locally if needed. Furthermore, Docker containers share the host's OS kernel and therefore require fewer resources. Lastly, Docker containers are easy to scale (just spin up more containers as needed) and load balance using tools such as Kubernetes.
