import React from 'react';
import { View, Text, Button } from 'react-native'


export default function () {
       
     const [vote, setvote] = React.useState(0)

     const [name, setname] = React.useState("name")
     const [page, setpage] = React.useState(1)


     function handleClick()
     {
         setvote(vote+1)
        // <Text>
             
     }

     function gotoPage1() {
         setpage(1)
     }
     function gotoPage2() {
        setpage(2)
     }
     function gotoPage3() {
        setpage(3)
     }
     

    return (
        <View>
            {
                page===1&&(
                    <View>
                        
                    </View>           
                )
            }
            {
                page===2&&(
                    <View>
                            
                    </View>
                )
            }
            {
                page===3&&(
                    <View>
               
                    </View>
                )
            }

           

           

        </View>
    )
}
