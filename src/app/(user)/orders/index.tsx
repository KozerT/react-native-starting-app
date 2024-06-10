 import { View } from '@/src/components/Themed';
import { FlatList, StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Stack } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';



export default function OrdersScreen() {
  return (
    <>
    <Stack.Screen options={{ title: 'Orders' }} />
    <FlatList
      data={orders}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
 
});
