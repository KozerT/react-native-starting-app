 import { View } from '@/src/components/Themed';
import products from '@/assets/data/products';
import { FlatList, StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';
import ProductListItem from '@/src/components/ProductListItem';



export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <FlatList data={products} 
      renderItem={({item})=> <ProductListItem product={item}/>}
      numColumns={2}
      contentContainerStyle={{gap: 10, padding: 10}}
      columnWrapperStyle={{gap:10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },

});
