import React , {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Image ,Dimensions,ScrollView} from 'react-native';
import Colors from '../constants/colors';
import BasicText from '../components/BasicText';
import HeaderTitle from '../components/HeaderTitle';
import MainButton from '../components/MainButton';
const GameOverScreen = (props) => {
  const { round, userNumber, newGame } = props;
  const [actualDeviceWidth,setActualDeviceWidth] = useState(Dimensions.get("window").width)
  const [actualDeviceHeight,setActualDeviceHeight] = useState(Dimensions.get("window").height)
  useEffect(()=>{
     const  updateLayout = ()=>{
        setActualDeviceWidth(Dimensions.get("window").width)
        setActualDeviceHeight(Dimensions.get("window").height)
      }
      Dimensions.addEventListener("change",updateLayout)
      return () =>{
        Dimensions.removeEventListener("change",updateLayout)
      }
  })
  return (
    <ScrollView>
    <View style={styles.screen}>
      <HeaderTitle>The Game is Over</HeaderTitle>
      <View style={{...styles.imageContainer,width:actualDeviceWidth * 0.7,
    height: actualDeviceWidth * 0.7, borderRadius:actualDeviceWidth * 0.7 /2,marginVertical:actualDeviceHeight / 30}}>
        <Image
          style={styles.image}
          fadeDuration={1000}
          // source={require('../assets/success.png')}
          source={{
            uri: 'https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/afsxs3xawu4w0o62_1603716952.jpeg',
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BasicText style={styles.resultText}>
          Your Phone needed <Text style={styles.highlight}>{round}</Text> rounds
          to guess the number <Text style={styles.highlight}>{userNumber}</Text>
        </BasicText>
      </View>

      <MainButton onPress={newGame}>New Game</MainButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({ 
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:10
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  highlight: {
    color: Colors.accent,
    fontFamily: 'open-sans-bold',
  },
  resultText: {
    textAlign:'center',
    fontSize:Dimensions.get('window').height < 400 ? 16:20,
  },
  resultContainer:{
    marginHorizontal:30,
    marginVertical:Dimensions.get("window").height / 60
  }
});

export default GameOverScreen;
