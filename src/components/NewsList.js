import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  View,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  showInterstitialAd,
  showRewardedAd,
  setOnAdClosed,
} from '../ads/AdManager';
import Config from 'react-native-config';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showFullArticle, setShowFullArticle] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const resp = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${Config.NEWS_API_KEY}`,
        );
        const data = await resp.json();
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    setOnAdClosed(() => {
      console.log('Ad closed, opening article...');
      if (selectedArticle) {
        setShowFullArticle(true);
      }
    });
  }, [selectedArticle]);

  const handleItemPress = item => {
    setSelectedArticle(item);
    Alert.alert(item.title, 'Watch an ad to unlock full article', [
      {
        text: 'Interstitial',
        onPress: () => showInterstitialAd(),
      },
      {
        text: 'Rewarded',
        onPress: () => showRewardedAd(),
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Header */}
      <View
        style={{
          padding: 20,
          backgroundColor: '#007bff',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}>
          📰 Welcome to Quick news!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            marginTop: 4,
          }}>
          Stay informed with top headlines
        </Text>
      </View>

      {/* News List */}
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item)}
            style={{
              padding: 16,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
            }}>
            <Text style={{color: 'black', fontSize: 16}}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={showFullArticle}
        animationType="slide"
        onRequestClose={() => setShowFullArticle(false)}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          {/* Header */}
          <View
            style={{
              height: 60,
              backgroundColor: '#007bff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity onPress={() => setShowFullArticle(false)}>
              <Text style={{color: 'white', fontSize: 18}}>← Back</Text>
            </TouchableOpacity>

            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Full Article
            </Text>
          </View>

          {/* WebView */}
          {selectedArticle?.url ? (
            <WebView
              source={{uri: selectedArticle.url}}
              style={{flex: 1}}
              startInLoadingState={true}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>No Article URL</Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default NewsList;
