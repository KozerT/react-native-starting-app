import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import InputWithLabel from '@/src/components/InputWithLabel'

const CreateProductScreen = () => {
  return (
    <View style={styles.container}>
   
      <InputWithLabel label='create' placeholder='Name'  /> 
      <InputWithLabel label='create' placeholder='9.99'  keyboardType='numeric' /> 

    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({
  container : {
     flex:1,
     justifyContent: 'center',
     padding: 10
  },


})