import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { defaultImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/providers/CartProvider";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PizzaSize } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import { useProduct } from "@/src/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    data: product,
    error,
    isLoading,
  } = useProduct(parseInt(typeof id === "string" ? id : id![0]));

  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={20}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultImage }}
        style={styles.image}
      />
      <Text style={styles.title}>${product.name}</Text>

      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: { width: "90%", aspectRatio: 1 },
  price: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 24 },
});
