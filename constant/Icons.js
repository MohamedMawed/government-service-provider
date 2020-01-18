import React, { Component } from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';



closecircleo=({size=18,color="#000",onPress})=>{
    return(
        <AntDesign
        name="closecircleo"
        size={size}
        onPress={onPress}
        color={color}
        />
    )
}
iosArrowDown=({size=18,color="#000",onPress,style})=>{
    return(
        <Ionicons
        name="ios-arrow-down"
        size={size}
        onPress={onPress}
        color={color}
        style={style}
        />
    )
}
search=({size=18,color="#000",onPress})=>{
    return(
        <EvilIcons
         name="search"
         size={size}
         onPress={onPress}
         color={color}/>
    )
}

menu=({size=18,color="#000",onPress})=>{
    return(
        <Ionicons
         name="ios-menu"
         onPress={onPress}
         size={size}
         color={color}/>
    )
}
minuscircle=({size=16,color="#000",onPress,style=style})=>{
    return(
        <AntDesign
         name="minuscircle"
         size={size}
         onPress={onPress}
         color={color}
         style={style}/>
    )
}

back=({size=18,color="#000",onPress})=>{
    return(
        <Ionicons
         name="md-arrow-back"
         onPress={onPress}
         size={size}
         color={color}/>
    )
}
star=({size=18,color="#000",onPress,style})=>{
    return(
        <Entypo
         name="star"
         onPress={onPress}
         size={size}
         color={color}
         style={style}/>
    )
}
addressLocation=({size=18,color="#000",onPress,style})=>{
    return(
        <Entypo
         name="location-pin"
         onPress={onPress}
         size={size}
         color={color}
         style={style}/>
    )
}

filter=({size=18,color="#000",onPress,style})=>{
    return(
        <Feather
         name="filter"
         size={size}
         onPress={onPress}
         color={color}/>
    )
}
close=({size=18,color="#000",onPress})=>{
    return(
        <AntDesign
         name="close"
         size={size}
         onPress={onPress}
         color={color}/>
    )
}
caretright=({size=18,color="#000",onPress})=>{
    return(
        <AntDesign
         name="caretright"
         size={size}
         onPress={onPress}
         color={color}/>
    )
}
right=({size=18,color="#000",onPress,style})=>{
    return(
        <Ionicons
         name="ios-arrow-forward"
         onPress={onPress}
         size={size}
         color={color}/>
    )
}
check=({size=18,color="#000",onPress,style})=>{
    return(
        <AntDesign
         name="check"
         size={size}
         onPress={onPress}
         color={color}
         style={style}/>
    )
}
iosArrowUp=({size=18,color="#000",onPress,style})=>{
    return(
        <Ionicons
        name="ios-arrow-up"
        size={size}
        onPress={onPress}
        color={color}
        style={style}
        />
    )
}

export const Icons={
    iosArrowUp:(props)=>iosArrowUp(props),
    iosArrowDown:(props)=>iosArrowDown(props),
    closecircleo:(props)=>closecircleo(props),
    minuscircle:(props)=>minuscircle(props),
    back:(props)=>back(props),
    search:(props)=>search(props),
    menu:(props)=>menu(props),
    filter:(props)=>filter(props),
    star:(props)=>star(props),
    close:(props)=>close(props),
    caretright:(props)=>caretright(props),
    right:(props)=>right(props),
    check:(props)=>check(props),
    location:(props)=>addressLocation(props),

}