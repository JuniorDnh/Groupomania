<!--section où nous pouvons voir le profil de l'utilisateur-->

<template>
  <div class="user-infos">
    <TheHeader userName="$user.username"></TheHeader>
    <h1>Mon profil :</h1>
    <div class="info-container">
      <div class="image-details">
        <h2>Photo de Profil</h2>
        <img
          v-if="user.imageProfile"
          :src="user.imageProfile"
          alt="photo de profil"
          class="profil-picture"
        />
        <img
          v-else
          src="../assets/anonymous.png"
          alt="no picture"
          class="profil-picture"
        />
        <form action="">
          <label v-if="user.imageProfile" for="avatar"
            >Modifier votre photo de profil
          </label>
          <label v-else for="avatar">Choisissez votre photo de profil: </label>

          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            class="btn"
          />
          <br /><br />
          <input
            type="submit"
            @click="changeImage"
            class="btn btn-submit"
            value="Appliquer"
          />
        </form>
      </div>

      <div class="details">
        <h2>Détails du profil</h2>

        <h3>
          {{ user.username }}
        </h3>

        <div class="select-role">
          <label>Profession: </label>
          <select type="select" class="select">
            <option valeur="default">{{ this.$store.state.user.role }}</option>
            <option valeur="ow">Employé de bureau</option>
            <option valeur="hr">Ressource humaine</option>
            <option valeur="ac">Comptabilité</option>
            <option valeur="Man">Manager</option>
            <option valeur="Man">Responsable</option>
          </select>
        </div>
        <br />
        <br />
        <form action="" class="bio">
          <label for="#username" class="bio-title">Biographie : </label>
          <br />
          <p v-if="this.$store.state.user.bio != 'null'">
            {{ this.$store.state.user.bio }}
          </p>
          <label for="textarea">Editez votre biographie</label>
          <textarea name="bio" id="textarea" cols="55" rows="7" v-model="bio">
          </textarea>
          <br />
          <input
            type="submit"
            class="btn btn-submit2"
            value="Enregistrer"
            @click="changeImage"
          />
        </form>
        <br />
        <button class="danger" @click="deleteAccount">
          Supprimer ce compte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      image: "",
      bio: "",
    };
  },
  components: {
    TheHeader: TheHeader,
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted: function () {
    this.getUserInfo();
    if (  
      this.$store.state.user.userId === -1 ||
      this.$store.state.user.userId == undefined
    ) {
      this.$router.push("/");
      return;
    }
  },
  methods: {
    changeImage: function (event) { 
      event.preventDefault();
      this.$store
        .dispatch("changeInfos", {
          userId: this.$store.state.user.userId,
          image: document.querySelector("input[type=file]").files[0],
          bio: this.bio || this.$store.state.user.bio,
          role: document.querySelector(".select").value,
        })
        .then(() => {
          this.getUserInfo();
        });
    },
    getUserInfo: async function () {
      let userId = this.$store.state.user.userId;
      this.$store.dispatch("getOneUserInfos", userId);
    },
    deleteAccount: async function () {
      let confirmation = confirm(
        "Êtes-vous sûr de vouloir supprimer ce compte ? Toutes vos publications, photos et informations seront supprimés."
      );

      if (confirmation) {
        let userId = this.$store.state.user.userId;
        this.$store
          .dispatch("deleteAccount", userId)
          .then(this.$store.commit("logout"))
          .then(this.$router.push("/"));
      }
    },
  },
};
</script>
<style lang="scss" scoped=true>
$color-primary: #ffd7d7;
$color-secondary: #ffd7d7;
.user-infos {
  width: 100%;
  h1 {
    padding-top: 8rem;
  }
}
.info-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .image-details { 
    border-radius: 10px;
    padding: 2rem;
    margin-left: 3rem;
    background-color: white;
    height: 500px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    img {
      max-width: 20rem;
      max-height: 20rem;
    }
    form {
      padding-top: 2rem;
    }
  }
  .details { 
    
    border-radius: 10px;
    padding: 2rem;
    margin-right: 5rem;
    background-color: white;
    height: 500px;
    width: 450px;
    border-left: rgba(128, 128, 128, 0.493) 1px solid;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    @media screen and (max-width: 900px) {
      width: 420px;
      border-radius: 0;
      margin-left: 5rem;
    }
    @media screen and (max-width: 500px) {
      width: 250px;
      margin-right: 5rem;
    }

    #username {
      height: 2rem;
      border-radius: 10px;
      font-weight: bold;
      font-size: 1rem;
    }
    .select-role {
      padding-top: 1rem;
      float: left;
      .select {
        font-size: 105%;
      }
    }
    .bio {
      
      padding-top: 0.3rem;
    }
    .bio-title {
      color: #ff5b5b;
    }
    p {
      background: #ffd7d7;
      border-radius: 6px;
      border: solid 2px black;
    }
  }
  .danger {
    background-color: rgb(155, 22, 22);
    height: 2rem;
    border-radius: 20px;
    float: right;
    color: white;
  }
}

@media screen and (max-width: 900px) {
  .info-container {
    flex-direction: column;
    margin: 0;
    .image-details {
      margin-left: 0rem;
      margin-right: 0;
    }
    #textarea {
      width: 150px;
    }
  }
}

@media screen and (max-width: 500px) {
  .image-details {
    width: 250px;
    img {
      width: 10rem;
    }
  }
}
</style>
