<template>
  <div class="basex_ui_login_wraper">
    <div class="login_content">
      <div class="title_box">
        <div class="title">仓库管理</div>
        <div class="tip">Vue3 + 可视化大屏组件库</div>
      </div>
      <div class="input_box">
        <div class="top_tip">密码登录</div>
        <div
          class="input_item username"
          :class="{ show_username: !userName && userNameKey }"
        >
          <input v-model="userName" type="text" placeholder="请输入用户名" />
        </div>
        <div
          class="input_item password"
          :class="{ show_password: !passWord && passWordKey }"
        >
          <input v-model="passWord" type="password" placeholder="请输入密码" />
        </div>
        <div class="btn_login" @click="loginClick">登录</div>
      </div>
    </div>
    <div class="login_info">
      A Set of southwest Licensed | Copyright © 2022 by CANGKU
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      userNameKey: false,
      passWordKey: false,
      userName: "",
      passWord: "",
    };
  },
  watch: {
    userName: function (){
      if (this.userNameKey) return
		  else this.userNameKey = true
    },
    passWord: function (){
      if (this.passWordKey) return
		  else this.passWordKey = true
    }
  },
  methods: {
    // 登录
    loginClick() {
      if (!this.userName || !this.passWord) {
        this.$message({
          message: '请输入用过户名或密码！',
          type: 'warning'
        });
        return;
      }
      localStorage.setItem('login_token', 'test_token')
      // 此处登录
      setTimeout(() => { this.$router.replace('/home'); }, 0)
    },
  },
};
</script>
<style lang="less" scoped>
.basex_ui_login_wraper {
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  padding-bottom: 89px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: url("/static/images/login/login_bg.png") no-repeat 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .login_content {
    .title_box {
      font-weight: 400;
      position: relative;
      margin-bottom: 120px;

      .title {
        font-family: Microsoft YaHei UI;
        font-size: 48px;
        color: #323334;
        margin: 111px 0 20px 116px;

        &::after {
          content: "";
          width: 59px;
          height: 59px;
          border-radius: 40%;
          background: url("/static/images/login/logo.png") no-repeat 100%
            100%;
          position: absolute;
          top: 0;
          left: 36px;
        }
      }

      .tip {
        font-family: Source Han Sans SC;
        font-size: 16px;
        color: #666666;
        margin-left: 132px;
      }
    }
    .input_box {
      width: 440px;
      height: 346px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 27px 71px 45px 71px;
      box-shadow: 5px 5px 10px 10px rgba(0, 0, 0, .2);

      .top_tip {
        width: 100%;
        height: 30px;
        line-height: 20px;
        border-bottom: 1px solid rgba(229, 229, 229, 0.64);
        font-family: Microsoft YaHei;
        font-weight: 400;
        font-size: 14px;
        color: #409EFF;
        position: relative;
        margin-bottom: 30px;
        text-align: center;

        &::after {
          content: "";
          width: 20px;
          height: 3px;
          background: #409EFF;
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          margin: auto;
        }
      }

      .input_item {
        width: 300px;
        height: 36px;
        line-height: 35px;
        border-radius: 4px;
        border: 1px solid #e5e5e5;
        margin-bottom: 40px;
        box-sizing: border-box;
        padding-left: 34px;
        position: relative;

        &.username {
          &::before {
            content: "";
            width: 12px;
            height: 14px;
            background: url("/static/images/login/user.png") no-repeat
              100% 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 12px;
            margin: auto;
          }
        }

        &.password {
          &::before {
            content: "";
            width: 12px;
            height: 14px;
            background: url("/static/images/login/password.png")
              no-repeat 100% 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 12px;
            margin: auto;
          }
        }

        &.show_username,
        &.show_password {
          border: 1px solid red;
          position: relative;

          &::after {
            width: 110px;
            height: 15px;
            line-height: 15px;
            color: red;
            font-size: 14px;
            position: absolute;
            bottom: -17px;
            left: 0;
            text-align: left;
          }
        }

        &.show_username {
          &::after {
            content: "请输入用户名";
          }
        }

        &.show_password {
          &::after {
            content: "请输入密码";
          }
        }

        input {
          height: 28px;
          width: 92%;
          line-height: 28px;
          border: none;
          outline: none;
          font-family: Microsoft YaHei;
          font-size: 14px;
          font-weight: 400;

          &::placeholder {
            color: #d8d8d8;
          }
        }
      }

      .verify_item {
        width: 100%;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        &::before {
          content: "";
          width: 12px;
          height: 14px;
          background: url("/static/images/login/verify.png") no-repeat
            100% 100%;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 12px;
          margin: auto;
        }

        .verify_input {
          width: 186px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          padding-left: 39px;

          &.show_verifycode {
            border: 1px solid red;
            position: relative;

            &::after {
              content: "请输入验证码";
              width: 110px;
              height: 15px;
              line-height: 15px;
              color: red;
              font-size: 14px;
              position: absolute;
              bottom: -17px;
              left: 0;
              text-align: left;
            }
          }

          input {
            height: 32px;
            width: 92%;
            line-height: 32px;
            border: none;
            outline: none;
            font-family: Microsoft YaHei;
            font-size: 14px;
            font-weight: 400;

            &::placeholder {
              color: #d8d8d8;
            }
          }
        }

        img {
          width: 105px;
          height: 36px;
          cursor: pointer;
        }
      }

      .btn_login {
        width: 300px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: 400;
        border-radius: 4px 4px 4px 4px;
        background: #409EFF;
        cursor: pointer;
        margin-top: 30px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .login_info {
    font-family: Microsoft YaHei UI;
    font-size: 14px;
    font-weight: 400;
    color: #666979;
  }
}
</style>
