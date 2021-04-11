import React from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import theme from '../../../assets/theme'



export default function AddContact(props) {
    const [submitting, setsubmitting] = React.useState(false)
    const [contact, setcontact] = React.useState('')


    const reset = () =>setcontact('')
    const handleSubmit = ()=>{
        props.handleSubmit({contact,submitting,setsubmitting,reset})
    }
    return (
        <View style={{
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:theme.color.blackOpacity(.3),
            height:theme.windowHeight,
            width:theme.windowWidth
        }}>
            <View style={{
                backgroundColor:theme.color.white,
                height:theme.percentageHeight(40),
                width:theme.percentageWidth(90),
                padding:30,
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Input placeholder="e.g (2348123456789)" keyboardType="number-pad" maxLength={13} label="Enter a contact" value={contact} onChangeText={setcontact}  />
                <Button  title="Add" onPress={handleSubmit} loading={submitting} disabled={!contact}  />
            </View>
        </View>
    )
}
