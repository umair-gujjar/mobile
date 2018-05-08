// @flow

import * as React from 'react';
import { Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { StylePropType } from '@kiwicom/mobile-shared';

// We need loadFont for CocoaPods
// See https://github.com/oblador/react-native-vector-icons#option-with-cocoapods
if (Platform.OS === 'ios') {
  MaterialIcons.loadFont();
}

import Color from '../Color';

type Props = {|
  name: string,
  size: number,
  color?: string,
  style?: StylePropType,
|};

/**
 * Currently only supported package is "MaterialIcons".
 * @see https://material.io/icons/
 */
function Icon(props: Props) {
  return <MaterialIcons {...props} />;
}

Icon.defaultProps = {
  color: Color.grey.$600,
};

export default Icon;
