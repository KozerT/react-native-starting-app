import { View } from "@/src/components/Themed";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import Colors from "@/src/constants/Colors";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <FlatList
      data={orders}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },

  contentContainer: {
    gap: 10,
    padding: 10,
  },
});
