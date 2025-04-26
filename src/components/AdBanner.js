import React from 'react';
import {View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const AdBanner = () => {
  return (
    <View style={{alignItems: 'center', marginVertical: 10}}>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{requestNonPersonalizedAdsOnly: true}}
      />
    </View>
  );
};

export default AdBanner;
