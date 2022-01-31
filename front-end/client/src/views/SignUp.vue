<!--section où le nouvel utilisateur peut créer un compte -->

<template>
  <div class="first-page">
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Bienvenue sur Groupomania</h1>
      <h2>Inscription</h2>
      <form>
        <label for="email">Email</label>
        <input
          type="email"
          placeholder="Adresse email"
          v-model="email"
          name="email"
          id="email"
          required
        />
        <label for="usernameSignup">Nom d'utilisateur</label>
        <input
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          v-model="username"
          name="usernameSignup"
          id="usernameSignup"
          required
        />
        <label for="passwordSignup">Mot de passe</label>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          v-model="password"
          name="passwordSignup"
          id="passwordSignup"
        />
        <label for="confirmePassword">Confirmez le mot de passe</label>
        <input
          type="password"
          placeholder="Entrez votre à nouveau votre mot de passe"
          v-model="confirmedPassword"
          name="confirmePassword"
          id="confirmePassword"
        />
        <button @click="signIn">Confirmer l'inscription</button>
      </form>
      <p class="errorMessage">{{ errorMessage }}</p>
      <router-link to="/" class="link"
        >Déjà inscrit ? Cliquez ici pour vous connecter.
      </router-link>
    </div>
    <div class="home-picture">
      <img src="../assets\icon-above-font-remove.png" alt="social media png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data: function () {
    return {
      email: "",
      username: "",
      password: "",
      confirmedPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    signIn: async function (event) {
      event.preventDefault();
      let validEmail = new RegExp(
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!validEmail.test(this.email)) {
        this.errorMessage = "Merci de renseigner une addresse email valide";
      } else if (this.password.length < 8) {
        this.errorMessage = "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 caractère spécial";
      } else if (this.username.length < 3) {
        this.errorMessage = "Le nom d'utilisateur doit contenir au moins 3 caractères";
      } else if (
        this.username != "" &&
        this.email != "" &&
        this.password != "" &&
        this.confirmedPassword === this.password
      ) {
        this.$store
          .dispatch("createAccount", {
            email: this.email,
            username: this.username,
            password: this.password,
          })
          .then(() => {
            if (this.$store.state.status === "error_login") {
              this.errorMessage =
                "L'email ou le nom d'utilisation est déjà utilisé";
            }
          });
      } else if (this.confirmedPassword != this.password) {
        this.errorMessage = "Le mot de passe ne correspond pas";
      } else {
        this.errorMessage = "Veuillez remplir tous les champs";
      }
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
  .errorMessage {
    color: rgb(203, 21, 21);
    font-size: 90%;
  }
  margin-top: 8rem;
  padding-top: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 45rem;
  align-items: center;
  border: solid 2px rgba(0, 0, 0, 0.356);
  
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.192);
  img {
    width: 80px;
  }
  form {
    display: flex;
    flex-direction: column;
    input {
      margin-top: 0.5em;
      width: 16rem;
      height: 2rem;
    }
    button {
      margin-top: 1rem;
      background-color: #ffd7d7;
      height: 4rem;
      cursor: pointer;
    }
  }
}
.home-picture {
  img {
    width: 550px;
    margin-top: 10rem;
    padding-top: 1rem;
  }
}
.link {
  padding-top: 1rem;
  padding-bottom: 20rem;
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
