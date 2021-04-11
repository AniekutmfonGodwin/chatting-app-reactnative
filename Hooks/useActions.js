import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import constatnt from '../assets/constatnt'
import SDK from '../SDK'


class Actions{
    constructor(args={dispatch:{},user:{name:'',phoneNumber:'',id:0,friends:[],navigation:{}}}){
        const {dispatch,user,navigation} = args
        this.user = user
        this.dispatch=dispatch
        this.navigation = navigation
        this.sdk = new SDK()
    }


    updateUser(payload){
        payload?(
            this.dispatch({
                type:constatnt.UPDATE_USER,
                payload
            })
        ):(
            this.sdk.findOne("accounts",{
                id:this.user.id
            })
            .then(({data})=>{
                this.dispatch({
                    type:constatnt.UPDATE_USER,
                    payload:data
                })
            })
            .catch(error=>{
                console.log(error)
                if(error.response.status===404) this.resetUser(this.navigation)
            })

        )
        
    }
    resetUser(navigation){
        this.dispatch({
            type:constatnt.RESET_USER
        })
        this.navigation&&navigation.navigate("join")
        
    }



}



export default function useActions(navigation) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state)
    
    
    return new Actions({
        dispatch,
        user,
        navigation

    })
}
