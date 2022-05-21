let directory = [];
export default {
  all(req, res) {
    res.status(200)
      .json(directory);
  },
  create(req, res) {
    console.log('Creating Book . . . ');
    try {
      directory.push(req.body);
      res.status(201)
        .json('Book Created Successfully!!!');
    } catch (e) {
      console.log(e);
      res.status(400)
        .json('ERROR!!! While creating book.');
    }
  },
  one(req, res) {
    let id;
    try {
      id = parseInt(req.params.id);
      let index = directory.findIndex(e => e.id === id);
      if (index !== -1) {
        console.log('book found');
        res.status(200)
          .json(directory[index]);
      } else {
        console.log('book not found');
        res.sendStatus(404);
      }
    } catch (e) {
      console.log(e);
      res.status(400)
        .json(`ERROR!!! While getting book with id: ${id}`);
    }
  },
  update(req, res) {
    let id;
    try {
      id = parseInt(req.params.id);
      let index = directory.findIndex(e => e.id === id);
      if (index !== -1) {
        console.log('book found, now updating the book . . . ');
        let updated = {
          id: id,
          name: req.body.name,
          location: req.body.location,
          writer: req.body.writer
        };
        directory.splice(index, 1, updated);
        res.sendStatus(204);
      } else {
        console.log('book not found to update');
        res.sendStatus(404);
      }
    } catch (e) {
      console.log(e);
      res.status(400)
        .json(`ERROR!!! While updating book with id: ${id}`);
    }
  },
  delete(req, res) {
    let id;
    try {
      id = parseInt(req.params.id);
      let index = directory.findIndex(e => e.id === id);
      if (index !== -1) {
        console.log('Deleting book . . . ');
        directory.splice(index, 1);
        res.sendStatus(204)
      } else {
        console.log('Book not found to delete');
        res.sendStatus(404);
      }
    } catch (e) {
      console.log(e);
      res.status(400)
        .json(`ERROR!!! While deleting book with id: ${id}`);
    }
  }
};
