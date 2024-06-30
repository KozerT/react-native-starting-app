import { View } from "@/src/components/Themed";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import Colors from "@/src/constants/Colors";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import { useMyOrderList } from "@/src/api/orders";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch list </Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
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
