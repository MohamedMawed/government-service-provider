import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Linking,
    TouchableOpacity,
    Image,
    FlatList,
    BackHandler
} from 'react-native';

import { connect } from 'react-redux'
import { colors, metrics, fonts } from '../themes';
import { Requires } from '../images/requires';
import Icon from 'react-native-vector-icons/Ionicons';
import { CoreUserReducer } from '../core/app_state/reducers/users';
const Logout = CoreUserReducer.logoutUser

const DrawerItem = ({ item, selected, index, onClick }) => {

    return (
        <TouchableOpacity key={index} activeOpacity={.8} onPress={onClick} style={{
            width: '100%',
            height: metrics.screenHeight * .07,
            justifyContent: 'flex-end',
            backgroundColor: selected ? colors.white : colors.lightGray,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            alignItems: 'center',
            flexDirection: 'row',
        }}>
            <Text style={{
                // width: '100%',
                marginHorizontal: metrics.screenWidth * .05,
                textAlign: 'center',
                includeFontPadding: false,
                fontSize: fonts.size.h4,
                fontFamily: fonts.type.normal,
                color: colors.black
            }}>
                {item.geha_name}
            </Text>
            {selected ? <View style={{
                width: metrics.screenWidth * .02,
                height: '100%',
                backgroundColor: 'red'
            }} /> : null}
        </TouchableOpacity>
    )
}


class Drawer extends Component {

    constructor(props) {
        super(props)
        this.items = [
            "الخدمات المتاحة",
            "إستخراج أوراق",
            "الأوراق المطلوبة مسبقا",
            "أخر الأخبار",
            "من نحن",
            "تواصل معنا"
        ],
            this.state = {
                items: [
                    {
                        geha_name: "الخدمات المتاحة",

                    },
                    ...props.gehat,
                    {
                        geha_name: "من نحن",

                    },
                    {
                        geha_name: "تواصل معنا",

                    },


                ],
                selectedIndex: 0
            }

    }
    setSelectedDrawerIndex = (index)=>{
        this.setState({ selectedIndex: index })
    }
    componentWillMount() {
        global.setSelectedDrawerIndex = this.setSelectedDrawerIndex
    }


    render() {
        console.log('itemmmms ', this.state.items)
        return (

            <View style={Styles.container}>
                    <Icon name={'ios-close'} onPress={()=>this.props.navigation.closeDrawer()} size={fonts.size.h3} style={{
                        zIndex:3,
                        width:metrics.screenWidth*.1,
                        height:metrics.screenWidth*.1,
                        includeFontPadding : false,
                        position:'absolute',
                        top:10,
                        left:10,
                    }} color={colors.black} />
                
                <Image
                    source={Requires.Logo}
                    resizeMode={'contain'}
                    style={{
                        marginVertical:metrics.screenHeight*.03,
                        width: '100%',
                        height: metrics.screenHeight * .25,
                    }}
                />

                <View style={{ width: '100%', height: 1.5, backgroundColor: colors.lightGray }} />

                <FlatList
                    contentContainerStyle={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                    data={[
                        {
                            geha_name: "الخدمات المتاحة",
    
                        },
                        {
                            geha_name: "من نحن",
    
                        },
                        {
                            geha_name: "تواصل معنا",
    
                        },
                        {
                            geha_name: "تسجيل الخروج",
    
                        },
    
    
                    ]}
                    extraData={this.props.gehat}
                    renderItem={({ item, index }) => {
                        return (
                            <DrawerItem onClick={() => {
                                if(index == 0){
                                    this.props.navigation.navigate('HomePage')
                                }else if(index ==  1){
                                    this.props.navigation.navigate('WhoWeAre', { geha: item })
                                }else if(index ==  2){
                                    this.props.navigation.navigate('ContactUs', { geha: item })
                                }else if(index ==  3){
                                    this.props.Logout();
                                    this.props.navigation.replace('Login')
                                }
                                this.setState({ selectedIndex: index })
                            }} item={item} selected={this.state.selectedIndex == index} index={index} />
                        )
                    }}
                />

            </View >
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray,
        overflow: 'hidden'
    },

});




const mapStateToProps = state => {
    return {
    gehat: state.userReducer.gehat,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        Logout: (attribute) => dispatch(Logout(attribute)),
    };
  }



export default connect(mapStateToProps, mapDispatchToProps)(Drawer)

