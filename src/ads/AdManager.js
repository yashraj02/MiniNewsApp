import {
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

let interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
let rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

let onAdClosedCallback = null;

export const loadInterstitialAd = () => {
  interstitialAd.load();
};

export const loadRewardedAd = () => {
  rewardedAd.load();
};

export const showInterstitialAd = () => {
  if (interstitialAd.loaded) {
    interstitialAd.show();
  } else {
    console.log('Interstitial not ready yet');
    interstitialAd.load(); // reload if not ready
  }
};

export const showRewardedAd = () => {
  if (rewardedAd.loaded) {
    rewardedAd.show();
  } else {
    console.log('Rewarded ad not ready');
    rewardedAd.load();
  }
};

export const setOnAdClosed = callback => {
  onAdClosedCallback = callback;

  interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
    interstitialAd.load();
    if (onAdClosedCallback) {
      onAdClosedCallback();
    }
  });

  rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
    rewardedAd.load();
    if (onAdClosedCallback) {
      onAdClosedCallback();
    }
  });

  rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
    console.log('User earned reward of ', reward.amount);
  });
};
