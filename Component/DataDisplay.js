import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import theme from '../assets/theme'


export const Title = styled.Text`
    font-size:23px;
    font-weight:700;
    font-family:"NotoRegular";
`

export const RoundEdgeView = styled.View`
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    flex-shrink: 1;
    background-color:${theme.color.foreground};
    padding-top:8px;
    padding-bottom:8px;
    padding-left:20px;
    padding-right:15px;
    border-radius:10px;

`
export const TextInputBox = styled.TextInput`
    flex:1;
    height:100%;

`



const AvatarContainerInner = styled.View`
    background-color:rgba(209, 209, 224,.5);
    border-radius:50px;
    padding:8px;
    width:45px;
    height:45px;
    justify-content:center;
    align-items:center;
    margin-right:10px;

`
export const AvatarContainer =(props)=>(
    <TouchableOpacity onPress={props.onPress}>
        <AvatarContainerInner {...props}>
                {props.children}
        </AvatarContainerInner>
    </TouchableOpacity>
)


export const TextButton = (props)=>(
    <TouchableOpacity {...props}>
        <Text style={{
            color:theme.color.white
        }}>
            {props.children}
        </Text>
    </TouchableOpacity>
)