import { Alert } from "react-native";
import { supabase } from "./supabase";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

export const fetchPaymentSheetParams = async (amount: number) => {
const {data, error} = await supabase.functions.invoke('payment-sheet', {body: {amount}});

if(data){
    return data;
}

Alert.alert('Error fetching payment sheet params');
return {}
}


export const initializePaymentSheet = async (amount: number) => {
    const {paymentIntent, publishableKey, customer, ephemeralKey } = await fetchPaymentSheetParams(amount);

    if(!paymentIntent || !publishableKey) return;

    const { error } = await initPaymentSheet({
        merchantDisplayName: "tet-ko.test",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        returnURL: 'yourapp://stripe-redirect',
        defaultBillingDetails: {
            name: 'Joe Doe',
        },
    })
    if (error) {
        console.error('Error initializing payment sheet:', error);
        return false;
      }
    
      return true;
}

export const openPaymentSheet  =  async() => {
    const{error} = await presentPaymentSheet();

    if(error){
        Alert.alert(error.message)
        return false
    }
    return true;

}