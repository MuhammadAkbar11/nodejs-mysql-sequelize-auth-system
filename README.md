## Simple Auth System BoilerPlate using Nodejs Mysql Sequelize

### Instructions

#### Install Dependencies

```sh
$ yarn install
```

### Create .env file

create env file in the root folder and make sure the contents are like this:

```sh

PORT=4000 #ort

# This for session store
DB_HOST=localhost #host
DB_NAME=database-name #database name
DB_USERNAME=root #username
DB_PASSWORD=password #password
SESSIONDB_SECRET=its_secret_session

```

#### Compile Styles

```sh
$ yarn run compile-styles
```

#### Run Server

```sh
$ yarn start
```
