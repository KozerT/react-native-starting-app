import products from '@/assets/data/products'
import Button from '@/src/components/Button'
import { defaultImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import { useCart } from '@/src/providers/CartProvider'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { PizzaSize } from '../../types'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL' ]

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const {addItem} = useCart();


  const {id} = useLocalSearchParams()

  const product = products.find((p)=> p.id.toString() === id);


  const addToCart  =  () => {
    if(!product){
      return
    }

   addItem(product, selectedSize)
  }

  if(!product){
    return <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name}}/>
      <Image source ={{uri: product.image || defaultImage}} style={styles.image}/> 
      <Text>Select size</Text>
      <View style={styles.sizes}>
      {sizes.map((size)=>(
      <Pressable onPress={()=> { setSelectedSize(size)}} style={[styles.size, {backgroundColor: selectedSize === size ? 'gainsboro' : 'white'}]} key={size}>
      <Text style={[styles.sizeText, {color: selectedSize=== size ? 'black' : 'grey'}]}>{size}</Text>
      </Pressable>
      ))}
     </View>
     <Text style={styles.price}>${product.price}</Text>
     <Button onPress={addToCart} text='Add to Cart'/>
    </View>


  )
}

export default ProductDetailsScreen


const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1, padding: 10},
  image: {width: '90%', aspectRatio: 1},
  price: {fontSize: 18, fontWeight: 'bold', marginTop:'auto'},
  sizes: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 14},
  size: { backgroundColor: 'gainsboro', width: 50, aspectRatio: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center'},
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  }
})