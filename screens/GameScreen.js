import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList,Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BasicText from '../components/BasicText';
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderListitem = (listLength,itemData) =>(
<View style={styles.listItem}>
  <BasicText>#{listLength- itemData.index}</BasicText>
  <BasicText>{itemData.item}</BasicText>
  </View>
)
const GameScreen = (props) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  const initialGuess =  generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPassGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceHeight,setAvailableDeviceHeight] = useState(Dimensions.get("window").height)
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  useEffect(()=>{
      const updateLayout = () =>{
        setAvailableDeviceHeight(Dimensions.get('window').height);
      }
      Dimensions.addEventListener("change",updateLayout)
      return ()=>{
        Dimensions.removeEventListener("change",updateLayout)
      }
  })
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You Know that this is Wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPassGuesses((pastGuess) => [nextNumber.toString(),...pastGuess]); 
  };
  if( availableDeviceHeight < 500)
  {
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <FontAwesome5 name="less-than" size={24}/>
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
        <FontAwesome5 name="greater-than" size={24}/>
        </MainButton>
        </View>
      <View style={styles.listContainer}>
      {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess,index)=>renderListitem(guess,pastGuesses.length-index))}
      </ScrollView> */}
      <FlatList 
      keyExtractor={(item)=>item} 
      data={pastGuesses} 
      renderItem={renderListitem.bind(this,pastGuesses.length)}
      contentContainerStyle={styles.list}/>
      </View>

    </View>
  );
    }
    else{
      return (
        <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <FontAwesome5 name="less-than" size={24}/>
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
        <FontAwesome5 name="greater-than" size={24}/>
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
      {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess,index)=>renderListitem(guess,pastGuesses.length-index))}
      </ScrollView> */}
      <FlatList 
      keyExtractor={(item)=>item} 
      data={pastGuesses} 
      renderItem={renderListitem.bind(this,pastGuesses.length)}
      contentContainerStyle={styles.list}/>
      </View>

    </View>
      )
    }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height >600 ? 20:5,
    width: 400,
    maxWidth: '90%',
  },
  listItem:{
      borderColor:'#CCC',
      borderWidth:1,
      padding:15,
      marginVertical:10,
      backgroundColor:'white',
      flexDirection:'row',
      justifyContent:'space-around',
      width:'100%',

  },
  listContainer:{
    width:Dimensions.get("window").width > 350 ?'60%':'80%',
    flex:1,
  }, 
  list:{
    // alignItems:"center",
    justifyContent:'flex-end',
    flexGrow:1

  },
  controls:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'80%'
  }
});

export default GameScreen;
