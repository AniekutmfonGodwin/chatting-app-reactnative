import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, ImageBackground, ScrollView, Modal } from 'react-native'
import { Icon } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import styled from 'styled-components/native'
import theme from '../../assets/theme'
import { AvatarContainer, Title } from '../../Component/DataDisplay'
import ScreenLayout from '../../Component/Layout/ScreenLayout'
import FriendListCard from './Cards/FriendListCard'
import AddContact from './Forms/AddContact'
import { TouchableHighlight } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useActions from '../../Hooks/useActions'


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
    const actions = useActions(navigation)
    const sdk = actions.sdk
    const [show, setshow] = React.useState(false)
    const [friends, setfriends] = React.useState([])
    


    const handleSubmit = ({contact,setsubmitting,reset})=>{
        sdk.find("accounts",{
            params:{
                phoneNumber_eq:contact
            }
        })
        .then(response=>{
            const exists = !!response.data.length
            if(exists){
                const friends = actions.user.friends||[]
                sdk.update("accounts",{
                    data:{
                        friends:[...friends,contact]
                    },
                    id:actions.user.id
                })
                .then(({data})=>{
                    setsubmitting(false)
                    actions.updateUser(data)
                    reset()
                    handleClose()
                    updateFriends()
                    
    
    
                })
                .catch(error=>{
                    console.log(error)
                    reset()
                    setsubmitting(false)
                })
            }else{
                reset()
                alert("this user is not registered in our system")
            }
        })
        .catch(error=>{
            console.log(error)
            reset()
            setsubmitting(false)
        })
        
        
    }


    const handleClose = () =>{
        setshow(false)
    }

    const updateFriends = ()=>{
        const friendlist = actions.user.friends
        if (friendlist) {
            
            let paramsStr='?'+friendlist.map(value=>`phoneNumber_eq=${value}`).join("&")
            
            sdk.find('accounts',{paramsStr})
            .then(({data})=>{
                if(data.length){
                    setfriends(data)
                }else{
                    alert("you haven't added any contact")
                }
            })
            .catch(error=>{
                alert("join to view")
                actions.resetUser(navigation)
            })
        }
    }

    React.useEffect(() => {
        actions.resetUser(navigation)
        // const userFriends = actions.user.friends||[]
        actions.updateUser()
        updateFriends()
        
            
        return () => {
            sdk.abort()
        }
    }, [])

    return (
        <ScreenLayout>

            {/* modal starts */}
            <Modal
                transparent={true}
                hardwareAccelerated={true}
                animationType="slide"
                visible={show}
                onRequestClose={handleClose}

                
            >
                
                <AddContact handleSubmit={handleSubmit}/>
                
            </Modal>


            {/* modal ends */}
            <ScrollView>
                <ImageBackground 
                style={{
                    paddingTop:40,
                    paddingLeft:20
                }}
                source={{
                    uri:"https://images.unsplash.com/photo-1549490316-686f9b5d359f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                }}>
                    <View style={{
                        height:theme.percentageHeight(15)
                    }}>
                        <Title style={{
                            color:theme.color.white
                        }}>Chat with</Title>
                        <Title style={{
                            color:theme.color.white,
                            fontSize:20
                        }}>your friends</Title>
                    </View>
                    <ScrollView horizontal={true} style={{
                        height:100,
                        width:theme.windowWidth
                    }}>
                         <TouchableOpacity onPress={()=>setshow(true)}>
                            <AvatarContainer  >
                                <Ionicons 
                                    name="add-circle"
                                    size={20}
                                    color={theme.color.white}
                                />
                            </AvatarContainer>

                         </TouchableOpacity>
                         <AvatarContainer>
                            <Ionicons 
                                name="search"
                                size={20}
                                color={theme.color.white}
                            />
                        </AvatarContainer>
                        {
                            friends.map((value,index)=>(
                                    <Avatar
                                    key={index}
                                    rounded
                                    containerStyle={{
                                        marginRight:10
                                    }}
                                    size={'medium'}
                                    
                                    source={{
                                        uri:sdk.baseURL+value.profile.formats.thumbnail.url,
                                    }}
                                    />
    
                                )
                            )
                        }
                    </ScrollView>
                </ImageBackground>
                <OverlapView style={{
                    elevation:10
                }}>
                    
                        {
                            friends.map((value,index)=>(
                                <FriendListCard 
                                    source={{uri:sdk.baseURL+value.profile.formats.thumbnail.url}}
                                    onPress={()=>navigation.navigate("chat",value)} 
                                    key={value.id} 
                                    name={value.name}
                                    phoneNumber={value.phoneNumber}
                                />
                            ))
                        }
                </OverlapView>
            </ScrollView>
        </ScreenLayout>
    )
}
