import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import MainPage from './MainPage.vue';
import OtherPage from './OtherPage.vue';
import LoginPage from './LoginPage.vue';
import firebase from 'firebase';

console.clear();
console.log(new Date());

// TODO: Replace the following with your own keys from firebase.google.com
firebase.initializeApp({
  apiKey: "0ab96f46af51",
  authDomain: "abc027e0-51f82.firebaseapp.com",
  databaseURL: "https://abc027e0-51f82.firebaseio.com",
  projectId: "abc027e0-51f82",
  storageBucket: "abc027e0-51f82.appspot.com",
  messagingSenderId: "677d"
});

Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  el: '#app',
  render: h => h(App),
  router: new VueRouter({
    routes: [
      { path: '/', component: MainPage },
      { path: '/other', component: OtherPage },
      { path: '/login', component: LoginPage },
    ],
  }),
  store: new Vuex.Store({
    state: {
      user: null,
    },
    mutations: {
      setUser: function (state, _user) {
        state.user = _user;
      }
    },
  }),
  created: function () {
    console.log('Created...');
    console.log(firebase.auth().currentUser);
    var vm = this;
    firebase.auth().onAuthStateChanged(function (_user) {
      vm.$store.commit('setUser', _user);
      if (_user) {
        console.log('Firebase user: [' + _user.email + ']');
      } else {
        console.log('Firebase user: [' + 'Logged out' + ']');
      }
    });
  },
});


