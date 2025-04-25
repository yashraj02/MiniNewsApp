import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import NewsList from './components/NewsList';
import AdBanner from './components/AdBanner';
import {GoogleMobileAds} from 'react-native-google-mobile-ads';
import {loadInterstitialAd, loadRewardedAd} from './ads/AdManager';

GoogleMobileAds()
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
