class userController {
  async create(req, res) {}
  async getAll(req, res) {
    const query = req.query;
    console.log(query);
    res.json(query);
  }
  async getById(req, res) {}
  async edit(req, res) {}
  async delete(req, res) {}
}

module.exports = new userController();
