import React from 'react';
import { TextInput, StyleSheet} from 'react-native';

export default function InputBox({value, changeText, addTodo}) {
    return(
        <TextInput
            value={value}
            onChangeText={changeText}
            onEndEditing={addTodo}
            /*10 - 12는 공식문서에서 제공하는 형식따름*/
            style={styles.input}
            placeholder={"Enter the message"}
            returnKeyType="done"/> 
    );
};

const styles = StyleSheet.create({

    input: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    },
    });