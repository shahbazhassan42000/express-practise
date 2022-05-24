import Role from '../utils/role';
import jwt from 'jsonwebtoken';
import config from '../config';

const { secretKey } = config;
const users = [
  {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    role: Role.Admin,
  },
  {
    name: 'user',
    email: 'user@gmail.com',
    password: 'user',
    role: Role.User,
  },
];
export default {
  signin(req, res) {
    if (Object.keys(req.body).length === 0) {
      return res.sendStatus(400);
    }
    console.log('sign in');
    const user = users.find(
      (u) => u.name === req.body.name && u.role === req.body.role
    );
    if (!user) {
      return res
        .status(403)
        .json('No user exists against this username, please sign up first.');
    }
    if (user.password !== req.body.password) {
      return res.status(403).json('Wrong Password.');
    }
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          password: user.password,
          role: user.role,
        },
        secretKey
      );
      return res.status(200).json({ token });
    }
  },
  all(req, res) {
    res.status(200).json(users);
  },
  create(req, res) {
    if (Object.keys(req.body).length !== 4) {
      return res.sendStatus(400);
    }
    if (req.body.role === Role.Admin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (!Object.keys(Role).find((k) => Role[k] === req.body.role)) {
      return res
        .status(400)
        .json({ message: `${req.body.role} role is not supported yet` });
    }
    console.log('Creating User . . . ');
    try {
      users.push(req.body);
      res.status(201).json('User Created Successfully!!!');
    } catch (e) {
      console.log(e);
      res.status(400).json('ERROR!!! While creating users.');
    }
  },
  one(req, res) {
    let name;
    try {
      name = req.params.name;
      if (req.user.role !== Role.Admin && name !== req.user.name) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      const index = users.findIndex((e) => e.name === name);
      if (index !== -1) {
        console.log('users found');
        res.status(200).json(users[index]);
      } else {
        console.log('users not found');
        res.sendStatus(404);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json(`ERROR!!! While getting user with name: ${name}`);
    }
  },
  update(req, res) {
    let name;
    try {
      name = req.params.name;
      if (req.user.role !== Role.Admin && name !== req.user.name) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      const index = users.findIndex((e) => e.name === name);
      if (index !== -1) {
        console.log('users found, now updating the users . . . ');
        const updated = {
          name,
          email: req.body.email,
          password: req.body.password,
          role: users[index].role,
        };
        users.splice(index, 1, updated);
        res.sendStatus(204);
      } else {
        console.log('users not found to update');
        res.sendStatus(404);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json(`ERROR!!! While updating user with name: ${name}`);
    }
  },
  delete(req, res) {
    let name;
    try {
      name = req.params.name;
      if (req.user.role !== Role.Admin && name !== req.user.name) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      const index = users.findIndex((e) => e.name === name);
      if (index !== -1) {
        console.log('Deleting users . . . ');
        users.splice(index, 1);
        res.sendStatus(204);
      } else {
        console.log('users not found to delete');
        res.sendStatus(404);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json(`ERROR!!! While deleting user with name: ${name}`);
    }
  },
};
