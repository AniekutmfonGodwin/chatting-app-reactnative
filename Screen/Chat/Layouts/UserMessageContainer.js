import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import styled from 'styled-components/native'
import theme from '../../../assets/theme'
import { TimeText } from '../DataDisplay'



const Message = styled.View`
    background-color:${theme.color.primary.opacity(.1)};
    padding:10px;
    margin-top:10px;
    border-bottom-left-radius:20px;
    border-bottom-right-radius:${(props)=>props.last?0:20}px;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    width:${theme.percentageWidth(60)}px;
`




const UserMessageContainer = () => {
    return (
        <View style={{
            flexDirection:'row',
            alignItems:'flex-end',
            justifyContent:'flex-end'
        }}>
           
                <View>
                    {
                        [...new Array(3)].map((value,index,array)=>(
                            <View 
                            key={index+2000}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                
                            }}>
                                <TimeText right>
                                    20:40
                                </TimeText>
                                <Message  last={index===array.length-1}>
                                    <Text>
                                        hello how are you i hop all is well with the look of thing am assuming you know what you are saying
                                    </Text>
                                </Message>

                            </View>
                        ))
                    }
                </View>
        </View>
    )
}

export default UserMessageContainer
