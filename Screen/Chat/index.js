import React from 'react'
import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import styled from 'styled-components/native'
import theme from '../../assets/theme'
import { Title,AvatarContainer, TextButton } from '../../Component/DataDisplay'
import ScreenLayout from '../../Component/Layout/ScreenLayout'
import MessageContainer from './Layouts/MessageContainer';
import InputBox from './Layouts/InputBox';
import useActions from '../../Hooks/useActions';



const OverlapView = styled.View`
    min-height:${theme.percentageHeight(70)}px;
    width:${theme.windowWidth}px;
    background-color:${theme.color.foreground};
    border-top-left-radius:35px;
    border-top-right-radius:35px;
    margin-top:-30px;
    padding-top:60px;
    padding-left:30px;
    padding-right:30px;

`



export default function({route,navigation}) {
    const friend =route.params
    const actions = useActions()
    const sdk = actions.sdk
    const [state, setstate] = React.useState('')
    // console.log("params",params)

    const handleBack = ()=>{
        navigation.goBack()
    }
    const handleSearch = ()=>{

    }
    const handleSubmit = ()=>{
        console.log("submited")
    }
    
    return (
        <ScreenLayout style={{
            backgroundColor:theme.color.white
        }}>
            <ScrollView>
                <ImageBackground 
                style={{
                    paddingTop:20,
                    paddingLeft:20,
                    paddingRight:20,
                    
                }}
                source={{
                    uri:"https://images.unsplash.com/photo-1549490316-686f9b5d359f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                }}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginBottom:20,
                        marginTop:20
                        
                    }}>
                       <TextButton onPress={handleBack}>
                           Back
                       </TextButton>
                       <TextButton onPress={handleSearch}>
                           Search
                       </TextButton>

                    </View>
                    <View style={{
                        height:theme.percentageHeight(15),
                        flexDirection:'row',
                        justifyContent:'space-between'
                        
                    }}>
                        <View>
                            <Title style={{
                                color:theme.color.white
                            }}>{friend.name}</Title>
                        </View>
                        <View style={{
                            flexDirection:'row',

                        }}>
                            <AvatarContainer>
                                <Ionicons 
                                    name="videocam"
                                    size={20}
                                    color={theme.color.white}
                                />
                            </AvatarContainer>
                            <AvatarContainer  >
                                <Ionicons 
                                    name="call"
                                    size={20}
                                    color={theme.color.white}
                                />
                            </AvatarContainer>
                        </View>
                    </View>
                    
                </ImageBackground>
                <OverlapView>
                       {
                           [...new Array(20)].map((value,index)=>(
                               <MessageContainer imageSource={sdk.baseURL+friend.profile.formats.thumbnail.url} key={index+1000}/>
                           ))
                       }
                </OverlapView>
            </ScrollView>
            <InputBox handleSubmit={handleSubmit} value={state} handleChange={setstate} />
        </ScreenLayout>
    )
}
