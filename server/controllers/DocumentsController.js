import { Documents } from '../models';

/**
 * Documents Controller class that handles all Users documents
 */
class DocumentsController {

  /**
   * Gets all documents in the database
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static getAllDocuments(req, res) {
    Documents.findAll({
      limit: req.query.limit,
      order: '"createdAt" DESC',
    })
      .then((documents) => {
        res.status(200)
           .send(documents);
      })
      .catch((err) => {
        res.status(500)
           .send({ message: 'Error retrieving documents' });
      });
  }

  /**
   * Get a specific document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static getDocumentById(req, res) {
    Documents.findById(req.params.id)
      .then((document) => {
        res.status(200)
          .send(document);
      });
  }

  /**
   * Creates a new document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} no return
   */
  static createDocument(req, res) {
    req.body.OwnerId = req.decoded.UserId;
    Documents.create(req.body)
      .then((document) => {
        res.status(201)
           .send(document);
      })
      .catch((err) => {
        res.status(500)
           .send({ message: 'Error creating documents' });
      });
  }

  /**
   * Get all documents that belongs to a particular user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static getUserDocuments(req, res) {
    Documents.findAll({
      where: { OwnerId: req.params.id }
    })
    .then((documents) => {
      res.status(200)
         .send(documents);
    })
    .catch((err) => {
      res.status(500)
         .send({ message: 'Error fetching documents' });
    });
  }

  /**
   * Get all public Access documents of a users
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static getAllUserPublicDocuments(req, res) {
    Documents.findAll({ where: {
      $or: {
        permission: 'public',
        OwnerId: req.params.id
      }
    } })
      .then(documents => res.status(200).send(documents));
  }

  /**
   * Update documet's details
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Returns void
   */
  static updateDocument(req, res) {
    req.body.document.update(req.body)
      .then((updated) => {
        res.status(200).send(updated);
      });
  }

  /**
   * searchDocuments - Search list of documents by their title
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} Returns void
   */
  static searchDocuments(req, res) {
    const queryTerm = req.query.q;

    Documents.findAndCountAll({
      order: '"createdAt" DESC',
      where: { title: { $iLike: `%${queryTerm}%` } }
    })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error fetching documents with that term'
      });
    });
  }

  /**
   * Delete a particular document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {void} Returns void
   */
  static deleteDocument(req, res) {
    return req.body.document.destroy()
      .then(() => {
        res.status(200)
        .send({
          message: 'Document deleted successfully'
        });
      });
  }

}

export default DocumentsController;
