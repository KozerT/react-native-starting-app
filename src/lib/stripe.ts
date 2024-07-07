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
    console.log('Initialized payment sheet for: ', amount);

    const {paymentIntent, publishableKey } = await fetchPaymentSheetParams(amount);

    if(!paymentIntent || !publishableKey) return;

    await initPaymentSheet({
        merchantDisplayName: "tet-ko.test",
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
            name: 'Joe Doe',
        },
    })
}

export const openPaymentSheet  =  async() => {
    const{error} = await presentPaymentSheet();
    if(error){
        Alert.alert(error.message)
        return false
    }
    return true;

}