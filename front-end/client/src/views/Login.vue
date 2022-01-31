<!--première page de l'application, où les utilisateurs peuvent se connecter-->
<template>
  <div class="first-page">
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Bienvenue sur Groupomania</h1>
      <h2>Connectez-vous</h2>
      <form>
        <label for="username">Nom d'utilisateur</label>
        <input
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          v-model="username"
          name="username"
          id="username"
        />
        <label for="password">Mot de passe</label>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          v-model="password"
          name="password"
          id="password"
        />
        <button @click="login">Connexion</button>
        <p class="incorrect-password">{{ incorrectInfos }}</p>
      </form>
      <router-link to="/signUp" class="link">Inscrivez-vous ici ! </router-link>
    </div>
    <div class="home-picture">
      <img src="../assets\icon-above-font-remove.png" alt="social media png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: "",
      incorrectInfos: "",
    };
  },

  methods: {
    login: function (event) {
      event.preventDefault();
      this.$store
        .dispatch("loginAccount", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          if (
            this.$store.state.user.userId !== -1 ||
            !this.store.state.user.userId
          ) {
            this.$router.push("/main");
            return;
          }
        })
        .catch(() => {
          console.log("error");
          this.incorrectInfos = "Nom d'utilisateur ou mot de passe incorrect";
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.first-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.home {
  img {
    width: 80px;
  }
  margin-top: 8rem;
  padding-top: 1rem;
  background-color: white;

  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 35rem;
  align-items: center;

  border: solid 2px rgba(0, 0, 0, 0.356);

  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.192);
  form {
    display: flex;
    flex-direction: column;
    input {
      width: 16rem;
      height: 2rem;
      margin-top: 0.5em;
    }

    button {
      margin-top: 1rem;
      background-color: #ffd7d7;
      height: 4rem;
      cursor: pointer;
    }
  }
}
.incorrect-password {
  color: rgb(203, 21, 21);
  font-size: 90%;
}

.home-picture {
  img {
    width: 550px;
    margin-top: 10rem;
    padding-top: 1rem;
  }
}
@media screen and (max-width: 1150px) {
  .first-page {
    grid-template-columns: 1fr;
  }
  .home-picture {
    display: none;
  }
}

@media screen and (max-width: 520px) {
  .home {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 60rem;
    border: none;
    box-shadow: none;
    background-color: rgba($color: #f3f8ee, $alpha: 1);
  }
}
</style>
