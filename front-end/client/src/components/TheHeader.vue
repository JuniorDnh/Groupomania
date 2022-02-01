<template>
  <header>
    <div>
      <router-link to="/main" class="link">
        <img
          src="../assets/icon-left-font-monochrome-black.png"
          alt="logo groupomania"
        />
      </router-link>
    </div>
    <nav>
      <ul>
        <router-link to="/team" class="link header-link">
          <li class="header-link">
            <i class="fas fa-users"></i><span class="legende">Equipe</span>
          </li>
        </router-link>

        <router-link to="/userInfos" class="link">
          <li v-if="user.imageProfile">
            <img :src="user.imageProfile" alt="Profil" class="profil-picture" />
          </li>
          <li v-else>
            <img
              src="../assets/anonymous.png"
              alt="anonymous photo de profil"
              class="profil-picture"
            />
          </li>
        </router-link>

        <router-link to="/" class="link header-link">
          <li class="header-link" @click="clearStorage">
            <i class="fas fa-power-off" @click="clearStorage"></i
            ><span class="legende"></span>
          </li>
        </router-link>
      </ul>
    </nav>
  </header>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "TheHeader",
  computed: {
    ...mapState(["user"]),
  },
  props: {
    imageSrc: String,
  },
  methods: {
    clearStorage(e) {
      e.preventDefault();

      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss">
header {
  
  z-index: 5;
  background: rgb(253, 45, 1);
  background: linear-gradient(
    90deg,
    rgba(253, 45, 1, 1) 0%,
    rgba(255, 215, 215, 1) 100%,
    rgba(253, 45, 1, 1) 100%
  );
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 2rem;
  height: 7rem;
  .link {
    text-decoration: none;
    color: #444040;
  }
  .header-link {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 260px;
    margin-left: 2rem;
    margin-top: -4.5rem;
  }
  ul {
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0 2rem 0 0;
    margin-top: 0.4em;
    li {
      padding: 1rem;
      transition: transform 0.3s;

      .legende {
        font-size: 50%;
        display: none;
        margin-top: 0rem;
      }
      &:hover {
        transform: scale(1.1);
        transition: transform 0.3s;
        .legende {
          display: flex;
        }
      }
      .profil-picture {
        width: 3.5rem;
        height: 3.5rem;
        object-fit: cover;
        margin-top: 0;
        margin-left: 0;
        border-radius: 1.5em;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  header {
    position: fixed;
    flex-direction: column;
    padding: 0;
    height: 8rem;
    img {
      padding: 0;
      margin-top: -6rem;
      @media screen and (max-width: 350px) {
        width: 6rem;
        margin-top: -2rem;
      }
    }
    ul {
      justify-content: center;
      margin-top: -9rem;
    }
  }
}
</style>
