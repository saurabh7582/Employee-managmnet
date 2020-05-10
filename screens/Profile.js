import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button, Dialog } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';


const Profile = (props)=>{

    const {_id,name,position,phone,email,picture,salary} = props.route.params.item

    
    const del=()=>{
        fetch("https://employee-ss.herokuapp.com/delete ",{
            method:"post",
            headers:{
				'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(DelelteEmployee=>{
            Alert.alert(`${DelelteEmployee.name} is Deleted`)
            props.navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("something went wrong")
        })
        

    }

    const Dial=()=>{
        if(Platform.OS === "android")
            Linking.openURL(`tel:${phone}`)
        else
            Linking.openURL(`telprompt:${phone}`)
    }

    return(
        <View style={styles.root}>
            <LinearGradient
                colors={['#0076f5', '#0076f5']}
                style={{
                height: "20%"
                 }}
            />
            <View style={{alignItems:"center"}}>
                 <Image
                style={{width:150,height:150,borderRadius:70,alignItems:"center",marginTop:-80}}
                source={{uri:picture}}
                ></Image>
            </View>
        <View style={{alignItems:"center",margin:10}}>
        <Title>{name}</Title>
        <Text style={{fontSize:16}} >{position}</Text>
        </View>
        
        <Card style={styles.myCard}>
            <View style={styles.myCardContainer}    onPress={()=>{
            Linking.openURL(`mailto:${email}`)
        }}>
                <MaterialIcons name="email" size={32} color="#00b4e0" />
                <Text style={styles.cardInnerText}>{email}</Text>
            </View>
        </Card>
        <Card style={styles.myCard} onPress={()=>Dial()}>
            <View style={styles.myCardContainer}>
                <MaterialIcons name="phone" size={32} color="#00b4e0" />
                <Text style={styles.cardInnerText}>{phone}</Text>
            </View>
        </Card>
        <Card style={styles.myCard} >
            <View style={styles.myCardContainer}>
                <MaterialIcons name="attach-money" size={32} color="#00b4e0" />
                <Text style={styles.cardInnerText}>{salary}</Text>
            </View>
        </Card>

        <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>
        <Button icon="account-edit" mode="contained" theme={theme} onPress={()=>
            props.navigation.navigate("Create",
            {_id,name,position,phone,email,picture,salary}
            )}  >
    				Edit 
  				</Button>

			    <Button icon="delete" mode="contained" theme={theme} onPress={()=>del()} >
		    		Delete 
  				</Button>
        </View>
        </View>
    )
}
const theme = {
	colors:{
		primary:"#00b4e0"
	}
}
const styles=StyleSheet.create({

    root:{
        flex:1
    },
    myCard:{
        marginTop:20,
        margin:3
    },
    myCardContainer:{
        flexDirection:"row",
        padding:10
    },
    cardInnerText:{
        fontSize:18,
        marginLeft:5
    }
})

export default Profile