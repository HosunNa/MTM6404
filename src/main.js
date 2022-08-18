import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import Contacts from './views/Contacts.vue'
import Contact from './views/Contact.vue'

import reset from '/reset.css'

const routes = [
    {
        path: '/',
        component: Contacts
    },
    {
        path: '/contact/:id',
        component: Contact,
        props: true
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

createApp(App).use(router).mount('#app')
