<!--MAIN section avec le "mur" et tous les messages des différents utilisateurs-->
<template>
  <div class="main-page">
    <TheHeader userName="$user.username"></TheHeader>
    <section class="content">
      <div class="the-wall">
        <form action="">
          <input
            type="text"
            :placeholder="'Quoi de neuf,' + ' ' + user.username + ' ' + '?'"
            class="write-post"
            v-model="newPost"
            id="post"
            aria-label="post"
          />

          <label class="custom-button">
            <p>Ajoutez une image</p>
            <input
              type="file"
              id="post-picture"
              name="postPicture"
              accept="image/png, image/jpeg, image/gif"
              aria-label="post"
            />
            <i class="far fa-image"></i>
          </label>

          <br />
          <input
            type="submit"
            @click="postPost"
            class="btn-submit"
            value="Publier"
          />
        </form>
        <p class="error-message">{{ errorMessage }}</p>

        <div>
          <br /><br />

          <ul>
            <li
              v-for="post in posts.slice().reverse()"
              :key="post.content"
              class="post"
            >
              <div>
                <div class="author">
                  <div class="author-info">
                    <img
                      v-if="post.User.image"
                      :src="post.User.image"
                      alt="photo de profil"
                      class="profile-pic"
                    />
                    <h3>
                      Publication de :
                      <span class="user-signature">{{
                        post.User.username
                      }}</span>
                    </h3>
                  </div>
                  <p class="date">{{ moment(post.createdAt).fromNow() }}</p>
                </div>
                <img v-if="post.image" :src="post.image" alt="" />
                <p>{{ post.content }}</p>

                <div class="icones">
                  <div class="comment">
                    <Comment :postId="post.id"></Comment>
                    <span class="comment-number">{{ post.comments }}</span>
                  </div>
                  
                </div>
                <div
                  v-if="
                    this.$store.state.user.userId === post.User.id ||
                    this.$store.state.user.isAdmin
                  "
                  class="personal-icone"
                >
                  <router-link
                    :to="{ name: 'Modification', params: { postId: post.id } }"
                    class="link button-pencil"
                  >
                    Modifiez votre Publication
                    <i class="fas fa-user-edit"></i>
                  </router-link>
                  <Delete-button :postId="post.id"></Delete-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import { mapState } from "vuex";
import moment from "moment";
import DeleteButton from "../components/DeleteButton.vue";
import Comment from "../components/Comment.vue";


export default {
  components: {
    TheHeader: TheHeader,
    DeleteButton: DeleteButton,
    
    Comment: Comment,
    
  },
  mounted: async function () {
    this.getPosts();
    if (
      this.$store.state.user.userId === -1 ||
      this.$store.state.user.userId == undefined
    ) {
      this.$router.push("/");
      return;
    }
  },

  data() {
    return {
      posts: [],
      newPost: "",
      postId: 0,
      moment: moment,
      isHidden: true,
      errorMessage: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getPosts: async function () {
      await fetch("http://localhost:5000/api/posts")
        .then((responsehttp) => {
          return responsehttp.json();
        })
        .then((data) => {
          this.posts = data.posts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    postPost: async function (event) {
      event.preventDefault();
      const imageFile = document.querySelector("input[type=file]").files[0];
      if (this.newPost != "" || imageFile) {
        const formData = new FormData();

        formData.append("content", this.newPost);
        formData.append("userId", this.$store.state.user.userId);
        formData.append("username", this.$store.state.user.username);
        if (imageFile) {
          formData.append("image", imageFile);
        }

        await fetch("http://localhost:5000/api/posts", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        });
      } else {
        this.errorMessage = "A post cannot be empty";
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }

      this.newPost = "";
      this.getPosts();
    },

    getComments() {
      this.$Comment.getComments();
    },
  },
};
</script>

<style lang="scss" scoped>
$color-primary: #ffd7d7;
$color-secondary: #ffd7d7;
.main-page {
  width: 100%;
  .content {
    width: 100%;
    list-style: none;
  }

  .error-message {
    color: red;
  }
  .write-post {
    width: 35rem;
    margin-top: 10rem;
    height: 3rem;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
  input[type="file"] {
    display: none;
  }
  .custom-button {
    p {
      margin-top: -1rem;
    }

    i {
      font-size: 250%;
      margin-top: -2rem;
      margin-bottom: 1.5rem;
      color: $color-primary;
      &:hover {
        cursor: pointer;
      }
    }
  }

  li {
    list-style: none;
    padding: 0;
    width: 700px;
    border-radius: 10px;
    img {
      width: 700px;
      max-height: 500px;
      object-fit: cover;
    }
  }
  .post {
    position: relative;
    padding-bottom: 3rem;
    border: solid 2px rgba(39, 44, 39, 0.404);
    margin: auto;
    margin-top: 1.5rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    .icones {
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 2;
      i {
        padding: 1rem;
        font-size: 150%;
        &:hover {
          cursor: pointer;
        }
      }
      
      .comment-number {
        padding-top: 1.5rem;
        margin-left: -0.9rem;
        font-size: 75%;
        position: absolute;
        left: 305px;
        top: 2px;
      }
    }
  }
  .signature {
    float: right;
    padding-right: 1rem;
  }
  .author {
    display: flex;
    justify-content: space-between;
    background: #ffd7d7;
    border-radius:10px 10px 0 0 ;
    .author-info {
      display: flex;
      h3 {
        padding: 1rem;
        font-style: italic;
        text-decoration: underline;
      }
    }
    .date {
      font-weight: lighter;
      padding: 1rem;
      font-style: italic;
      font-size: 80%;
    }
  }
  .profile-pic {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 15em;
    padding: 0.5rem;
  }
  .user-signature {
    color: #4055ef;
    padding-bottom: 2rem;
  }

  .comment {
    margin-top: 3rem;
    background: rgba(255, 255, 255, 0.103);
  }
  .button-pencil {
    position: absolute;
    padding-top: 0.7rem;
    right: 50px;
    color: #363433;
  }
}

@media screen and (max-width: 800px) {
  
  .comment-number {
    display: none;
  }

  .main-page {
    

    li {
      width: 500px;

      img {
        width: 500px;
      }
      @media screen and (max-width: 600px) {
        width: 400px;

        img {
          width: 400px;
        }
        
      }
      @media screen and (max-width: 500px) {
        width: 300px;
        

        img {
          width: 300px;
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .main-page {
    .write-post {
      width: 25rem;
    }
  }
}

@media screen and (max-width: 450px) {
  .main-page {
    .write-post {
      width: 15rem;
    }
  }
}
</style>
