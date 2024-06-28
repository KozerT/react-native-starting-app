import { View } from "@/src/components/Themed";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Colors from "@/src/constants/Colors";
import ProductListItem from "@/src/components/ProductListItem";
import { Text } from "react-native-elements";
import { useProductList } from "@/src/api/products";
import { Product } from "../../types";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

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
