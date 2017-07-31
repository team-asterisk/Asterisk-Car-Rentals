# Team Asterisk - Teamwork Project

**Telerik Academy - Season 8 - Web applications with Node.js course**

## Team Members

| Name | Telerik Student system username |
|:----:|:-----------------------:|
| [Захари Димитров](https://github.com/zachdimitrov) | ZachD |
| [Иван Петров](https://github.com/tinmanjk) | tinman |
| [Емил Димитров](https://github.com/EmilPD) | qwerty123 |

## Car Rentals
Using Asterisk Car Rental App you can make car reservation with just a few simple steps.

## Navigation
0. Every page have navigation on top that include:
  - logo (that is also link to home page)
  - cars (that is also link to cars page)
  - deals (that is also link to deals page)
  - register (that is also link to register page *only if you are not logged)
  - login (that is also link to login page *only if you are not logged)
  - account (that also inklude dropdown menu with private pages *only if you are logged)
    - dashboard (that is visible only if you are admin)
    - profile 
    - my bookings
    - leave review
    - logout

## Public Pages
1. Home page - from there you can:
  - select category
  - search cars available for chosen dates
  - see reviews from our users
2. Cars page:
  - it includes all cars
  - you can view certain car details 
3. Deals page:
  - it includes all cars that have special price
  - you can view certain car details
4. Login page
5. Register Page
6. Search cars page

## Private pages
7. Profile page
8. My Bookings page
9. Leave review page
*Note: only logged users can leave reiview, make booking and post comment

## Admin pages
10. View users page - all users and have edit user functionality
11. View cars page - all cars and have edit car functionality
12. View deals page - all deals
13. View bookings page - all bookings of all users
14. Add new car page

## API
1. /api/
2. /api/car/:id
3. /api/searchcars/:pickupdate/:dropoffdate
4. /api/deals
5. /api/cars
6. /api/cars/:category
7. /api/auth/bookings
8. /api/authenticate/:username/:password

### [Requirements for teamwork](https://github.com/TelerikAcademy/Web-Applications-with-Node.js/tree/master/Course%20Project)
