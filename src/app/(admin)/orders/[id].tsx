import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';

import OrderItemListItem from '@/src/components/OrderItemListItem';

const OrderDetailsScreen = () => {
  const {id} = useLocalSearchParams();

  const order = orders.find((item)=>item.id.toString() === id);

  if(!order){
    return <Text>Not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: `Order: #${id}`}}/>
   <FlatList data={order.order_items}
    renderItem={({item})=> <OrderItemListItem item={item}/>}
    contentContainerStyle={{gap:10}}
    ListHeaderComponent={()=> <OrderListItem order={order}/>}  // If we need to scroll everything with the Header!
    // ListFooterComponent={()=> <OrderListItem order={order}/>} // alternatively footer component also could be added!
    />
    </View>
  )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,

  }
})