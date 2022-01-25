const db = require("../models");
const fs = require("fs");

//créer un poste
exports.create = async (req, res, next) => {
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const newPost = await db.Post.create({
      content: req.body.content,
      userId: req.body.userId,
      username: req.body.username,
      image: imageUrl,
      likes: 0,
    });
  } else {
    await db.Post.create({
      content: req.body.content,
      userId: req.body.userId,
      username: req.body.username,
      likes: 0,
    });
  }
  try {
    res.status(201).json({ message: "poste créé avec succès" });
  } catch {
    (err) => res.status(400).json({ err });
  }
};

//Voir tous les messages

exports.getAllPosts = async (req, res, next) => {
  db.Post.findAll({
    include: [db.Like, db.User],
  })
    .then((posts) => res.status(200).json({ posts }))
    .catch((err) => res.status(400).json({ err }));
};

//pour n'afficher qu'un seul message sélectionné
exports.getOnePost = (req, res, next) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
  })

    .then((post) => res.status(200).json({ post }))
    .catch((err) => res.status(400).json({ err }));
};

//update un message
exports.updateOnePost = (req, res, next) => {
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    db.Post.update({ image: imageUrl }, { where: { id: req.params.id } });
  }
  db.Post.update(
    { content: req.body.content },
    { where: { id: req.params.id } }
  )
    .then((post) => res.status(200).json({ post }))
    .catch((err) => res.status(400).json({ err }));
};

//delete un poste
exports.deletePost = async (req, res, next) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (post.image) {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          db.Post.destroy({
            where: {
              id: req.params.id,
            },
          });
        });
      } else {
        db.Post.destroy({
          where: {
            id: req.params.id,
          },
        });
      }
    })

    .then(() => res.status(200).json({ message: "message supprimé avec succès" }))
    .catch((err) => res.status(400).json({ err }));
};

//like un poste
exports.likePost = async (req, res) => {
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