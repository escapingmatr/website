<template>
  <div class="signup">
    <div class="text">
      <h1>Create an Account</h1>
    </div>
    <div class="user-input">
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
    </div>
    <div class="buttons">
      <div class="submit">
        <p><button @click="register">Submit</button></p>
      </div>
      <div class="google">
        <p><button @click="signInWithGoogle">Sign In With Google</button></p>
      </div>
    </div>
  </div>
</template>

<script setup>
***REMOVED*** ref } from 'vue';
***REMOVED***
***REMOVED***
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
***REMOVED***
***REMOVED*** useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully registered!');
      router.push('/');
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
***REMOVED***
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push('/');
    })
    .catch((error) => {});
***REMOVED***
</script>

<style lang="scss" scoped>
.signup {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  // width: 100vw;
  // height: 100vh;
  // text-align: center; /* Center text and inline elements */

  .text {
    /* Add any text-related styling here */
  }

  .user-input {
    /* Add any input-related styling here */
  }

  .buttons {
    /* Add any button-related styling here */
    display: flex;
    .submit {
      margin: 5px;
    }
    .google {
      margin: 5px;
    }
  }
}
</style>
