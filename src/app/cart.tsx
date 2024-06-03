import { View, Platform, FlatList, Button, TouchableOpacity, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import { useNavigation } from '@react-navigation/native';



const CartScreen = () => {
    const {items} = useCart(); 
    const navigation = useNavigation()


   const handleOnClose = () => {
    navigation.goBack();
   } 

  

  return (
    <View>
      <FlatList data={items}  renderItem={({item}) => <CartListItem cartItem={item}/> }/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Button title="Close Cart" onPress={handleOnClose} />
    </View>
  )
}

export default CartScreen