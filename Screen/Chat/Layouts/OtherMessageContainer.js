import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import styled from 'styled-components/native'
import theme from '../../../assets/theme'
import { TimeText } from '../DataDisplay'



const Message = styled.View`
    background-color:${theme.color.background};
    padding:10px;
    margin-top:10px;
    border-bottom-left-radius:${(props)=>props.last?0:20}px;
    border-bottom-right-radius:20px;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    width:${theme.percentageWidth(60)}px;
`




const OtherMessageContainer = (props) => {
    return (
        <View style={{
            flexDirection:'row',
            alignItems:'flex-end',
        }}>
            <Avatar
                rounded
                containerStyle={{
                    marginRight:10
                }}
                size={'small'}
                
                source={{
                    uri:props.imageSource
                }}
                />
                <View>
                    {
                        [...new Array(2)].map((value,index,array)=>(
                            <View 
                            key={index+1000}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                
                            }}>
                                <Message  last={index===array.length-1}>
                                    <Text>
                                        hello how are you i hop all is well with the look of thing am assuming you know what you are saying
                                    </Text>
                                </Message>
                                <TimeText>
                                    20:10
                                </TimeText>

                            </View>
                        ))
                    }
                </View>
        </View>
    )
}

export default OtherMessageContainer
