import { View } from "@/src/components/Themed";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Colors from "@/src/constants/Colors";
import ProductListItem from "@/src/components/ProductListItem";
import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native-elements";

export default function MenuScreen() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
});
