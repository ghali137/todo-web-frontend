<template>
  <div class="home">
    <router-link to="/sign/">Login</router-link>
    <h1>To do</h1>
    <table>
      <tr v-for="item in list" :key="item.pk">
        <td id=title :title="item.detail">{{item.title}}</td>
        <td><span style="font-size: 30px;" @click="remove(item)" class="material-icons">&#xe14c;</span></td>
      </tr>
    </table>
    <span :style="visible ? 'transform: rotate(-45deg);' : ''" @click="toggle" id=create class="material-icons">&#xe145;</span>
    <transition name=resize>
      <form v-show="visible" @submit.prevent="add" id=add ref=add>
        <label for="title">Title</label>
        <input type="text" placeholder="Title" ref=title name=title>

        <label for="detail">Detail (if needed)</label>
        <textarea placeholder="Detail" form=add name=detail></textarea>

        <button type="submit"><span id=create class="material-icons">&#xe145;</span></button>
      </form>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'
  const url = 'http://localhost:8000/'

  // @ is an alias to /src
  export default {
    methods: {
      toggle() {
        this.visible = !this.visible
        setTimeout(() => {this.$refs.title.focus()}, 1)
      },
      remove(item) {
        axios.delete(`${url}${item.pk}/`, { 'headers': { Authorization: `Token ${localStorage.getItem('token')}` } })
          .then(setTimeout(() => {this.refresh()}, 4))
      },
      add({target}) {
        let task = {
          title: target.title.value,
          detail: target.detail.value
        }
        this.$refs.add.reset()
        this.visible = false
        this.save(task)
      },
      save(task) {
        axios.post(url, task, { 'headers': { Authorization: `Token ${localStorage.getItem('token')}` } })
          .then(setTimeout(() => {this.refresh()}, 10))
      },
      refresh() {
        axios.get(url, { 'headers': { Authorization: `Token ${localStorage.getItem('token')}` } })
          .then(response => {
            console.log(response)
            localStorage.setItem('list', JSON.stringify(response.data))
            this.localRefresh()
          })
      },
      localRefresh() {
        let list = localStorage.getItem('list')
        
        if (list) {this.list = JSON.parse(list)}
      }
    },
  
    data() {
      return {
        visible: false,
        list: [],
      }
    },
  
    mounted() {
      this.localRefresh()
      this.refresh()
    },
  
    name: 'Home',
    components: {
      
    }
  }
</script>

<style scoped lang="scss">
.home {
  margin-top: 60px;
}
.resize-enter-active,
.resize-leave-active {
  transform-origin: bottom;
  transition: transform 0.3s ease;
}

.resize-enter-from,
.resize-leave-to {
  transform: scaleY(0);
}

  form{
    @media screen and (min-width: 800px) {
      width: 30%;
    }
    @media screen and (max-width: 800px) {
      width: 85%;
    }
    margin: auto;
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      height: 30px;
      display: block;
      margin-bottom: 20px;
    }
    textarea {
      width: 100%;
      height: 100px;
      display: block;
      margin-bottom: 10px;
    }
    button {
      all: unset;
      display: table;
      margin: auto;
    }
  }

  h1 {
    text-align: center;
    text-decoration: underline;
    text-underline-offset: 11px;
    text-decoration-thickness: 3px;
  }

  #create {
    cursor: default;
    display: table;
    margin: auto;
    font-size: 48px;
    transition: 0.4s;
    padding: 0.5px;
    border-radius: 15%;
    user-select: none;
  }

  #create:hover {
    background: rgb(224, 224, 224);
  }

  table {
    border-spacing: 10px;
    margin-top: 20px;
    font-size: 25px;
    cursor: default;
    margin: auto;

    @media screen and (min-width: 800px) {
      width: 30%;
    }
    @media screen and (max-width: 800px) {
      width: 85%;
    }

    #title {
      width: 88%;
    }

    span {
      margin-left: 10px;
      vertical-align: middle;
      transition: 0.4s;
      padding: 0.5px;
      border-radius: 20%;
      user-select: none;
    }
    
    span:hover {
      background: rgb(224, 224, 224);
    }
  }
</style>