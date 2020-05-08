import React from 'react';
import { StyleSheet, Text, View, Image, FlatList,ActivityIndicator, Alert } from 'react-native';
import {Card,  FAB} from 'react-native-paper'
import { useEffect, useState } from 'react';

const Home=(props)=> {

		const [data,setdata]=useState([])
		const [lodaing,setloading]=useState(true)

		const fetchData= ()=>{
			fetch( " https://empolyee-d.herokuapp.com/")
			.then(res=>res.json())
			.then(data=>{
				setdata(data)
				setloading(false)
			}).catch(err=>{
				Alert.alert("Something went wrong")
			})
		}


		useEffect(()=>{
			fetchData()
		},[])

	 	/*const data=[
	 		{_id:"1",name:"saurabh",positon:"app devlopment",phone:"9819107582",email:"saurabh.k.shinde007@gmail.com",picture:"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",salary:"10 lpa"},
	 		{_id:"2",name:"akash",positon:"software devlopment",phone:"9819107582",email:"saurabh.k.shinde007@gmail.com",picture:"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",salary:"5 lpa"},
	 		{_id:"3",name:"sakshi",positon:"Web devlopment",phone:"9819107582",email:"saurabh.k.shinde007@gmail.com",picture:"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",salary:"6 lpa"}
	
	 	]*/

		 
	 	const list=((item)=>{
	 		return(
				<Card style={style.mycard} onPress={()=> props.navigation.navigate("Profile",{item})} >
				<View style={style.cardView}>
				<Image 
					style={{width:60,height:60,borderRadius:30}}
					source={{uri:item.picture}}
				/>
				<View>
					<Text style={style.text}>{item.name}</Text>	
					<Text style={style.text}>{item.position}</Text>	
				</View>
		</View>
		</Card>
	 			)
	 	})
	 	
	return (
	<View style={{flex:1}}>
		
		<FlatList 
		data={data}
		renderItem={({item})=>{
			return list(item)	
		}
	  }
	  keyExtractor={item=>item._id}
	  onRefresh={()=>fetchData()}
	  refreshing={lodaing}
	/>

		<FAB onPress={()=> props.navigation.navigate("Create")}
		    style={style.fab}
		    small={false}
		    icon="plus"
		/>
	</View>

		)
	}


const style = StyleSheet.create({
    mycard:{
        margin:5,
    },
    cardView:{
         flexDirection:"row",
         padding:6
    },
    text:{
        fontSize:18,
        marginLeft:20
    },
    fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default Home