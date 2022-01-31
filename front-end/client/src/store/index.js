import { createStore } from "vuex";
import router from "../router/index";
import ls from 'localstorage-slim'; //cryptage des donnes dans le localstorage
ls.config.encrypt = true;

const axios = require("axios");
const instance = axios.create({        //installation de l'URL de base
  baseURL: "http://localhost:5000/api",
});

let user = ls.get("user");

if (!user) {
  //s'il n'y a rien dans le stockage local alors l'ID utilisateur par défaut est -1
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    instance.defaults.headers.common["Authorization"] = user.accessToken;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

export default createStore({
  //créer un store avec user lors de la connexion
  state: {
    status: "",
    user: {
      userId: user.id,
      username: user.username,
      token: user.accessToken,
      imageProfile: user.imageUrl,
      bio: user.bio,
      role: user.role,
      isAdmin: user.isAdmin,
    },
    
    commentFromPost: [],
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: async function (state, user) {
      state.user = {};

      instance.defaults.headers.common["Authorization"] = user.accessToken;
      ls.set("user", user); //cryptage des donnes dans le localstorage

      state.user.userId = user.id;
      state.user.username = user.username;
      state.user.token = user.accessToken;
      state.user.imageProfile = user.imageUrl;
      state.user.isAdmin = user.isAdmin;
    },
    changeInfo: function (state, infos) {
      if (infos.image != null) {
        let user = ls.get("user");
        user.imageUrl = infos.image;
        ls.set("user", user);
      }

      state.user.imageProfile = infos.image;
      state.user.bio = infos.bio;
      state.user.role = infos.role;
    },
    logout: function (state) {
      state.user = {}; //Lors de la déconnexion, nous modifions le userId pour qu'il redevienne -1.
      state.user = {
        userId: -1,
        username: "",
        token: "",
        imageProfile: "",
      };
      localStorage.clear(); //supprime tout du localstorage
    },

    
  showComments: function (state, comments) {
      state.commentFromPost = comments;
    },
  },
  actions: {
    createAccount: async ({ commit }, userInfos) => {
      commit;
      instance
        .post("/user/register", userInfos)
        .then((response) => {
          commit("setStatus", "connected");
          response.data.bpi;
        })
        .then(() => {
          instance
            .post("/user/login", userInfos)
            .then((response) => {
              commit("setStatus", "connected");
              commit("logUser", response.data);
              response.data.bpi;
            })
            .then(() => {
              router.push("/main");
              user = ls.get("user");
            });
        })
        .catch((err) => {
          commit("setStatus", "error_login");
          console.log(err);
        });
    },
    loginAccount: async ({ commit }, userInfos) => {
      await instance
        .post("/user/login", userInfos)
        .then((response) => {
          commit("logUser", response.data);
          response.data.bpi;
        })
        .then(() => {
          user = ls.get("user");
        })
        .catch((err) => {
          commit("setStatus", "error_login");
          console.log(err);
        });
    },
    changeInfos: async ({ commit }, userInfos) => {
      commit;
      const formData = new FormData();
      let userId = userInfos.userId;
      let imageFile = userInfos.image;
      let bio = userInfos.bio;
      let role = userInfos.role;
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("userId", userId);
      formData.append("bio", bio);
      formData.append("role", role);
      await instance
        .put("/user/userInfo", formData, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((response) => {
          response.data.bpi;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    postComment: async ({ commit }, commentInfos) => {
      commit;
      await instance
        .post(`/posts/${commentInfos.postId}/comment`, commentInfos, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((response) => {
          response.data.bpi;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getOneUserInfos: async ({ commit }, userId) => {
      commit;                                        //fonction pour obtenir les informations de l'utilisateur
      await instance
        .get(`/user/userInfo/${userId}`)
        .then((response) => {
          commit("changeInfo", response.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteAccount: async ({ commit }, userId) => {
      commit;
      await instance
        .delete(`/user/userInfo/${userId}`, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((response) => {
          response.data.bpi;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changePost: async ({ commit }, postInfos) => {
      commit;
      const formData = new FormData();
      let postId = postInfos.postId;
      let imageFile = postInfos.image;
      let content = postInfos.content;

      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("postId", postId);
      formData.append("content", content);

      await instance
        .put(`/posts/${postInfos.postId}`, formData, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((response) => {
          response.data.bpi;
        });
    },
    logout: async ({ commit }) => {
      commit("logout");
    },
  },

  modules: {},
});
