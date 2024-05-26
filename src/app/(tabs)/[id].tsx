import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'


const ProductDetailsScreen = () => {
  
  const {id} = useLocalSearchParams()
  return (
    <View>
      <Text>Product details for id: {id}</Text>
    </View>
  )
}

export default ProductDetailsScreen
