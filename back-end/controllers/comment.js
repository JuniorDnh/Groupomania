const db = require("../models");

//écrire un commentaire
exports.createComment = async (req, res, next) => {
  const newComment = await db.Comment.create({
    content: req.body.content,
    userId: req.body.userId,
    postId: req.body.postId,
  });
  db.Post.increment({ comments: 1 }, { where: { id: req.params.id } })
    .then(() =>
      res.status(201).json({ message: "commentaire posté avec succès" })
    )
    .catch((err) => res.status(400).json({ err }));
};

//voir un commentaire
exports.getComment = async (req, res, next) => {
  await db.Comment.findAll({
    include: [db.User],
    where: {
      postId: req.params.id,
    },
  })
    .then((comments) => res.status(201).json({ comments }))
    .catch((err) => res.status(400).json({ err }));
};

//supprimer un commentaire
exports.deleteComment = async (req, res, next) => {
  db.Post.decrement({ comments: 1 }, { where: { id: req.body.postId } });
  db.Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(201).json({ message: "commentaire supprimé avec succès" })
    )
    .catch((err) => res.status(400).json({ err }));
};