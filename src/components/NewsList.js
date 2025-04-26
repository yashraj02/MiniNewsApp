import React from 'react';
import {FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import {showInterstitialAd, showRewardedAd} from '../ads/AdManager';

const news = Array.from({length: 10}, (_, i) => ({
  id: i.toString(),
  title: `News item ${i + 1}`,
}));

const NewsList = () => {
  const handleItemPress = item => {
    Alert.alert(item.title, 'Do you want to watch an ad to unlock more?', [
      {
        text: 'Interstitial',
        onPress: () => showInterstitialAd(),
      },
      {
        text: 'Rewarded',
        onPress: () => showRewardedAd(),
      },
    ]);
  };

  return (
    <FlatList
      data={news}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => handleItemPress(item)}
          style={{
            padding: 16,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          }}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default NewsList;
