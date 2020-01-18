

export default class LoginPresenter {
  constructor(loginView) {
    this.loginView = loginView;
  }

  Login(username , password){
    let responseHandler = {
      onSuccess: () => {
        // global.openToast('done')
        this.loginView.props.getGehat();
        this.loginView.props.navigation.replace('MyDrawerNavigator')

      },
      onFail: (error) => {

        console.log(error)
      }
  }
  if(username.length == 0){
    global.openToast("برجاء إدخال رقم المحمول")
  }else if(password.length == 0){
    global.openToast("برجاء إدخال كلمة المرور")
  }else
  this.loginView.props.Login({username : username , password : password}, responseHandler)
  }
  
}
