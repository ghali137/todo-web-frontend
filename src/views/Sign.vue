<template>
	<div class=sign>
		
		<div v-if=login>
			<h1>Log In</h1>
			<input type="text" placeholder="Username" v-model="username">
			<input @keyup.enter="submit" type="password" placeholder="Password" v-model="password">
			<button @click=submit>Login</button>
		</div>
		
		<div v-if="login" class="change">
			<p>Don't have an account?</p>
			<button @click="login = !login">Register</button>
		</div>
		<div v-if="!login" class="change">
			<p>Have an account?</p>
			<button @click="login = !login">Log In</button>
		</div>
		
		<div v-if=!login>
			<h1>Register</h1>
			<input type="text" placeholder="Username" v-model="username">
			<input @keyup.enter="submit" type="password" placeholder="Password" v-model="password">
			<button id=register @click=submit>Register</button>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios'
	const url = 'http://localhost:8000/'
	
	export default {
		data() {
			return {
				login: true,
				username: "",
				password: "",
				
			}
		},
		
		methods: {
			submit({target}) {
				if (target.id === 'register') {
					axios.post(`${url}register/`, {
						username: this.username,
						password: this.password
					}).then(response => {
						axios.post(`${url}api-token-auth/`, {
							username: this.username,
							password: this.password
						}).then(response => {
							localStorage.setItem('token', response.data.token)
							window.location.href = '/'
						})
					})
				} else {
					axios.post(`${url}api-token-auth/`, {
						username: this.username,
						password: this.password
					}).then(response => {
						localStorage.setItem('token', response.data.token)
						window.location.href = '/'
					})
				}
			}
		},
		
		name: 'Sign'
	}
</script>

<style lang="scss">
	.change {
		margin-top: 40px;
		text-align: center;
	}
	.sign {
		margin-top: 5%;
		text-align: center;
		input {
			padding: 10px;
			border: 2px solid gray;
			border-radius: 6px;
			display: block;
			margin: auto;
			margin-bottom: 20px;
			height: 20px;
		}
	}
</style>