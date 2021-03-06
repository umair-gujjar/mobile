// @flow

import * as React from 'react';
import { View } from 'react-native';
import { Text, Icon, StyleSheet, Color } from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  text: {
    alignSelf: 'center',
    marginLeft: 5,
    fontWeight: '600',
  },
});

export default function YourLocation() {
  return (
    <View style={styles.container}>
      <Icon name="gps-fixed" size={20} color={Color.brand} />
      <Text style={styles.text}>
        <Translation id="hotels_search.location_picker.your_location" />
      </Text>
    </View>
  );
}
