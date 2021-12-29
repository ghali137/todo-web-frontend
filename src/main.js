import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Sign from './views/Sign.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/', name: 'Home', component: Home},
		{path: '/sign/', name: 'Sign', component: Sign},
	]
})

createApp(App).use(router).mount('#app')
