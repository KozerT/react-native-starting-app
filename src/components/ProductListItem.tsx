import { Image, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { Product } from '../app/types';
import { Link, useSegments } from 'expo-router';

export const defaultImage= 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png';


type ProductListItemProps = {
    product: Product;
    
}

const ProductListItem: React.FC<ProductListItemProps> = ({product}) => {
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
    <Image source={{uri: product.image || defaultImage}}style={styles.image} resizeMode='contain'/>
    <Text style={styles.title}>{product.name}</Text>
    <Text >${product.price}</Text>
  </Pressable>
  </Link>
  )
}


export default ProductListItem;



const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 18.5,
      flex: 1,
      maxWidth: '50%'
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
  