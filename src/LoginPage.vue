<template>
  <div>
    <h2>Login</h2>
    <button @click.prevent="login">Login</button>
    <button @click.prevent="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  methods: {
    login: function() {
      console.log('Logging in...');
      var email = 'a@b.com';
      var password = 'aaaaaa';
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(e) {
          console.log('Error logging in: ['+ e +']');
        });
    },
    logout: function() {
      console.log('Logging out...');
      firebase.auth().signOut();
    }
  },
}

</script>

