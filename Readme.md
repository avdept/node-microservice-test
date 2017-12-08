
## Webserver

* Run `npm install` to install node_modules
* Run `npm run dev` to run server

#### Login

* `POST /login` with params `{ username: XX, password: XX }` returns `{ jwt_token: 'XXXXX' }`
* Available credentials: `admin:admin, user:user`

#### Generate

* `POST /generate` with params `task: { some: 'test', values: 'here' }`
* Header - `Authorization: Bearer JWT_TOKEN`
