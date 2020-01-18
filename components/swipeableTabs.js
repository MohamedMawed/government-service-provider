import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    TextInput,
    Image,
    Dimensions
} from "react-native";
import Swiper from "react-native-swiper";
import { colors, metrics, fonts } from "../themes";
import Icon from 'react-native-vector-icons/Ionicons';
import Homepage from "../homePage";
import NewsView from "../screens/news/newsView";
const EditOrder = CoreUserReducer.EditOrder;
import { connect } from 'react-redux';
import { CoreUserReducer } from './../core/app_state/reducers/users';
const { width } = Dimensions.get("window");

export class Tabs extends React.Component {
    state = {
        isSearch : false,
        searchValue  : "",
        active: 1,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(width / 2),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000
    };
    componentDidMount() {
        this.setState({ active: 1 }, () =>
            this.handleSlide(new Animated.Value(0))
        )
    }
    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };

    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {this.state.isSearch ? <View style={{
                    flexDirection: 'row',
                    height: metrics.screenHeight * .085,
                    width: metrics.screenWidth,
                    backgroundColor: colors.white,
                    alignItems: 'center',
                    elevation:3,
                    justifyContent: 'space-between',
                    paddingHorizontal: metrics.screenWidth * .04
                }}>

                    <Icon name={'ios-arrow-back'} size={30} color={'#333333'} />
                    <TextInput
                        autoFocus
                        style={{ 
                            height: '100%', 
                            width: metrics.screenWidth * .8, 
                            textAlign: 'right', 
                            fontFamily: fonts.type.normal, 
                            fontSize: fonts.size.h5, 
                            includeFontPadding: false, 
                            color: '#333333' 
                        }}
                        onChangeText={searchValue => {
                            this.setState({ searchValue })
                        
                        }}
                        value={this.state.searchValue}
                    />
                    <Icon name={'ios-close'} onPress={() => this.setState({ isSearch: false })} size={30} color={'#333333'} />
                </View>
                    :
                    <View style={{
                        flexDirection: 'row',
                        height: metrics.screenHeight * .085,
                        width: metrics.screenWidth,
                        backgroundColor: '#333333',
                        alignItems: 'center',
                        elevation: 3,
                        justifyContent: 'space-between',
                    paddingHorizontal: metrics.screenWidth * .04
                }}>

                    <Icon name={'ios-search'} onPress={() => {
                     
                     this.setState({isSearch : true})
                    }
                    } size={30} color={colors.white} />
                    <Text style={{
                        width: metrics.screenWidth * .8,
                        fontFamily: fonts.type.bold,
                        fontSize: fonts.size.h3,
                        includeFontPadding: false,
                        color: colors.white,
                        textAlign: 'center'
                    }}>خدمات  </Text>
                    <Icon name={'ios-list'} onPress={()=>this.props.navigation.openDrawer()} size={30} color={colors.white} />
                </View>
                }
                <View
                    style={{
                        width: "100%",
                        height:metrics.screenHeight
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            height: metrics.screenHeight * .07,
                            backgroundColor: '#333333',
                            position: "relative",
                            elevation:3
                        }}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: "50%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                backgroundColor: 'red',
                                // borderRadius: 4,
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                // borderWidth: 1,
                                borderColor: "#007aff",
                                // borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>{
                                this.refs.pageSwiper.scrollBy(0 - this.state.active)
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                            }
                        >
                            <Text
                                style={{
                                    width: metrics.screenWidth * .8,
                                    fontFamily: fonts.type.normal,
                                    fontSize: fonts.size.h4,
                                    includeFontPadding: false,
                                    // color:colors.white,
                                    textAlign: 'center',
                                    color: colors.white
                                }}
                            >
                                أخر الأخبار
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                // borderWidth: 1,
                                borderColor: "#007aff",
                                // borderRadius: 4,
                                borderLeftWidth: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>{
                                this.refs.pageSwiper.scrollBy(1 - this.state.active)
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                            }
                        >
                            <Text
                                style={{
                                    width: metrics.screenWidth * .8,
                                    fontFamily: fonts.type.normal,
                                    fontSize: fonts.size.h4,
                                    includeFontPadding: false,
                                    // color:colors.white,
                                    textAlign: 'center',
                                    color: colors.white
                                }}
                            >
                                الخدمات
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Swiper
                    index={1}
                        ref={"pageSwiper"}
                        onIndexChanged={(i) => {
                            this.setState({ active: i }, () =>{
                            if(!i)
                            this.handleSlide(xTabOne)
                            else 
                            this.handleSlide(xTabTwo)
                        }
                        )
                        }}
                        showsButtons={false}
                        
                        activeDot={<View />}
                        dot={<View />}
                        loadMinimal
                        loop={false}
                        style={{
                            backgroundColor: colors.white,
                            height: metrics.screenHeight,
                            width: metrics.screenWidth
                        }}
                    >
                        <NewsView  {...this.props}/>
                        <Homepage filterValue={this.state.searchValue} {...this.props}/>
                    </Swiper>

                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
      offices: state.userReducer.offices,
      gehat: state.userReducer.gehat,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      EditOrder: (attribute) => dispatch(EditOrder(attribute)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
  