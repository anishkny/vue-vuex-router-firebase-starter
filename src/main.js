import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import App from './App.vue'
import MainPage from './MainPage.vue'
import OtherPage from './OtherPage.vue'
import LoginPage from './LoginPage.vue'
import firebase from 'firebase';

console.clear();
console.log(new Date());

firebase.initializeApp({
  apiKey: "AIzaSyALtQZnNF14_btkXzeJh7mhTc515aDw3Qw",
  authDomain: "namasteworld-51f82.firebaseapp.com",
  databaseURL: "https://namasteworld-51f82.firebaseio.com",
  projectId: "namasteworld-51f82",
  storageBucket: "namasteworld-51f82.appspot.com",
  messagingSenderId: "899946482077"
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


