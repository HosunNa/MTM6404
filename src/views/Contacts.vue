<template>
    <section class="form">
        <div>
            <h1 class="body__title">Contact List</h1>
        </div>
        
        <div v-for="contact in contacts"
        :key="contact.id">
            <router-link
            v-bind:to="'/contact/' + contact.id">
                <div>
                    <div class="name">{{ contact.firstName }} {{ contact.lastName }}</div>
                        <!-- <div class="email">{{ contact.email }}</div>
                        <div class="phone">{{ contact.phone }}</div> -->
                    
                </div>
            </router-link>    
        </div>
    </section>
</template>

<script>
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore'
import db from '../db.js'

export default {
    name: 'Contacts',
    data: function () {
        return {
            contacts: []
        }
    },
    created: function () {
        const q = query(collection(db, 'contacts'), orderBy('lastName'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = []

            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName
                    // email: doc.data().email,
                    // phone: doc.data().phone
                })
            })

            this.contacts = data
        })
    }
}

</script>

<style>

    .body__title {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 46px;
        font-weight: 600;
        margin: 20px;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 0 30px 0;
        width: 1200px;
        margin: 100px auto;
        background: rgb(242, 242, 242);
        align-items: center;
    }

    .name {
        font-size: 22px;
        margin: 10px;
        padding: 10px;
        background: rgb(255, 255, 255);
        color: black;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-weight: 600;
        border: 3px solid rgba(215, 234, 255, 0.447);
        width: 800px;
    }

    /* .box {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 5px;
        font-size: 16px;
        justify-content: center;
        margin: 0 100px 0;
    
    }

    .boxList{
        border: 1.5px solid rgb(198, 232, 250);
        margin: 20px;
        text-align: center;
        

    }

  

    .name{
        font-size: 22px;
        margin-bottom: 10px;
        background: rgb(210, 232, 255);
        padding: 5px 0;
    }

    .email{
       
    }

    .phone{
        
    } */

</style>