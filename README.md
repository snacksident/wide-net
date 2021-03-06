# Concept
Nets are generally used to catch and filter things: grabbing unwanted objects out of an aquatic tank, keeping hair on your head instead of in someones food, catching falling objects of certain size, and my personal favorite: **catching bugs**!

# User Stories
* As a user, I want to log in with my email and password
* As a user, I want to view a list of bugs I've submitted and their statuses
* As a user, I want to know when my bugs have been fixed
* As a manager, I want to be notified of new bugs being submitted
* As a manager, I want to assign bugfixes to developers

# RESTful routing chart
| Method | Route       | Purpose                                              |
|--------|-------------|------------------------------------------------------|
| GET    | /teams      | if logged in, shows teams that the user is a part of |
| POST   | /teams      | creates a new team                                   |
| GET    | /bugs/:team | retrieves bugs for specific team                     |
| POST   | /bugs       | creates new 'bug' ticket                             |
| PUT    | /bugs       | updates bug info (user assignment, notes, status)    |