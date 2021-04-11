import React from 'react'
import { View, Text, ActivityIndicator,Platform } from 'react-native'
import { Avatar, Image, Input } from 'react-native-elements'
import { Button } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import theme from '../../../assets/theme'
import useActions from '../../../Hooks/useActions';



export default function JoinForm(props) {
    const [submitting, setsubmitting] = React.useState(false)
    const [image, setImage] = React.useState(null);
    const sdk= useActions().sdk
    const [data, setdata] = React.useState({
        name:'',
        phoneNumber:'',
        files:''
    })

    const handleChange =(name,value)=>{
        setdata(prev=>({...prev,[name]:value}))
    }


    const reset = ()=>setdata({name:'',phoneNumber:'',files:''})

    const handleSubmit =()=>{
        setsubmitting(true)
        props.handleSubmit({data,submitting,setsubmitting,reset})
        
    }
    const pickImage = async () => {
        try {
            
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
    
            });
        
            if (!result.cancelled) {
                const file = sdk.expoImageToFile(result)
                handleChange("files",file)
                setImage(file.uri);
              
            }
        } catch (error) {
            console.log(error)
            alert("error occured")
        }
      };

    React.useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    return (
        <View style={{
            justifyContent:'center',
            alignItems:'center',
            flex:1
        }}>
            <View style={{  alignItems: 'center', justifyContent: 'center',marginBottom:10 }}>
                {
                    image&&(
                        <Avatar 
                            source={{uri:image}} 
                            containerStyle={{
                                width:200,
                                height:200,
                                marginBottom:20
                            }}
                            rounded
                         />
                    )
                }
                
                <Button title="Select a profile image" onPress={pickImage} />
            </View>
            <Input label="Enter your name" onChangeText={(value)=>handleChange("name",value)}  value={data.name}  />
            <Input placeholder="e.g (2348123456789)" keyboardType="number-pad" maxLength={13} label="Enter your phone number" value={data.phoneNumber} onChangeText={(value)=>handleChange("phoneNumber",value)}  />
            <Button title={"join"}  
                buttonStyle={{
                    width:100
                }} 
                disabled={!(data.name&&data.phoneNumber&&data.files)}
                loading={submitting} 
                onPress={handleSubmit}
              />
        </View>
    )
}
