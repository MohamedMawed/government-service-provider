

export default class RegisterPresenter {
  constructor(registerView) {
    this.registerView = registerView;
  }
  register() {
    let responseHandler = {
      onSuccess: (data) => {
        // console.log( 'after user registeration',data)
        this.registerView.props.navigation.replace('MyDrawerNavigator')

      },
      onFail: (error) => {
        console.log(error)
        if(error.error)global.openToast(error.error)
        else if(error.errors.non_field_errors)
        global.openToast(error.errors.non_field_errors[0])
        else 
        global.openToast(error.errors[Object.keys(error.errors)[0]] + Object.keys(error.errors)[0])
      }
    }
    const {username , mobile , email , password , confirmPass , nationalNumber, postalCode } = this.registerView.state;
    if(password != confirmPass){
      global.openToast('كلمة المرور غير متطابقة')
    }
    else if(username.length == 0){
      global.openToast("برجاء إدخال الإسم الرباعى")
    }else if(password.length == 0){
      global.openToast("برجاء إدخال كلمة المرور")
    }else if(email.length == 0){
      global.openToast("برجاء إدخال البريد الإلكترونى")
    }else if(nationalNumber.length == 0){
      global.openToast("برجاء إدخال الرقم القومى")
    }else if(postalCode.length == 0){
      global.openToast("برجاء إدخال الرمز البريدى")
    }else
    this.registerView.props.Register({
      mobile: mobile,
      password: password,
      full_name: username,
      email: email,
      "lat" : "1.322",
      "lng":"1.3221",
      "national_id" : nationalNumber,
      "postal_code" : postalCode

    }, responseHandler)
    // this.registerView.props.Register({
    //   mobile: '+01016711819',
    //   password: 'prologcoder',
    //   full_name: 'mohamed mawed',
    //   email: 'text@test.com',
    //   address: 'test address',
    //   government : 'cairo'

    // }, responseHandler)
  }

}
