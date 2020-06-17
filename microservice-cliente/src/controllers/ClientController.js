class ClientController {
  indexById (req, res) {
    try {
      res
        .status(200)
        .json({msg: 'Sucesso!'});
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  index (req, res) {
    try {
      res
        .status(200)
        .json({msg: 'Sucesso!'});
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  store (req, res) {
    try {
      res
        .status(200)
        .json({msg: 'Sucesso!'});
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  update (req, res) {
    try {
      res
        .status(200)
        .json({msg: 'Sucesso!'});
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  delete (req, res) {
    try {
      res
        .status(200)
        .json({msg: 'Sucesso!'});
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }
}

module.exports = new ClientController();