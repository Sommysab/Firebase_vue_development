<template>
    <nav>
        <div class="nav-wrapper green">
            <div class="container">
                <router-link to="/" class="brand-logo">
                    Employee Manager
                </router-link>
                <ul class="right">
                    <li v-if="isLoggedIn">
                        <span class="email black-text">{{currentUser}}</span>
                    </li>
                    <li v-if="isLoggedIn">
                        <router-link to="/">Dashboard</router-link>
                    </li>
                    <li v-if="!isLoggedIn">
                        <router-link to="/login">Login</router-link>
                    </li>
                    <li v-if="!isLoggedIn">
                        <router-link to="/register">Register</router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <button v-on:click="logout" class="btn black">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase'
import store from 'store-js'

export default {
    name: 'navbar',
    data: function (){
        return  {
            isLoggedIn: false,
            currentUser: false
        }
    },
    created(){
        
        if(store.get('currentUser')){
            this.isLoggedIn = true
            this.currentUser = store.get('currentUser')
        }
    },
    methods: {
        logout: function() {             
            firebase.auth().signOut().then(() => {
                store.remove('currentUser')
                this.$router.go({path: this.$router.path})
            })
        }
    }
}
</script>

<style scoped>
    .email {
        padding-right: 10px
    }
</style>