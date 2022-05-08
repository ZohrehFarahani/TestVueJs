<template>
  <div id="app" class="container">
    
  
    <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div v-for="item in  messageList" :key="item.id"  v-bind:class="[item.id == 1 ? 'alert alert-secondary bg-light d-flex justify-content-between' : 'alert alert-primary text-left']"   >
          {{item.message}}</div>
          <card>
            
  
  <div class="form-group mx-sm-3 mb-2">
      <input  type="text" class="form-control" v-model="mess" placeholder="لطفا تایپ نمایید" v-on:keyup.enter="sendMessage()"/>
  </div>
  <button v-on:click="sendMessage()" class="btn btn-primary">ارسال</button>

   <br>
    <span v-show="visibale">ارتباط با موفقیت انجام شد</span>
    <br>
     
          <span v-text="result"></span>
     
          </card>
</div>
    </div>
  
    </div>
    </div>
    </div>
 
  
</template>

<script>
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
export default {
  name: 'App',
  data: function() {
    return {
      connection: null,
      messageList:[],
      show:null,
      visibale:false,
      result:null
    }
  },
  methods: {
      sendMessage: function() {  
      this.connection.send(this.mess)
      this.messageList.push({id:2,message:this.mess})
    },
     connect : function() {
    //  this.result = "نتیجه..";
    //  this.result = "وضعیت ارتباط..";
     this.connection = new WebSocket("wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self")
     this.connection.onmessage =(message)=> {
     console.log(message.data)
     this.messageList.push({id:1,message:message.data})
    //  this.result = message.data
    
    }

    this.connection.onopen = function(event) {    
      console.log(event)
      console.log ("ارتباط با موفقیت انجام شد"+event.data)
      this.show ="ارتباط با موفقیت انجام شد"
      this.visibale = true
     
    }
    this.connection.onerror = function(err) {
      this.show = 'خطا در سوکت ', err.message, 'سوکت بسته شده است'
      this.connection.close()
     }
    this.connection.onclose = function(err) {
        console.log('سوکت بسته شده است . ارتباط مجدد'+err.message)
         this.show ='سوکت بسته شده است . ارتباط مجدد'+err.message
       setTimeout(function() {
       this.connect()
        }, 1000)
     }
  }
  },
  created: function() {
      this.connect()
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
