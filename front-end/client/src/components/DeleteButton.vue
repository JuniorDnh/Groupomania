<template>
  <div>
    <i @click="deletePost" class="fas fa-trash"></i>
  </div>
</template>
<script>
export default {
  name: "DeleteButton",
  props: {
    postId: Number,
  },
  methods: {
    deletePost: async function () {
      let ok = confirm(
        "Êtes-vous sûr de vouloir supprimer cette publication ?"
      );

      if (ok) {
        return fetch(`http://localhost:5000/api/posts/${this.postId}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        })
          .then((responsehttp) => {
            return responsehttp.json();
          })
          .then(() => {
            this.getPosts();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getPosts() {
      this.$parent.getPosts();
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  cursor: pointer;
  color: red;
  float: right;
  padding: 1rem;
}
</style>
