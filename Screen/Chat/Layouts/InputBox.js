import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Input } from 'react-native-elements'
import pt from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import theme from '../../../assets/theme'
import styled from 'styled-components/native';


const Container = styled.View`
    flex-direction:row;
    height:60px;
    justify-content:center;
    align-items:center;
    border-radius:50px;
    background-color:${theme.color.background};
    padding-left:20px;
`

const IconButton = styled.TouchableOpacity`
    background-color:#02949E;
    height:40px;
    width:40px;
    justify-content:center;
    align-items:center;
    border-radius:50px;
    padding:20px;
    margin:6px;
`

function InputBox(props) {
    return (
        <Container style={props.style||{}}>
            <TextInput 
                placeholder="Type your message"
                style={{
                    flex:1,
                    height:30,
                     elevation:20,
                     
                    
                }}
                value={props.value}
                onChangeText={props.handleChange}
             />
             <IconButton onPress={props.handleSubmit} >
                <Ionicons color={theme.color.white} size={25} name={'send'} />
             </IconButton>

               
        </Container>
    )
}

InputBox.defaultProps = {
    value:'',
}

InputBox.propTypes = {
    style:pt.object,
    handleChange:pt.func.isRequired
}

export default InputBox