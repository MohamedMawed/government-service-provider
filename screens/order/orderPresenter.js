

export class OrderPresenter {
  constructor(orderView) {
    this.orderView = orderView;
    let responseHandler = {
      onSuccess: (data) => {
        orderView.setState({ ServicesParams: data.parameters , AvailablePlaces : data.deliveryPlaces })
      },
      onFail: (error) => {
        console.log(error)
      }
    }
    orderView.props.getServicesParams({ srv_id: orderView.props.navigation.getParam('srv_id', 0) , office : orderView.props.office}, responseHandler)
  
     responseHandler = {
      onSuccess: (data) => {
        console.log('data service ' , data)
        orderView.setState({ ServicesAddons: data})

      },
      onFail: (error) => {
        console.log(error)
      }
    }
  
    orderView.props.getServicesAddons({ srv_id: orderView.props.navigation.getParam('srv_id', 0) }, responseHandler)
  
  
  
  
  
  
  
  }


}



export class PaymentPresenter {
  constructor(orderView) {
    this.orderView = orderView;
  }

  Login(username, password) {
    let responseHandler = {
      onSuccess: () => {
        this.orderView.props.getServices();
        this.orderView.props.navigation.navigate('HomePage')

      },
      onFail: (error) => {
        console.log(error)
      }
    }
    this.orderView.props.Login({ username: username, password: password }, responseHandler)
  }

}
