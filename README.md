# Mongo Homework

## Bienvenido
The purpose of this homework is to make sure you get a brief intro to working with MongoDB is.

Here are your instructions to run the repository:
- Make sure you have NodeJs installed
- Clone the repository whichever way you feel most comfortable with (GitHub Desktop or with git clone commands)
- Open a terminal in the project's directory
- Run `npm install`
- Before running the code, you need to edit the .env file to add the url to your Mongo Instance
- Add this value to your .env file `DATABASE_URL="mongodb+srv://<username>:<password>@<mongo-instance-url>/<db-name>"`
- run: `npx prisma generate`
- run: `npm run dev`
After you are done, your server should be running at http://localhost:3000/ (if you have any issues please get a hold of me)

## Your Task
Your submission of your homework will be through creating a Pull Request
__MAKE SURE YOU CREATE A BRANCH FIRST__
- checkout a new branch with `git checkout -b {your name}/mongo-hw`
### Complete the server
Your task will be to make sure all end to end tests pass, meaning you have to complete each route that is defined within the code
- Remember to add your student Model in `prisma/schema.prisma`
- Run  `npx prisma generate` to load up Prisma with your DB
- Once you made sure you had no issues adding your newd db model commit your code to your branch with
    - `git add .`
    - `git commit -m "finished homework"`
    - `git push -u origin {your name}/{name of your DB Model}`

### Submission
You will submit this homework in 2 steps:
- Create a PR, your description should include your name and studentId (matricula) along with a screenshot of the ERD Diagram you based off your model
- Submit your PR link on the canvas submission, so I can give you your grade

__Remember I will download your code an test it__ I will run each of your code and all tests will need to pass in order to get your grade