
## Arithmetic Calculator - Front End

The following project was build with the following tech stack:
- NextJS v14.2.5
- React v18.3.1
- MUI 5.15.20

The implementation was done on top of following template: [Devias Kit - React](https://material-kit-react.devias.io/)

And was minimized to showcase the following:
#### Pages
- [Dashboard](https://material-kit-react.devias.io) Main page that shows the arithmetic operations, user budget and latest operations
- [Account](https://material-kit-react.devias.io/dashboard/account) Shows user's information
- [History](https://material-kit-react.devias.io/dashboard/customers) A tweak from the original 'Customers' page to display all User's operations done
- [Sign In](https://material-kit-react.devias.io/auth/sign-in) Log in page

### Quick start

- Clone the repo: `git clone https://github.com/dancarreon/calculator-ui.git`
- Make sure your Node.js and npm versions are up-to-date
- Install dependencies: `npm install` or `yarn`
- Start the server: `npm run dev` or `yarn dev`
- Open browser: `http://localhost:3000`

### Notes:
- By default, a User information is set on the Login page: 'user1@test.com' with password: 'password', this can be used to test the main functionaliies of the application. Additionally, several more Users have been added, just modify the username to 'user[next sequential number]'
- Once a User has run out of budget it won't be possible to keep doing operations, you will have to choose another User or manually reset their budget

