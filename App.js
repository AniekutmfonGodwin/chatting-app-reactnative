import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import theme from './assets/theme';
import { ImageBackground } from 'react-native';
import Chat from './Screen/Chat';
import FriendList from './Screen/FriendList';
import Playground from './Screen/Playground';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import Join from './Screen/Join';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector } from 'react-redux';
import Reducers from './Reducers';

const {store,persistor} = Reducers()

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// import Playground from './Screen/Playground'



const mainColor=theme.color.primary.main

function App() {
  const {user} = useSelector(state => state)
  const [loaded, error] = useFonts({
    NotoRegular:require('./assets/fonts/NotoSans-Regular.ttf')
  });

  if(!loaded) return <ActivityIndicator color={theme.color.primary.main} size={'large'} />


  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName={user.id?"friendList":"join"}>
            <Stack.Screen options={{
              headerShown:false
            }} name="friendList" component={FriendList} />
            <Stack.Screen options={{
              headerShown:false
            }} name="playground" component={Playground} />
            <Stack.Screen options={{
              headerShown:false
            }} name="join" component={Join} />
            <Stack.Screen
                name="chat" 
                options={{
                  headerShown:false
                }}
                component={Chat}
                // options={({ navigation, route }) => ({
                //     // headerTitle: props => <DetailPageHeader
                //     // //  {...props} 
                //     //  />,
                //     headerStyle:{
                //         height:theme.percentageHeight(30)
                //     },
                //     headerBackground:props=><ImageBackground style={{
                //         height:'100%',
                //         flex:1,
                //     }} source={{uri:"https://picsum.photos/200/300"}} /> })}
                
                />
            
        </Stack.Navigator>

      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ()=>(
  <Provider store={store}>
      <PersistGate persistor={persistor} loading={<ActivityIndicator color={theme.color.primary.main} size={'large'} />}>
        <App/>
      </PersistGate>
  </Provider>
)
// import React from 'react'
// import { Button } from 'react-native';
// import { TextInput } from 'react-native';
// import { View, Text,StyleSheet,ActivityIndicator,Dimensions } from 'react-native'
// import { io } from 'socket.io-client';
// // import { io } from 'socket.io-client';
// const {height, width} = Dimensions.get('window');
// // window.navigator.userAgent = "react-native";

// const socket = io('http://localhost:1337')


// export default function App() {
//   const [state, setstate] = React.useState('')


//   function generate(e){
//     // logic here
    


//     setstate('jjhhh')
//   }
//   React.useEffect(() => {
//     socket.on("connect",()=>{
//       console.log("socket connected")
//       socket.on("testing",()=>{
//         console.log("message from server")
//       })
//     })
//     return () => {
      
//     }
//   }, [])
  
//   return (
//     <View style={{
//       flex:1,
//       height:height,
//       justifyContent:'center',
//       alignItems:'center'
//     }}>
      
//         <Text>
          
//         </Text>
//         <TextInput style={{color:'white',backgroundColor:'brown'}} value={state} />
//         <Button 
        
//         onPress={generate} title="generate" color="green" />
      
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   myStyle:{
//     color:'blue'
//   },
//   newStyle:{
//     color:'red'
//   }
// });