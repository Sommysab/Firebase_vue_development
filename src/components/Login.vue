<template>
    <div>
        <div class="container">
            <div class="col s12 m8 offset-m2">
                <div class="login card-panel green white-text center">
                    <h3>Login</h3>
                    <form>
                        <div class="input-field">
                            <i class="material-icons prefix">email</i>
                            <input type="text" id="email" v-model="email">
                            <label class="white-text" for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix">lock</i>
                            <input type="password" id="password" v-model="password">
                            <label class="white-text" for="password">Password</label>
                        </div>
                        <button v-on:click="login" class="btn btn-large grey lighten-4 black-text">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import store from 'store-js'

export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: function(e) {
            e.preventDefault()
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(data => { 
                store.set('currentUser', data.user.email)
                alert(`you are logged in as ${data.user.email}`)
                this.$router.go({path: this.$router.path})
            })
            .catch(e => alert(e.message))
        }
    }
}
</script>