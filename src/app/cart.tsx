import { View, Platform, FlatList,  Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';



const CartScreen = () => {
    const {items, total} = useCart(); 
    const navigation = useNavigation()


   const handleOnClose = () => {
    navigation.goBack();
   } 

  

  return (
    <View style={styles.layout}>
      <FlatList data={items}  renderItem={({item}) => <CartListItem cartItem={item}/> }/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text style={styles.textTotal}>Total: ${total}</Text>
      <Button text='Checkout' onPress={handleOnClose} />
    </View>
  )
}

const styles = StyleSheet.create( {
  layout: {
    padding: 10,
  },
  textTotal: {
   marginTop: 16,
   fontSize: 20,
   fontWeight:'500',
  
  }
}); 

export default CartScreen