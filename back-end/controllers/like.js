const db = require("../models");

exports.likePost = async (req, res, next) => {
  let userId = req.body.userId;
  let postId = req.body.postId;
  let alreadyLiked = await db.Like.findOne({
    where: {
      userId: req.body.userId,
      postId: req.body.postId,
    },
  }).then((data) => {
    return data;
  });
  if (alreadyLiked) {
    db.Post.decrement(
      //si l'utilisateur a déjà aimé -1 like sur ce post
      { likes: 1 },
      { where: { id: req.params.id } }
    );
    db.Like.destroy({
      where: {
        userId: userId,
        postId: postId,
      },
    })
      .then(() =>
        res.status(200).json({ message: "poste dislike avec succès" })
      )
      .catch((err) => res.status(400).json({ err }));
  } else {
    db.Post.increment({ likes: 1 }, { where: { id: req.params.id } });
    db.Like.create({ postId: postId, userId: userId })
      .then(() => res.status(200).json({ message: "poste like avec succès" }))
      .catch((err) => res.status(400).json({ err }));
  }
};

exports.getAllLikes = async (req, res, next) => {
  db.Like.findAll({
    include: [db.Post],
    where: {
      userId: req.params.userId,
    },
  })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(400).json({ err }));
};