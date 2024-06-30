import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import Colors from "@/src/constants/Colors";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";
import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

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
