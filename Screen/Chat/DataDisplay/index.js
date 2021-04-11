import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import theme from '../../../assets/theme'



export const TimeText = styled.Text`
    margin-bottom:-10px;
    margin-right:${(props)=>!!props.right?50:0}px;
    margin-left:${(props)=>props.right?0:10}px;
    color:${theme.color.grey};
    font-size:13px;

`



