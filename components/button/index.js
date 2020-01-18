import React from 'react';

import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import LinearGradient from 'react-native-linear-gradient';


import styles from './styling';
import { Width, Height } from '../../constant/dimention';

/* export const ButtonImage = ({
  onClick,
  backgroundImage,
  backgroundColor,
  svg,
  svgScaleFactor,
  fill,
  counter,
  stroke,
  raduis,
  myWidth,
  myHeight,
  imageHeight,
  imageWidth,
  myFill,
  myStroke,
  defaultImage
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={[
        styles.buttonImageContainer,
        {
          width: myWidth || '85%',
          height: myHeight || Height * 0.05,
          borderRadius: raduis,
          backgroundColor: backgroundColor || 'transparent'
        }
      ]}
    >
      {svg ? (
        <View
          style={{
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ scale: svgScaleFactor || 1.0 }]
          }}
        >
          {getSVG(
            (name = svg),
            (fill = myFill || null),
            (stroke = myStroke || 'black')
          )}
        </View>
      ) : (
        <Image
          source={backgroundImage}
          defaultSource={defaultImage}
          style={{
            width: imageWidth || '100%',
            height: imageHeight || '100%',
            borderRadius: raduis || 0,
            resizeMode: 'cover'
          }}
        />
      )}
      {counter ? (
        <View style={styles.counterIcon}>
          <Text style={styles.counterText}>{counter}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}; */

export const Button = ({ elevation, onClick, headerName, backgroundColor, raduis, myWidth, myHeight }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={[
        styles.buttonWithIconContainer,
        {
          width: myWidth || '85%',
          height: myHeight || Height * 0.05,
          borderRadius: raduis || 0,
          backgroundColor,
          elevation: elevation || 0
        }
      ]}
    >
      <Text style={styles.buttonText}>{headerName}</Text>
    </TouchableOpacity>
  );
};

export const ButtonWithIcon = ({
  onClick,
  iconName,
  headerName,
  backgroundColor,
  myWidth,
  raduis,
  myHeight
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={[
        styles.buttonWithIconContainer,
        {
          width: myWidth || '85%',
          height: myHeight || Height * 0.05,
          borderRadius: raduis || 0,
          backgroundColor
        }
      ]}
    >
      <FontAwesome
        size={Width * 0.06}
        name={iconName}
        style={styles.buttonIcon}
      />

      <Text style={styles.buttonText}>{headerName}</Text>
    </TouchableOpacity>
  );
};

// export const ButtonGradient = ({
//   onClick,
//   headerName,
//   backgroundColor,
//   myWidth,
//   raduis,
//   myHeight,
//   colors,
//   loading,
//   iconMode,
//   icon,
//   elevation,
//   textColor,
//   opacity,
//   textStyle,
//   disabled,
//   style
// }) => {
//   return (
//     <TouchableOpacity
//       disabled={loading} // {disabled === true}
//       activeOpacity={opacity || 0.7}
//       onPress={onClick}
//       style={{
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.25,
//         shadowRadius: 1
//       }}
//     >
//       <LinearGradient
//         start={metrics.gradientRtoOButtonStart}
//         end={metrics.gradientRtoOButtonEnd}
//         locations={[0, 1]}
//         colors={colors}
//         style={[
//           styles.buttonWithIconContainer,
//           {
//             width: myWidth || '90%',
//             height: myHeight || Height * 0.05,
//             borderRadius: raduis || 0,
//             backgroundColor,
//             elevation: elevation || 0
//           },
//           style
//         ]}
//       >
//         {!loading && (
//           <Text
//             allowFontScaling={false}
//             adjustsFontSizeToFit={true}
//             numberOfLines={1}
//             style={[
//               styles.buttonText,
//               {
//                 marginHorizontal: 10,
//                 fontSize: fonts.size.regular,
//                 color: textColor || '#fff'
//               },
//               textStyle
//             ]}
//           >
//             {headerName}
//           </Text>
//         )}

//         {!loading && iconMode && icon}

//         {loading && <ActivityIndicator color={'#fff'} size={'small'} />}
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// };
