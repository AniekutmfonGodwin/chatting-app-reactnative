import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import styled from 'styled-components/native'
import theme from '../../../assets/theme'
import { Title } from '../../../Component/DataDisplay'
import pt from 'prop-types'

const SubTitle = styled.Text`
    font-size:18px;
    font-weight:400;
    color:${theme.color.grey};
`



function FriendListCard(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{
                marginBottom:20,
                flex:1,
                flexDirection:'row'
            }}>
                <Avatar
                    rounded
                    containerStyle={{
                        marginRight:10
                    }}
                    size={'medium'}
                    source={props.source}
                    />
                    <View style={{
                        flex:1
                    }}>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                            justifyContent:'space-between'
                        }}>
                            <Title>
                                {props.name}
                            </Title>
                            <Text style={{
                                color:theme.color.grey
                            }}>
                                02:33
                            </Text>
                        </View>
                        <View>
                            <SubTitle>
                                {props.phoneNumber}
                            </SubTitle>
                        </View>
                    </View>
            </View>
        </TouchableOpacity>
    )
}

FriendListCard.propTypes ={
    onPress:pt.func
}

export default FriendListCard;