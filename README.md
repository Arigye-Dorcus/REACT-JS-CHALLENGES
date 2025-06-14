## SET 1
## Random Quote Generator 
- Built a QuoteGenerator component that displays a random quote from a Quotes API like https://dummyjson.com/docs/quotes. 
- Added a next and previous button so that a user a go to the previous or next quote from the list of quotes fetched from the API 
Visit the app: <http://localhost:5173/>

## Weather Card 
- Built a WeatherCard component that takes city, temperature, and condition (e.g., "Sunny" or "Rainy") as props and displays them. 
- Created multiple weather cards to display different cities.
- Got the weather data from a weather data API like https://www.weatherapi.com/
Visit the app: <http://localhost:5174/>

## SET 2
## Simple User Authentication
- Built a simple authentication fl ow using Mantine UI, React Router, and Auth0. Your application should have three separate pages:
1. Signup Page (/signup)
2. Login Page (/login)
3. Dashboard Page (/dashboard)
Use React Router to navigate between these pages.
● On the Signup Page, created a form that captures the user's full name, email, and password. Validate all fi elds and store the user’s information securely in localStorage.
● On the Login Page, created a form with email and password fi elds. When the user submits the form, validate the inputs and check if the credentials match the data saved in localStorage. If they do, display a "Welcome back!" message and redirect the user to the Dashboard. If not, show an error.
● Additionally, implement a “Sign in with Google” feature using Auth0. If the user logs in successfully via Google, redirect them to the Dashboard page as well.
● The Dashboard Page should only be accessible after a successful login and should display a simple welcome message or user details.
Run the app locally: <http://localhost:3000/>

## News Feed Page 
- BuilT a News Feed Application with a custom backend using Strapi and a frontend using React. You are required to set up both the backend and frontend as follows:
1. Backend (Strapi)
- Use Strapi to build your backend API for managing news posts.
-  Each post should include the following fi elds: title, author, content,
excerpt, and category.
2. Ensure the API supports fetching:
○ All posts (with pagination)
○ A single post by ID or slug
○ Posts fi ltered by category or title