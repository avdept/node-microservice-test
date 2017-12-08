import { find } from 'lodash';
import { createJWToken } from '../libs/auth';

const users = [['admin', 'admin', true], ['user', 'user', false]];

const findUser = (req) => {
  return find(users, (user) => { return user[0] === req.body.username && user[1] === req.body.password; });
};

const login = (req, res) => {
  // I didn't implement hashing check for password since its not in scope of test task,
  // but overall it should look like following(pseudocode)
  // user = user.get_from_db(username);
  // if user.password == hash_with_salt(req.body.password) return true;
  const user = findUser(req);
  if (user) {
    // TODO: Refactor this to have also regular user
    const token = createJWToken({ ...req.body, admin: user[2] });
    res.status(200).json({ jwt_token: token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export default login;
