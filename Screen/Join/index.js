import React from 'react'
import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import styled from 'styled-components/native'
import theme from '../../assets/theme'
import { Title,AvatarContainer, TextButton } from '../../Component/DataDisplay'
import ScreenLayout from '../../Component/Layout/ScreenLayout'
import JoinForm from './Forms/JoinForm';
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



export default function({navigation}) {
    const actions = useActions()
    const sdk = actions.sdk

    const handleBack = ()=>{
        navigation.goBack()
    }
    const handleSearch = ()=>{

    }

    
    const handleSubmit = async ({data,setsubmitting,reset})=>{
        
        try {

            
            if (data.files) {
                console.log("this is called")
                const imageResponse = await sdk.upload({files:data.files})
                const image = await imageResponse.data
                data.profile = image.id
                
            }
            const accountResponse = await sdk.create('accounts',{data})
            actions.updateUser(accountResponse.data)
            setsubmitting(false)
            reset()
            navigation.navigate("friendList")


        } catch (error) {
            try {
                const accountResponse = await sdk.find("accounts",{
                    params:{
                        phoneNumber_eq:data.phoneNumber,
                        name_eq:data.name,
                    }
                })
                    setsubmitting(false)
                    const results = accountResponse.data
                    if(results.length) actions.updateUser(results[0]);
                    navigation.navigate("friendList")
                
            } catch (error) {
                console.log(error.response.data)
                setsubmitting(false)
                alert("error occurred")
            }
            
        }

        sdk.create('accounts',{data}).then(response=>{
            actions.updateUser(response.data)
            setsubmitting(false)
            reset()
            navigation.navigate("friendList")
        })
        .catch(error=>{
            // console.log(error)
            
            sdk.find("accounts",{
                params:{
                    phoneNumber_eq:data.phoneNumber,
                    name_eq:data.name,
                }
            }).then(response=>{
                setsubmitting(false)
                const results = response.data
                if(results.length) actions.updateUser(results[0]);
                navigation.navigate("friendList")

            })
            .catch(error=>{
                console.log(error)
                setsubmitting(false)
                alert("error occurred")
            })
            
        })
    }

    // React.useEffect(() => {
    //     console.log("this is called")
    //     sdk.find('accounts')
    //     .then(response=>{
    //         console.log("data",response.data)
    //     })
    //     .catch(error=>console.log(error))
    //     return () => {
    //         sdk.abort()
    //     }
    // }, [])


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
                        height:theme.percentageHeight(15),
                        flexDirection:'row',
                        justifyContent:'space-between'
                        
                    }}>
                        <View>
                            <Title style={{
                                color:theme.color.white
                            }}>Join</Title>
                        </View>
                       
                    </View>
                    
                </ImageBackground>
                <OverlapView>
                     <JoinForm handleSubmit={handleSubmit}  />
                </OverlapView>
            </ScrollView>
        </ScreenLayout>
    )
}
