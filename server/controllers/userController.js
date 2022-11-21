// const ApiError = require("../error/ApiError");
const { User } = require("../models/models");

class userController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const user = await User.create({ name });
      res.json(user);
    } catch (error) {
      res.send(error);
    }
  }

  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.send(error);
    }
  }
  async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      res.json(user);
    } catch (error) {
      res.send(error);
    }
  }
  async edite(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
      await User.update(data, {
        where: {
          id,
        },
      });
      res.send("updated user");
    } catch (error) {
      res.send(error);
    }
  }
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await User.destroy({ where: { id } });
      res.send(`Row${id} is deleted`);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = new userController();
