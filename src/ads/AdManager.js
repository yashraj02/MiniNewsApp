import {
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

let interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
let rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

export const loadInterstitialAd = () => {
  interstitialAd.load();
  console.log('Interstitial loaded');
};

export const showInterstitialAd = () => {
  if (interstitialAd.loaded) {
    interstitialAd.show();
  } else {
    console.log('Interstitial not ready yet');
  }
};

export const loadRewardedAd = () => {
  rewardedAd.load();
  console.log('Rewarded loaded');
  rewardedAd.addEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
    console.log('User earned reward of ', reward.amount);
  });
};

export const showRewardedAd = () => {
  if (rewardedAd.loaded) {
    rewardedAd.show();
  } else {
    console.log('Rewarded ad not ready');
  }
};
