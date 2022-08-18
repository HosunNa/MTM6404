<template>
  <div class="modal__container">
    <div class="head__container">
      <div>
        <h1 class="title hide">Contacts Form</h1>
      </div>
      <div>
        <!-- + button code from the notebook demo in MTM6404 -->
        <button class="addContact__btn" @click="newForm = true">Add Contact</button>
      </div>
    </div>

    <router-view :key="$router.fullPath" />

    <div class="modal">
      <div class="inside">
        <div v-show="newForm" @submit.prevent="addContact">
          <div>
            <h2 class="new__form__title">New Contact</h2>
            <section class="type__info">
              <form>
                <label for="firstname">First Name</label>
                <input class="space" id="firstname" type="text" placeholder="Type first name here"
                v-model="firstName">
              </form>
              <form>
                <label for="lastname">Last Name</label>
                <input class="space" id="lastname" type="text" placeholder="Type last name here"
                v-model="lastName">
              </form>
              <form>
                <label for="email">Email Address</label>
                <input class="space" id="email" type="text" placeholder="Type email address here"
                v-model="email">
              </form>
              <form>
                <label for="phone">Phone Number</label>
                <input class="space" id="phone" type="text" placeholder="Type phone number here"
                v-model="phone">
              </form>
            </section>
          </div>

          <div>
            <button type="button" class="saveContact__btn"
              @click="addContact">Add Contact</button>
            <button type="button" class="cancelContact__btn"
              @click="cancelContact">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script> -->

<script>
import { collection, addDoc } from 'firebase/firestore'
import db from './db'

export default {
  data: function () {
    return {
      newForm: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }
  },
  methods: {
    addContact: async function () {
      const c = collection(db, 'contacts')

      const document = await addDoc(c, {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone
      })

      this.cancelContact()
      this.$router.push('/')
      // this.$router.push('/contact/' + document.id)
    },
    cancelContact: function () {
      this.newForm = false
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone = ''
    }
  }
}
</script>


<style>

  .head__container {
    display: flex;
    justify-content: space-between;
    margin: 50px 160px;
  }

  .title {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 52px;
    font-weight: 700;
  }

  .addContact__btn {
    background: rgb(61, 77, 255);
    color: white;
    margin: 70px 100px 0 0;
    width: 140px;
    height: 40px;
    border: none;
    border-radius: 3px;
    font-size: 18px;
  }

  .modal__container {
    z-index: 1;
  }

  .modal {
    position: absolute;
    bottom: 50px;
    left: 17.5%;
    margin: 120px;
  }

  .inside {
    background: rgb(204, 225, 247);
    /* width: 500px;
    height: 400px; */
  }

  .new__form__title {
    font-size: 28px;
    text-align: center;
    padding-top: 20px;
  }

  .type__info {
    padding: 30px;
  }

  .space {
    padding: 3px;
    margin: 3px 10px 18px 10px;
    width: 700px;
  }

  .saveContact__btn {
    background: rgb(46, 109, 255);
    color: white;
    margin: 50px 100px 30px 120px;
    border: none;
    border-radius: 3px;
    font-size: 18px;
    padding: 6px;
  }

  .cancelContact__btn {
    background: rgb(255, 46, 46);
    color: white;
    margin: 50px 80px 0 310px;
    border: none;
    border-radius: 3px;
    font-size: 18px;
    padding: 6px;
  }

</style>
