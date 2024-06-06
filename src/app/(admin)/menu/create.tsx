import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import InputWithLabel from '@/src/components/InputWithLabel'
import Button from '@/src/components/Button'
import { Product } from '../../types'
import { defaultImage } from '@/src/components/ProductListItem'
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/src/constants/Colors'


type CreateProductScreenProps = {
  OnCreate: () => void;
  products: Product[];

}

const CreateProductScreen:React.FC<CreateProductScreenProps>  = ({ products}) => {
  const [name, setName] = useState('');
  const [price, setPrice]= useState('');
  const [errors, setErrors] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };


  //TODO: find a replace react-native-form library;
const resetFields = () => {
  setName('');
  setPrice('');
};

//TODO: find and improve with the validation library;

const validateInput = () => {
  setErrors('');
   if(!name){
    setErrors('Name is required!');
    return false
   }

   if(!price){
    setErrors("Price is required!")
   }
   if(isNaN(parseFloat(price))){
    setErrors('Price is not a number')
    return false;
   }

   return true;
}


  const OnCreate = () => {
    if(!validateInput()){
      return false;
    }
    console.log("Create a product");
    resetFields();

  }


  return (
    <View style={styles.container}>
      <Image source={{uri:  selectedImage || defaultImage }} style={styles.image}/>
      <Text style={styles.textBtn} onPress={pickImage}>Select Image</Text>
      <InputWithLabel label='create' placeholder='Name' value={name} onChangeText={setName} /> 
      <InputWithLabel label='create' placeholder='9.99'  keyboardType='numeric' value={price} onChangeText={setPrice}  /> 
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={OnCreate} text='Create' />

    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({
  container : {
     flex:1,
     justifyContent: 'center',
     padding: 10
  },

  error : {
   color: 'red'
  },

  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textBtn: {
    alignSelf: 'center',
    fontWeight: '700',
    color: Colors.light.tint,
    marginVertical: 12, 
  }

})