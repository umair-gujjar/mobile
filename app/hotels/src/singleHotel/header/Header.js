// @flow

import * as React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import {
  StyleSheet,
  NetworkImage,
  StretchedImage,
  Text,
  Touchable,
  AdaptableLayout,
  Device,
  BlackToAlpha as gradient,
} from '@kiwicom/mobile-shared';
import idx from 'idx';
import { createFragmentContainer, graphql } from 'react-relay';
import { Translation } from '@kiwicom/mobile-localization';

import GalleryButton from '../galleryButton/GalleryButton';
import Rating from './Rating';
import type { Image as GalleryGridImage } from '../../gallery/GalleryGrid';
import type { Header_hotel } from './__generated__/Header_hotel.graphql';

const height = Platform.select({
  android: Device.isWideLayout() ? 150 : 200,
  ios: 150,
});

const styles = StyleSheet.create({
  picture: {
    height: height,
  },
  galleryButton: {
    position: 'absolute',
    right: 10,
    android: {
      top: Device.isWideLayout() ? 10 : StatusBar.currentHeight + 16,
    },
    ios: {
      top: 10,
    },
  },
  nameAndRatingContainer: {
    height: height,
    marginTop: -height,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  nameAndRating: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  hotelName: {
    backgroundColor: 'transparent',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.45,
    color: '#ffffff',
  },
  rating: {
    backgroundColor: 'transparent',
    fontSize: 12,
    color: '#ffffff',
  },
  tabletContainer: {
    android: {
      paddingHorizontal: 8,
    },
  },
});

type ContainerProps = {|
  openGallery: (hotelName: string, images: GalleryGridImage[]) => void,
  hotel: any,
|};

export type Props = {
  ...ContainerProps,
  hotel: ?Header_hotel,
};

export class Header extends React.Component<Props> {
  openGallery = () => {
    const { hotel, openGallery } = this.props;
    const photosEdges = idx(hotel, _ => _.photos.edges) || [];
    const images = photosEdges.map(edge => ({
      key: idx(edge, _ => _.node.id) || '',
      lowRes: idx(edge, _ => _.node.lowResUrl) || '',
      highRes: idx(edge, _ => _.node.highResUrl) || '',
    }));
    const hotelName = idx(hotel, _ => _.name);

    if (typeof hotelName === 'string') {
      openGallery(hotelName, images);
    }
  };

  renderHeader = () => {
    const { hotel } = this.props;
    const mainPhotoUrl = idx(hotel, _ => _.mainPhoto.highResUrl);
    const photosCount = idx(hotel, _ => _.photos.edges.length);
    return (
      <Touchable onPress={this.openGallery}>
        <View>
          <NetworkImage style={styles.picture} source={{ uri: mainPhotoUrl }} />
          <View style={styles.nameAndRatingContainer}>
            <StretchedImage source={gradient} />
            <View style={styles.nameAndRating}>
              <Text style={styles.hotelName}>
                <Translation passThrough={idx(hotel, _ => _.name)} />
              </Text>
              <Text style={styles.rating}>
                <Rating
                  stars={idx(hotel, _ => _.rating.stars)}
                  score={idx(hotel, _ => _.review.score)}
                  description={idx(hotel, _ => _.review.description)}
                />
              </Text>
            </View>
          </View>
          {photosCount && (
            <View style={styles.galleryButton}>
              <GalleryButton count={photosCount} />
            </View>
          )}
        </View>
      </Touchable>
    );
  };

  render = () => {
    const header = this.renderHeader();
    return (
      <AdaptableLayout.Consumer
        renderOnNarrow={header}
        renderOnWide={<View style={styles.tabletContainer}>{header}</View>}
      />
    );
  };
}

export default (createFragmentContainer(
  Header,
  graphql`
    fragment Header_hotel on Hotel {
      name
      mainPhoto {
        highResUrl
      }
      rating {
        stars
        categoryName
      }
      review {
        score
        description
      }
      photos {
        edges {
          node {
            id
            lowResUrl
            highResUrl
          }
        }
      }
    }
  `,
): React.ComponentType<ContainerProps>);
