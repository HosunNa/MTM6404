<template>
    <div>
        
        <section class="personal__info">

            <router-link to="/" class="back__link">	&#60; back</router-link>
            <button type="button" class="edit__btn"
            @click="editForm = true">edit</button>

            <form>
                <h3>Name</h3>
                <h3 class="personalInfo__font">{{ firstName }} {{ lastName }}</h3>
            </form>
            <form>
                <h3>Email Address</h3>
                <h3 class="personalInfo__font">{{ email }}</h3>
            </form>
            <form>
                <h3>Phone Number</h3>
                <h3 class="personalInfo__font">{{ phone }}</h3>
            </form>
        </section>

        <div>
            <section class="edit__form">
                <div v-show="editForm"
                @submit.prevent="updateContact">
                    <div class="editForm__container">
                        <form>
                            <label for="firstname">First Name</label>
                            <div>
                                <input class="personalInfo__space" id="firstname" type="text" placeholder="Type first name here"
                            v-model="firstName">
                            </div>
                        </form>
                        <form>
                            <label for="lastname">Last Name</label>
                            <div>
                                <input class="personalInfo__space" id="lastname" type="text" placeholder="Type last name here"
                            v-model="lastName">
                            </div>
                        </form>
                        <form>
                            <label for="email">Email Address</label>
                            <div>
                                <input class="personalInfo__space" id="email" type="text" placeholder="Type email address here"
                            v-model="email">
                            </div>
                        </form>
                        <form>
                            <label for="phone">Phone Number</label>
                            <div>
                                <input class="personalInfo__space" id="phone" type="text" placeholder="Type phone number here"
                            v-model="phone">
                            </div>
                        </form>
                    </div>

                    <div>              
                        <button type="submit" class="update__btn"
                            @click="updateContact">Update Contact</button>
                        <router-link to="/">Cancel</router-link>
                        <button type="button" class="delete__btn"
                            @click="deleteContact">Delete Contact</button>
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>

<script>
    import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
    import db from '../db.js'

    export default {
        name: 'Contact',
        props: ['id'],
        data: function () {
            return {
                editForm: false,
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            }
        },
        created: async function () {
            const d = doc(db, 'contacts', this.id)

            const document = await getDoc(d)

            if (document.exists()) {
                this.firstName = document.data().firstName,
                this.lastName = document.data().lastName,
                this.email = document.data().email,
                this.phone = document.data().phone
            }
        },
        methods: {
            getContact: function () {

            },
            updateContact: async function () {
                const d = doc(db, 'contacts', this.id)

                await updateDoc(d, {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phone: this.phone
                })
                
                this.$router.push('/')
            },
            deleteContact: async function () {
                const d = doc(db, 'contacts', this.id)

                await deleteDoc(d)

                this.$router.push('/')
            }
        }
    }
</script>

<style>

    .personal__info {
        background: rgb(242, 242, 242);
        margin: auto;
        font-size: 22px;
        padding: 10px;
        width: 800px;
    }

    .personalInfo__font {
        margin-top: 6px;
        margin-bottom: 30px;
        font-weight: 600;
        font-size: 28px;
    }
    
    .back__link {
        padding-left: 50px
    }

    .edit__btn {
        background: rgb(61, 77, 255);
        color: white;
        margin: 14px 0px 20px 500px;
        width: 140px;
        height: 40px;
        border: none;
        border-radius: 3px;
        font-size: 18px;
    }

    .edit__form {
        background: rgb(204, 225, 247);
        width: 800px;
        margin: auto;
        margin-top: 60px;
    }

    .personalInfo__space {
        padding: 3px;
        margin: 3px 10px 18px 10px;
        width: 400px;
    }

    .editForm__container {
        display: flex;
        flex-direction: column;
        padding-left: 200px;
        padding-top: 30px;
    }

    .update__btn {
        background: rgb(46, 109, 255);
        color: white;
        margin: 50px 100px 30px 120px;
        border: none;
        border-radius: 3px;
        font-size: 18px;
        padding: 6px;
    }

    .delete__btn {
        background: rgb(255, 46, 46);
        color: white;
        margin: 50px 80px 0 160px;
        border: none;
        border-radius: 3px;
        font-size: 18px;
        padding: 6px;
    }
</style>