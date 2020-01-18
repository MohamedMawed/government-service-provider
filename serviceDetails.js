import React, { Component } from 'react';
import { Animated, View, TouchableOpacity, Dimensions, ScrollView, Text } from 'react-native';
import { metrics, fonts, colors } from './themes';
import Accordion from 'react-native-collapsible/Accordion';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { CoreUserReducer } from './core/app_state/reducers/users';
import { Button } from './components/button';
import Swiper from "react-native-swiper";
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get("window");


getServices = CoreUserReducer.getServices;
const EditOrder = CoreUserReducer.EditOrder;

class ServiceDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: 1,
            xTabOne: 0,
            xTabTwo: 0,
            translateX: new Animated.Value(width / 2),
            translateXTabOne: new Animated.Value(0),
            translateXTabTwo: new Animated.Value(width),
            translateY: -1000,
            currentOpenedIndex: -1,
            activeSections: [],
            activeSections1: [],
            SubServicesWithPay: null,
            SubServicesWithoutPay: null,
            off: props.navigation.getParam('off', 0)
        }
        let responseHandler = {
            onSuccess: (data) => {
                let tot = data;
                let withpay = data.filter((item, _index) => {
                    return item.canBeOrdered == true;
                });
                let without = tot.filter((item, _index) => {
                    return item.canBeOrdered == false;
                });
                console.log('MawedWithwithout ', withpay)
                this.setState({ SubServicesWithPay: withpay, SubServicesWithoutPay: without })
            },
            onFail: (error) => {
                console.log(error)
            }
        }
        props.getServices({
            off_id: props.navigation.getParam('off', 0).off_id
        }, responseHandler)
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
    _renderSectionTitle = section => {
        return (
            <View style={{ height: metrics.screenHeight * .003, width: metrics.screenWidth }} />
        );
    };

    _renderHeader = section => {
        return (
            <View
                style={{
                    borderRadius: 0,
                    elevation: 2,
                    width: metrics.screenWidth,
                    backgroundColor: '#f25146',
                    justifyContent: 'center',

                }}>
                <Text style={{ marginVertical: metrics.screenHeight * .02, width: '95%', fontSize: fonts.size.h4-3, fontFamily: fonts.type.bold, color: 'white', includeFontPadding: false, }}>{section.srv_name}</Text>
            </View>
        );
    };

    _renderContent = (section, i, isActive, sections) => {
        return (
            <Animatable.View
                duration={600}
                easing="ease-out"
                animation={isActive ? 'zoomIn' : false}>

                <View style={{ marginTop: 10, marginRight: 10, marginHorizontal: 10 }}>
                    {section.papers.split('.')[0].length > 0 ? <Text style={{ fontSize: fonts.size.h6, fontFamily: fonts.type.bold, color: 'red', textDecorationLine: 'underline', includeFontPadding: false, }}>الأوراق المطلوبة :</Text> : null}
                    {/* {
                        section.papers.split('.').map((item, index) => {
                            return (<Text style={{ fontSize: fonts.size.h6, marginRight: 10, fontFamily: fonts.type.normal, includeFontPadding: false, }}>{item}</Text>)
                        })
                    } */}
                    <Text style={{ fontSize: fonts.size.h6, marginRight: 10, fontFamily: fonts.type.normal, includeFontPadding: false, }}>{section.papers}</Text>
                    {section.actions.split('.')[0].length > 0 ? <Text style={{ fontSize: fonts.size.h6, fontFamily: fonts.type.bold, color: 'red', textDecorationLine: 'underline', includeFontPadding: false, }}>الإجراءات :</Text> : null}
                    <Text style={{ fontSize: fonts.size.h6, marginRight: 10, fontFamily: fonts.type.normal, includeFontPadding: false, }}>{section.actions}</Text>
                    {/* 
                    {
                        section.actions.split('.').map((item, index) => {
                            return (<Text style={{ fontSize: fonts.size.h6, marginRight: 10, fontFamily: fonts.type.normal, includeFontPadding: false, }}>{item}</Text>)
                        })
                    } */}
                    {section.canBeOrdered ? <Button
                        elevation={3}
                        myWidth={metrics.screenWidth * 0.4}
                        myHeight={metrics.screenHeight * 0.06}
                        onClick={() => {
                            this.props.EditOrder({ service: section.srv_id })
                            this.props.navigation.navigate('OrderPage', { srv_id: section.srv_id });
                        }}
                        backgroundColor={colors.blueX}
                        headerName={'طلب'}
                        raduis={metrics.borderRadius}
                    /> : null}
                </View>
            </Animatable.View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    _updateSections1 = activeSections1 => {
        this.setState({ activeSections1 });
    };
    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
        } = this.state;
        return (
            <View style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: '#FFEBEE',
                borderTopColor: colors.acentColor,
                marginBottom: metrics.addFooter,
                height: metrics.screenHeight - metrics.SOFT_MENU_BAR_HEIGHT + metrics.STATUS_BAR_HEIGHT,

            }}>

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
                    <Icon name={'ios-search'} size={30} color={colors.white} />
                    <Text style={{
                        width: metrics.screenWidth * .8,
                        fontFamily: fonts.type.bold,
                        fontSize: fonts.size.h3,
                        includeFontPadding: false,
                        color: colors.white,
                        textAlign: 'center'
                    }}>{this.state.off.off_name} </Text>
                </View>
                <View
                    style={{
                        width: "100%",
                        height: metrics.screenHeight - metrics.SOFT_MENU_BAR_HEIGHT - metrics.screenHeight * .085 + metrics.STATUS_BAR_HEIGHT
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            height: metrics.screenHeight * .07,
                            backgroundColor: '#333333',
                            position: "relative",
                            elevation: 3
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
                            onPress={() => {
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
                                    fontFamily: fonts.type.bold,
                                    fontSize: fonts.size.h4,
                                    includeFontPadding: false,
                                    textAlign: 'center',
                                    color: colors.white
                                }}
                            >
                                الدفع الإلكترونى
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
                            onPress={() => {
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
                                    fontFamily: fonts.type.bold,
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
                            this.setState({ active: i }, () => {
                                if (!i)
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
                            width: metrics.screenWidth
                        }}
                    >
                        <ScrollView style={{}}>

                            {this.state.SubServicesWithPay ?
                                <Accordion
                                    sections={this.state.SubServicesWithPay}
                                    activeSections={this.state.activeSections}
                                    renderSectionTitle={this._renderSectionTitle}
                                    renderHeader={this._renderHeader}
                                    duration={400}
                                    easing={'easeOut'}
                                    renderContent={this._renderContent}
                                    onChange={this._updateSections}
                                />
                                :
                                null
                            }
                        </ScrollView>
                        <ScrollView style={{}}>

                            {this.state.SubServicesWithoutPay ?
                                <Accordion
                                    sections={this.state.SubServicesWithoutPay}
                                    activeSections={this.state.activeSections1}
                                    renderSectionTitle={this._renderSectionTitle}
                                    renderHeader={this._renderHeader}
                                    duration={400}
                                    easing={'easeOut'}
                                    renderContent={this._renderContent}
                                    onChange={this._updateSections1}
                                />
                                :
                                null
                            }
                        </ScrollView>


                    </Swiper>

                </View>


            </View>
        )
    }
}



function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getServices: (param, responseHandler) => dispatch(getServices(param, responseHandler)),
        EditOrder: (attribute) => dispatch(EditOrder(attribute))

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceDetails);
