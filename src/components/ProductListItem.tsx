import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import products from '@/assets/fonts/data/products';

const ProductListItem = ({product}) => {
  return (
    <View style={styles.container}>
    <Image source={{uri: product.image}}style={styles.image}/>
    <Text style={styles.title}>{product.name}</Text>
    <Text >${product.price}</Text>
  </View>
  )
}


export default ProductListItem;



const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 18.5,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    price: {
     color: Colors.light.tint,
     fontWeight: 'bold'
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      
    }
  
  });
  