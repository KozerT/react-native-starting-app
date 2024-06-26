import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'


type InputWithLabelProps = {
    placeholder: string;
    keyboardType?: KeyboardTypeOptions | undefined;
    labelStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>;
    label: string;
    value?: string | undefined ;
    onChangeText?: ((text: string) => void) | undefined
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({placeholder,
    keyboardType,
    label,
    labelStyle,
    inputStyle,
    value,
    onChangeText,
     }) => {
  return (
    <View>
     <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput placeholder={placeholder} style={[styles.input, inputStyle]}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default InputWithLabel

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white', 
        padding: 10,
        borderRadius: 6,
        marginBottom: 20,
        marginTop: 6,
      },
      label: {
        color: 'gray',
        fontSize: 16,
    
      }
})