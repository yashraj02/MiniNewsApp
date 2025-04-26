import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import NewsList from './src/components/NewsList';
import AdBanner from './src/components/AdBanner';
import mobileAds from 'react-native-google-mobile-ads';
import {loadInterstitialAd, loadRewardedAd} from './src/ads/AdManager';

mobileAds()
  .initialize()
  .then(() => {
    loadInterstitialAd();
    loadRewardedAd();
  });

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <NewsList />
      <AdBanner />
    </SafeAreaView>
  );
}
