# Asterisk - Car Rentals

## Teamwork project plan

### 01. Models

#### Data provided

1. user (user role: regular)
2. admin (user role: admin)
3. support user (user role: support)
4. car - single 
5. car category (list of cars based on category)
6. car deals (list of cars based on deal property)
7. car query (list of cars based on search properties)
8. booking (user, car, period)
9. bookings (list of not expired bookings)
10. booking history (list of expired bookings)
9. review (autor - registered, rating, text - limited)
10. comment (author, text - larger limit)

#### Data Manipulation

##### Not registered
1. view
	- home / reviews
	- cars
	- single car / comments
	- deals
	- login
	- register

##### Regular user
1. add
	- user
	- booking
	- review 
	- comment
2. edit
	- user (self)
3. view
	- home / reviews
	- cars
	- deals
	- single car / comments
	- bookings (self)

##### Administrator - all for user +
1. add
	- new car
2. edit
	- car (activate deal)
	- user (make admin)
3. view
	- cars
	- deals
	- users
	- bookings

#### Models Structure

1. user
	- Name
	- username
	- password (it is validated and then stored as hash in db)
	- phone
	- email
	- role (regular / admin / support)
2. car
	- make + model (one input field)
	- category
	- photo (link, uploaded)
	- capacity
		- adults
		- bags
		- doors
	- details
		- fuel
		- transmission
		- year
		- airConditioner
	- price
		- base
		- special
	- deal (yes / no)
3. booking
	- user (username)
	- car (Make Model)
	- pickup (date)
	- dropoff (date)
	- total price (calculated from total days * car.price)
	- extrax (array with all extras as gps etc.)
4. review
	- author (Name)
	- rating
	- text
5. comment
	- author (Name)
	- text
6. car categories
	- name (Economy, Compact etc.)
	- cars (array with all cars with same category). To include this info for every car:
	{
		"model": "Toyota Corolla",
		"category": "Compact",
		"fueltype": "Petrol",
		"baseprice": 20
	}
7. deals
	- array with all cars that have active special price with this info for every car:
	{
		"model": "Toyota Corolla",
		"category": "Compact",
		"fueltype": "Petrol",
		"baseprice": 20,
		"specialprice": 14.99
	}

### 02. Pages

#### Dynamic pages

**public pages:**

- `home` - nav + logo in header, banner, some car categories, some info, some reviews (from registered users), footer
- `login/register`
- `cars` - all cars (eventually sorting by: price, category (small to large; large to small))
- `search cars` - shows only cars that are available for the requested period
- `car details` - for a single car, comments (only auth users can post comment)
- `special offers` - only cars that have discounted price, ordered by category (compact, economy, premium etc.)

**pages for auth users:**

- `user profile` - name, telephone, email etc. (he can update all personal info and password)
	- if the user is admin - he also have administration page and there he can change info about cars and also select wich cars to have special offer and by how much (type % and it calculate the special price and also show's original price with style: line-trough)
- `my bookings/reservations` - history of all previous bookings
- `booking/reservation of a car` - choosing dates from calendar, extras (gps), additional insurance etc.
- `leave a review` (about this rent-a-car service)

### 03. Requirements

#### Application Back-end (Server) - up to 40%

1. At least 5 different public dynamic web pages
	- Using Pug														| https://pugjs.org/language/attributes.html
2. At least 3 different private (authenticated) dynamic web pages
	- Using Pug
3. At least 5 different public RESTful routes for AJAX
4. At least 1 private (authenticated) route for AJAX
5. Use Express for the server
	- Use an MV-* pattern
6. Use MongoDB
	- As data storage
	- Do not use Mongoose
7. Create a data/service layer for accessing the database
8. Use Passport - for managing users								| https://github.com/jaredhanson/passport-local
9. Implement WebSockets
	- Using Socket.io or anything else


#### Application front-end (client) - up to 25%

1. Use any framework of your choice for the front-end
	- Optional, not required
	- KendoUI, AngularJS, Angular 2, Knockout, Bootstrap, etc...
2. Implement responsive design
	- It may be based on Bootstrap, Materialize or any other UI framework
3. Use at least one AJAX form and/or WebSockets communication
	- maybe the form on home page - when the user type 3 characters - to make GET request for all cities with typed characters
4. Apply error handling and data validation to avoid crashes when invalid data is entered
	- maybe toastr of similar
5. Use loaders, modals and notifications when applicable 
	- modal from JQuery UI for posting comment
6. Prevent yourself from security holes (XSS, XSRF, Parameter Tampering, etc.)
	- Handle correctly the special HTML characters and tags like `<script>, <br />`, etc.
7. Create usable UI
	- No need to be pretty, but usable
