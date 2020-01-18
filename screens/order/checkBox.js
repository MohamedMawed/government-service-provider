import React from 'react';

import {
    Text, View,
    TouchableOpacity,
} from 'react-native';
import { colors, metrics, fonts } from './../../themes';
import Feather from 'react-native-vector-icons/Feather'
const CheckBox = (
    { text, Selected, style,onCheck
    }
) => {
    return (
        <TouchableOpacity onPress={onCheck} style={[{ flexDirection: 'row' , width:'100%',justifyContent:'flex-end' }, style]}>
            <Text style={{ marginHorizontal: metrics.screenWidth * .02, color: colors.darkBlue ,fontFamily : fonts.type.normal , includeFontPadding:false, fontSize: fonts.size.h5 }}>{text}</Text>

            <View style={{ width: metrics.screenWidth * .065, height: metrics.screenWidth * .065, borderRadius: metrics.screenWidth * .035, borderWidth: !Selected ? 1 : undefined, borderColor: colors.darkGray, backgroundColor: Selected ? 'red' : undefined, alignItems: 'center', justifyContent: 'center' }}>
                {Selected && <Feather name='check' color={colors.white} size={metrics.screenWidth * .06} />}

            </View>

        </TouchableOpacity>
    );
};

export default CheckBox;
