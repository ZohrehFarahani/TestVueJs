<template>
  <div id="app" class="container">
    
  
    <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <card>
            
  
  <div class="form-group mx-sm-3 mb-2">
      <input  type="text" class="form-control" v-model="mess" placeholder="لطفا تایپ نمایید" />
  </div>
  <button v-on:click="sendMessage()" class="btn btn-primary">ارسال</button>

   
   
    <div>{{showMessage}}</div>
        <div>
        <h2>{{mess}}</h2>
      </div>
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
      showMessage:"",
      mess:""
    }
  },
  methods: {
    sendMessage: function() {
     
      this.connection.send(this.mess)
       
    }
  },
  created: function() {

    // this.showMessage = "شروع اتصال به وب سوکت"
    this.connection = new WebSocket("wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self")

    this.connection.onmessage = function(message) {
     
      //  const data = JSON.parse(message.data);
         this.showMessage = message.data
       console.log(message.data)
       alert("پیام سرور" + message.data)
    
    }
  

    this.connection.onopen = function(event) { 
     
      console.log(event)
      // console.log ("ارتباط با موفقیت انجام شد")
      this.showMessage= "ارتباط با موفقیت انجام شد"
      alert( "ارتباط با موفقیت انجام شد")
     
    }
    this.connection.onerror = function(err) {
   this.showMessage = 'خطا در سوکت ', err.message, 'سوکت بسته شده است';
    this.connection.close();
    this.connection = new WebSocket("wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self")
    this.connection.reconnectInterval = 60000
     }
  

  }
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
