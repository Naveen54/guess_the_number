
import React from 'react';
import { Text,StyleSheet } from 'react-native';

const BasicText = props =>{
    return <Text style={{...styles.title,...props.style}}>{props.children}</Text>
}
const styles = StyleSheet.create({
        title:{
            fontFamily:'open-sans',
        }
})

export default BasicText;