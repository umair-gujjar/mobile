// @flow

import * as React from 'react';
import { View } from 'react-native';
import {
  ButtonPopup,
  Color,
  Checkbox,
  Icon,
  StyleSheet,
  Text,
} from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';

type Props = {|
  facilities: string[],
  onClose: () => void,
  onSave: (string[]) => void,
  isVisible: boolean,
|};

type State = {|
  facilities: string[],
|};

const facilitiesList = {
  airportShuttle: { text: 'Airport shuttle', icon: 'airport-shuttle' },
  familyRooms: { text: 'Family rooms', icon: 'child-friendly' },
  facilitiesForDisabled: {
    text: 'Facilities for Disabled Guests',
    icon: 'accessible',
  },
  fitnessCenter: { text: 'Fitness Center', icon: 'fitness-center' },
  parking: { text: 'Parking', icon: 'directions-car' },
  freeParking: { text: 'Free Parking', icon: 'directions-car' },
  valetParking: { text: 'Valet Parking', icon: 'directions-car' },
  indoorPool: { text: 'Indoor Pool', icon: 'pool' },
  petsAllowed: { text: 'Pets allowed', icon: 'pets' },
  spa: { text: 'Spa', icon: 'spa' },
  wifi: { text: 'Wi-Fi', icon: 'wifi' },
};

export default class HotelFacilitiesPopup extends React.Component<
  Props,
  State,
> {
  state = {
    facilities: this.props.facilities,
  };

  static getDerivedStateFromProps = ({ facilities }: Props) => ({ facilities });

  handleCheckboxOnPress = (option: string) => () =>
    this.setState(state => {
      let facilities = [...state.facilities];
      if (facilities.indexOf(option) >= 0) {
        facilities = facilities.filter(facility => facility !== option);
      } else {
        facilities.push(option);
      }
      return { facilities };
    });

  onSave = () => this.props.onSave(this.state.facilities);

  renderCheckboxes = (facilities: string[]) => {
    const checkboxes = [];
    const facilitiesListKeys = Object.keys(facilitiesList);
    facilitiesListKeys.forEach((key, i) => {
      const facility = facilitiesList[key];
      checkboxes.push(
        <Checkbox
          key={i}
          isChecked={facilities.indexOf(key) >= 0}
          onPress={this.handleCheckboxOnPress(key)}
          style={i < facilitiesListKeys.length - 1 && styles.delimiter}
        >
          <View style={styles.checkbox}>
            <Icon name={facility.icon} size={20} style={styles.facilityIcon} />
            <Translation passThrough={facility.text} />
          </View>
        </Checkbox>,
      );
    });
    return checkboxes;
  };

  render() {
    const { facilities } = this.state;
    return (
      <ButtonPopup
        buttonTitle={
          <Translation id="hotels_search.filter.hotel_facilities_popup.save" />
        }
        onSave={this.onSave}
        onClose={this.props.onClose}
        isVisible={this.props.isVisible}
      >
        <Text style={styles.title}>
          <Translation id="hotels_search.filter.hotel_facilities_popup.title" />
        </Text>
        {this.renderCheckboxes(facilities)}
      </ButtonPopup>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: Color.grey.$800,
    paddingBottom: 5,
  },
  delimiter: {
    borderBottomWidth: 1,
    borderBottomColor: Color.grey.$300,
  },
  checkbox: {
    flexDirection: 'row',
  },
  facilityIcon: {
    marginRight: 10,
  },
});
