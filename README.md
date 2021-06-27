## Getting Started

Install node, yarn, docker and docker-compose.

Run docker-compose:

```shell
docker-compose up
```

It will run a local mongodb on port 27017 and populate the collection 'companies' on the database 'flash'

Use your favorite GUI client to check it out, like Robo3T, NoSQLBooster or MongoDB Compass.

Install the dependencies and run the server:

```shell
yarn
yarn server
```

The server will start on `http://localhost:3000`

Open another terminal and run the client:

```shell
yarn client
```

The client will start on `http://localhost:1234`

## Bugs found

1. There is no element with the `app` id so React doesn't know where to render - client/index.html:8
2. React wasn't defined inside `app.jsx`, this way the JSX couldn't be rendered and an error was thrown - client/app.js:1
3. `API_URL` was wrongly defined in .env, so apollo client couldn't connect to the graphQL server - .env:2
4. Creating a company with the right CNPJ number wasn't possible, the regex testing the string received was only approving 12 digit number, but CPNJ has actually 14 digits (as the error message suggests), and there was also a `$` operator, which tests only the end of the string - server/company/company.model.js:17
5. In companies list, `onClick` was mistyped as `onCLick` - client/pages/companies/companies.page.jsx:75
6. The companies list is not loaded because the `useQuery` root is set to only bring cached result -  client/pages/companies/companies.page.jsx:47
7. The companies list query was returning 400 because it was trying to query `employees` which wasn't created yet - client/graphql/queries.js:12

## Notes

- CPF wasn't described as unique in the requirements, but it is wrong to add two employees with the same CPF, so I added CPF as a unique attribute to the Employee.
