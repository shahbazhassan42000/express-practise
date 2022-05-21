import express from 'express';
import directoryController from '../controllers';

const { Router } = express;
const { directory } = directoryController;

const api = Router();

/**
 * @swagger
 * /api/directory:
 *   get:
 *     tags: ["Get all books"]
 *     description: Retrieves a list of JSON objects
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns a list of book objects
 *         schema:
 *           $ref: '#/definitions/Book'
 */

//get all books
api.get('/', directory.all);

/**
 * @swagger
 * /api/directory:
 *   post:
 *     tags: ["Create a book"]
 *     description: create an object given in JSON format as in the body of the request
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Book object that needs to be added to the directory"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Book"
 *     responses:
 *       201:
 *         description: Book object created successfully.
 *       404:
 *         description: Book not found against given id
 *       400:
 *         description: ERROR!!! While creating book
 */
//create book
api.post('/', directory.create);

/**
 * @swagger
 * /api/directory/{id}:
 *   get:
 *     tags: ["Get a book by id"]
 *     description: Retrieves a JSON object against given id
 *     produces:
 *         - application/json
 *     parameters:
 *         - name: id
 *           in: path
 *           description: ID of book to return
 *           required: true
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Returns a single book matched against given id
 *         schema:
 *           $ref: "#/definitions/Book"
 *       404:
 *         description: Book not found against given id
 *       400:
 *         description: ERROR!!! While getting book
 */
//Get a single book against given id
api.get('/:id', directory.one);

/**
 * @swagger
 * /api/directory/{id}:
 *   put:
 *       tags: ["Update a book by id"]
 *       description: 'Update an existing book'
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of book to return
 *           required: true
 *           type: integer
 *           format: int64
 *         - in: body
 *           name: body
 *           description: Book object that needs to be updated to the list
 *           required: true
 *           schema:
 *             $ref: '#/definitions/Book'
 *       responses:
 *         '204':
 *           description: Book updated successfully
 *         '404':
 *           description: Book not found
 *         '400':
 *           description: ERROR!!! While updating book
 */
//update a single book against given id
api.put('/:id', directory.update);

/**
 * @swagger
 * /api/directory/{id}:
 *   delete:
 *     tags: ["Delete a book by id"]
 *     description: Deletes a book
 *     produces:
 *         - application/json
 *     parameters:
 *         - name: id
 *           in: path
 *           description: ID of book to delete
 *           required: true
 *           type: integer
 *           format: int64
 *     responses:
 *         '204':
 *           description: Book deleted successfully
 *         '404':
 *           description: Book not found
 *         '400':
 *           description: ERROR!!! While deleting book
 */

//Delete a single book against given id
api.delete('/:id', directory.delete);


export default api;
