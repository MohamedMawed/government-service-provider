import React, { Component } from 'React';
import {
  BackHandler,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  ScrollView
} from 'react-native';
import { metrics } from '../themes';

class CustomeAlert extends Component {
  constructor(props) {
    super(props);
    const AlertPosition =
      this.props.AlertPosition == 'top'
        ? 'flex-start'
        : this.props.AlertPosition == 'center'
        ? 'center'
        : 'flex-end';
    this.AlertHeight =
      Math.min(this.props.AlertHeight, 1) * metrics.screenHeight;
    this.AlertWidth = Math.min(1, this.props.AlertWidth) * metrics.screenWidth;
    this.TimeOpenClose = 150;
    this._animated = new Animated.Value(0);
    (this.CurrentAlertHeight = new Animated.Value(metrics.screenHeight)),
      (this.CurrentAlertWidth = new Animated.Value(metrics.screenWidth)),
      (this.state = {
        opacity: new Animated.Value(0),
        disable: 'none',
        AlertHeight: new Animated.Value(metrics.screenHeight),
        AlertWidth: new Animated.Value(metrics.screenWidth),
        AlertPosition: AlertPosition,
        AlertOpacity: new Animated.Value(0),
        top: 0
      });
    let borderRadius = this.props.borderRadius
      ? this.props.borderRadius
      : this.AlertHeight * 0.1;
    if (this.props.type == 'upperounded') {
      this.borderTopRightRadius = borderRadius;
      this.borderTopLeftRadius = borderRadius;
      this.borderBottomRightRadius = 0;
      this.borderBottomLeftRadius = 0;
    } else if (this.props.type == 'lowerrounded') {
      this.borderTopRightRadius = 0;
      this.borderTopLeftRadius = 0;
      this.borderBottomRightRadius = borderRadius;
      this.borderBottomLeftRadius = borderRadius;
    } else if (this.props.type == 'rect') {
      this.borderTopRightRadius = 0;
      this.borderTopLeftRadius = 0;
      this.borderBottomRightRadius = 0;
      this.borderBottomLeftRadius = 0;
    } else {
      this.borderTopRightRadius = borderRadius;
      this.borderTopLeftRadius = borderRadius;
      this.borderBottomRightRadius = borderRadius;
      this.borderBottomLeftRadius = borderRadius;
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log('next props' , nextProps);
    if (nextProps.AlertOpen) {
      this.Open();
    } else {
      this.Close();
    }
  }

  render() {
    return (
      <View
        pointerEvents={this.state.disable}
        style={{
          justifyContent: this.state.AlertPosition,
          alignItems: 'center',
          width: metrics.screenWidth,
          height: metrics.screenHeight,
          position: 'absolute',
          zIndex: 1000,
          overflow: 'hidden',
          elevation: metrics.screenWidth * 0.03
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.CloseAlert();
          }}
        >
          <Animated.View
            style={{
              width: metrics.screenWidth,
              height: metrics.screenHeight,
              backgroundColor: '#222',
              position: 'absolute',
              opacity: this.state.opacity
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            Styles.Container,
            {
              backgroundColor: this.props.deleteBackgroundColor?undefined:'#fff',
              height: this.CurrentAlertHeight,
              width: this.CurrentAlertWidth,
              opacity: this.state.AlertOpacity,
              borderTopRightRadius: this.borderTopRightRadius,
              borderTopLeftRadius: this.borderTopLeftRadius,
              borderBottomRightRadius: this.borderBottomRightRadius,
              borderBottomLeftRadius: this.borderBottomLeftRadius
            }
          ]}
        >
          {this.props.children}
        </Animated.View>
      </View>
    );
  }

  Open() {
    Animated.timing(this._animated, {
      toValue: 1,
      easing: Easing.linear,
      duration: this.TimeOpenClose
    }).start();
    Animated.timing(this.CurrentAlertHeight, {
      toValue: this.AlertHeight,
      easing: Easing.linear,
      duration: this.TimeOpenClose
    }).start();
    Animated.timing(this.CurrentAlertWidth, {
      toValue: this.AlertWidth,
      easing: Easing.linear,
      duration: this.TimeOpenClose
    }).start();
    Animated.timing(this.state.AlertOpacity, {
      toValue: 1,
      easing: Easing.linear,
      duration: this.TimeOpenClose
    }).start();
    Animated.timing(this.state.opacity, {
      toValue: 0.6,
      duration: this.TimeOpenClose
    }).start(() => {
      this.setState({ disable: 'auto' });
      if (this.props.mode == 'autoclose') {
        setTimeout(() => {
          this.props.CloseAlert();
        }, this.props.closetime);
      }
    });
  }

  Close() {
    Animated.timing(this._animated, {
      toValue: 0,
      easing: Easing.linear,
      duration: this.TimeOpenClose
    }).start();

    Animated.timing(this.CurrentAlertHeight, {
      toValue: metrics.screenHeight,
      easing: Easing.linear,
      duration: this.TimeOpenClose
    }).start();
    Animated.timing(this.CurrentAlertWidth, {
      toValue: metrics.screenWidth,
      easing: Easing.linear,
      duration: this.TimeOpenClose
    }).start();
    Animated.timing(this.state.AlertOpacity, {
      toValue: 0,
      easing: Easing.linear,
      duration: this.TimeOpenClose
    }).start();

    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.TimeOpenClose
    }).start(() => {
      this.setState({ disable: 'none' });
    });
  }
  componentDidMount() {
    if (this.props.AlertOpen) {
      this.Open();
    } else {
      this.Close();
    }
    this.backHandler=BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.AlertOpen) {
        this.props.CloseAlert();
        return true;
      }
    });
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }
}

const Styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(150,150,150,.1)',
    elevation: 2,
    
    overflow: 'hidden'
  }
});
export { CustomeAlert };
