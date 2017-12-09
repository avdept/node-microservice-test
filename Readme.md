
## Gateway microservice

* Run `npm install` to install node_modules
* Run `npm run dev` to run server

#### Login

* `POST /sessions/create` with params `{ username: XX, password: XX }` returns `{ jwt_token: 'XXXXX' }`
* Available credentials: `admin:admin, user:user`

#### Generate

* `POST /task_generators/create` with params `task: { some: 'test', values: 'here' }`
* Header - `Authorization: Bearer JWT_TOKEN`


## Tasks microservice

* Run `npm install` to install node_modules
* Run `npm run dev` to run server


## Notes
* Please note - rabbit_mq runs on default settings, so if you will run in - make sure you have correct urls.
