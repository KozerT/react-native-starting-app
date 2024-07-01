import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputWithLabel from "@/src/components/InputWithLabel";
import Button from "@/src/components/Button";
import { Product } from "../../types";
import { defaultImage } from "@/src/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/src/constants/Colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";

import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/src/lib/supabase";
import { decode } from "base64-arraybuffer";

type CreateProductScreenProps = {
  OnCreate: () => void;
  products: Product[];
};

const CreateProductScreen: React.FC<CreateProductScreenProps> = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = idString ? parseFloat(idString as string) : null;
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct, isLoading } = useProduct(id as number);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  //TODO: find a replace react-native-form library;
  const resetFields = () => {
    setName("");
    setPrice("");
    setImage(null);
  };

  //TODO: find and improve with the validation library;

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required!");
      return false;
    }

    if (!price) {
      setErrors("Price is required!");
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (isUpdating) {
      await onUpdate();
    } else {
      await onCreate();
    }
  };

  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();
    updateProduct(
      {
        id: id as number,
        name,
        price: parseFloat(price),
        image: imagePath || image,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
        onError: (error) => {
          console.error("Error updating product: ", error);
        },
      }
    );
  };

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      const imagePath = await uploadImage();

      const newProduct: Omit<Product, "id"> = {
        name,
        price: parseFloat(price),
        image: imagePath || image,
      };

      insertProduct(newProduct, {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      });
    } catch (error) {
      console.error("Error creating product: ", error);
    }
  };

  const onDelete = () => {
    deleteProduct(id as number, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)/menu/");
      },
      onError: (error) => {
        console.error("Error deleting product: ", error);
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you wanna delete this product?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    try {
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
      const filePath = `${randomUUID()}.png`;
      const contentType = "image/png";
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(filePath, decode(base64), { contentType });

      if (error) {
        console.error("Upload error: ", error.message);
        return;
      }
      return data.path;
    } catch (error) {
      console.error("Unexpected error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image source={{ uri: image || defaultImage }} style={styles.image} />
      <Text style={styles.textBtn} onPress={pickImage}>
        Select Image
      </Text>
      <InputWithLabel
        label="create"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <InputWithLabel
        label="create"
        placeholder="9.99"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textBtn}>
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },

  error: {
    color: "red",
  },

  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textBtn: {
    alignSelf: "center",
    fontWeight: "700",
    color: Colors.light.tint,
    marginVertical: 12,
  },
});
