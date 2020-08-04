import React from 'react'
import {View,Text,StyleSheet, Button} from 'react-native'

export default function Line (props){
    const {row} = props
    console.log('row', row )
    return (
        <View style={styles.fixToText}>
            {
                row.map((data) => {
                   return <View>
                        <Text>{data}</Text>
                        <Button style={styles.button} title='+1' onPress={() => data=data+1}/>
                   </View>
                  
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width: 50
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
})