import React from 'react'
import {  Text, View } from 'react-native'
import pt from 'prop-types'
import { Avatar } from 'react-native-elements'
import UserMessageContainer from './UserMessageContainer'
import OtherMessageContainer from './OtherMessageContainer'






const MessageContainer = (props) => {
    return (
        <View style={{
            marginBottom:20,
        }}>
            <UserMessageContainer  />
            <OtherMessageContainer imageSource={props.imageSource}/>
        </View>
    )
}




MessageContainer.propTypes = {

}
export default MessageContainer

