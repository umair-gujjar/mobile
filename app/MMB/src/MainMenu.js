// @flow

import * as React from 'react';
import { ScrollView } from 'react-native';
import { TextIcon, Color, StyleSheet } from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';

import MenuItem from './components/menu/MenuItem';
import TitledMenuGroup from './components/menu/TitledMenuGroup';

type Props = {|
  openMenu: string => void,
|};

export default class MainMenu extends React.Component<Props> {
  handleOpenHelpSubmenu = () => {
    this.props.openMenu('mmb.help');
  };

  handleOpenOtherSubmenu = () => {
    this.props.openMenu('mmb.other');
  };

  render = () => {
    return (
      <ScrollView>
        <TitledMenuGroup title={<Translation id="mmb.main_menu.manage" />}>
          <MenuItem
            onPress={this.handleOpenHelpSubmenu}
            icon={<TextIcon style={styleSheet.icon}>F</TextIcon>}
            title={<Translation id="mmb.main_menu.manage.help" />}
            description={
              <Translation id="mmb.main_menu.manage.help.description" />
            }
          />
          <MenuItem
            onPress={this.handleOpenOtherSubmenu}
            icon={<TextIcon style={styleSheet.icon}>&#xe07d;</TextIcon>}
            title={<Translation id="mmb.main_menu.manage.other" />}
            description={
              <Translation id="mmb.main_menu.manage.other.description" />
            }
          />
        </TitledMenuGroup>
      </ScrollView>
    );
  };
}

const styleSheet = StyleSheet.create({
  icon: {
    color: Color.grey.$600,
    android: {
      fontSize: 15,
    },
    ios: {
      fontSize: 14,
    },
  },
});
