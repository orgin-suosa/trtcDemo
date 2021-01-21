<template>
  <div>
    <div class="login-containers">
      <div class="login-box">
        <div class="avart-box">
          <img src="../assets/ic_appicon.png" alt />
        </div>
        <div class="input-bg">
          <el-form label-width="80px" :model="loginFrom">
            <!-- <el-form-item label="账号">
              <el-input v-model="loginFrom.userName"></el-input>
            </el-form-item>-->

            <el-select class="el_select_change" v-model="value" placeholder="请选择账号">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

            <el-form-item class="el_roomid" label="房间号">
              <el-input v-model="roomId"></el-input>
            </el-form-item>

            <el-button class="btn-login" type="primary" @click="login">创建或加入</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomId: "",
      loginFrom: { userName: "user16" },
      userInfo: {},
      options: [
        {
          value: "user0",
          label: "user0"
        },
        {
          value: "user1",
          label: "user1"
        }
      ],
        userInfo: { 
            userid: "" ,
            userSig:"",
            roomid:""

        
        
        },
      value: "",
      userSig: ""
    };
  },
  methods:{
      login(){
          console.log("123...")
         const userId = this.value;
      if (userId === "user0") {
        this.userSig="eJw1zEELgjAYxvHvsnPIu805JnRKagchUg-hLXDJq6QyzZXRd8*0js-vgf*LZHHqjcaSkDAPyGbZWJhmwCsufO*N-R99UV*6DgsSUh-AlywI*PqYR4fWzC6EYACw6oC3rwUUfK4kl78KlnPXnUSeTLWLo4jqJq8a2Gs9VFmrdownZ3V8Zm46jKlt3Za8Px7bMcQ_";
      }else if(userId === "user1"){
        this.userSig="eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwqXFqUWGUInilOzEgoLMFCUrQxMDAxNzIzMzY4hMakVBZlEqUNzU1NTIwMAAIlqSmQsSMzM0MDG2NDczg5qSmQ40N8XF29zHNMMwxS-COS3Ez7Ew2bMkJNe-MCfX0yywJKkoPCojpapYOzAjNdJWqRYAG14x3g__";
      }else if(userId === ""){
        this.userSig="";
      }

      const roomid = this.roomId;

    if(roomid == null || roomid=="" ||userId==null || userId =="" ){
        console.log("login", "为空");
        this.$message({
            message: "请填写全部数据",
            type: "error"
          });
    }else{

        this.userInfo.userid=userId;
        this.userInfo.userSig = this.userSig;
        this.userInfo.roomid = roomid;

        console.log("login", "不为空");
          this.$router.push({
            name: "TRTCRoom",
            path: "/trtc",
            params: { userInfo: this.userInfo }
          })
    }

     



      }
  }
};
</script>



<style lang="less" scope>
// .btn_login {
//   width: 200px;
// }
// .input_login {
//   margin-bottom: 20px;
// }
.login-containers {
  height: 100%;
  width: 100%;
  background-color: #2b4b6b;
  position: absolute;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  border-radius: 4px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avart-box {
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0, 0, 10px, #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .input-bg {
    margin-top: 100px;
    margin-right: 50px;

    .btn-login {
      width: 200px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      margin-top: 120px;
    }
    .el_select_change {
      width: 300px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
    .el_roomid {
      margin-top: 60px;
      width: 300px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>