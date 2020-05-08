import React,{useState} from 'react';
import { StyleSheet, Text, View, Model, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import {TextInput, Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';

const CreateEmpolyee = ({navigation,route})=>{

	// data to be edit
	const editData=(type)=>{
		if(route.params){
			switch(type){
				case "name":
					return route.params.name
				case "phone":
					return route.params.phone
				case "email":
					return route.params.email
				case "salary":
					return route.params.salary
				case "position":
					return route.params.position
				case "picture":
					return route.params.picture
			}
		}
		else 
			return ""
	}
	
	const [Name,setName] =useState(editData("name"))
	const [Phone,setPhone] =useState(editData("phone"))
	const [Email,setEmail] =useState(editData("email"))
	const [Position,setPosition] =useState(editData("position"))
	const [Picture,setPicture] =useState(editData("picture"))
	const [Salary,setSalary] =useState(editData("salary"))
	const [model,setModel] =useState(false)
	const [enableShift,setEnableShift] =useState(false)

	const submitData=()=>{
		fetch("https://employee-s.herokuapp.com/send-data",{
			method:"post",
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				name:Name,
				phone:Phone,
				email:Email,
				picture:Picture,
				salary:Salary,
				position:Position
			})
		})
		.then(res=>res.json())
		.then(data=>{
			Alert.alert(`${data.name} is saved successfuly`)
			navigation.navigate("Home")
		})
		.catch(err=>{
		  Alert.alert("someting went wrong")
	  })
	}

	const UpDate=()=>{
		fetch("https://employee-s.herokuapp.com/update",{
			method:"post",
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				id:route.params._id,
				name:Name,
				phone:Phone,
				email:Email,
				picture:Picture,
				salary:Salary,
				position:Position
			})
		})
		.then(res=>res.json())
		.then(data=>{
			Alert.alert(`${data.name} is update successfuly`)
			navigation.navigate("Home")
		})
		.catch(err=>{
		  Alert.alert("someting went wrong")
	  })
	}

	const upload= (image)=>{
		const data= new FormData()
			data.append('file',image)
			data.append('upload_preset','Employee')
			data.append("cloud_name","ssdeveloper")

			fetch("https://api.cloudinary.com/v1_1/ssdeveloper/image/upload",{
				method:"post",
				body:data
			}).then(res=>res.json()).
			then(data=>{
				console.log(data)
				setPicture(data.url)
				setModel(false)
			}).catch(err=>{
				Alert.alert("Image has not uploaded")
			})
		
	}

	const PickFromGallery= async ()=>{
		const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
		if(granted){
			let data =await ImagePicker.launchImageLibraryAsync({
				mediaTypes:ImagePicker.MediaTypeOptions.Images,
				allowsEditing:true,
				aspect:[1,1],
				quality:1
			})
			console.log(data);

			if(!data.cancelled){
				let newfile={
					uri:data.uri,
					type:`test/${data.uri.split(".")[1]}`,
					name:`test.${data.uri.split(".")[1]}`
				}
				upload(newfile)
			}
			
		}
		else{
			Alert.alert("grant storage permission ")
		}
	}

	const PickFromCamera= async ()=>{
		const {granted} = await Permissions.askAsync(Permissions.CAMERA)
		if(granted){
			let data=await ImagePicker.launchCameraAsync({
				mediaTypes:ImagePicker.MediaTypeOptions.Images,
				allowsEditing:true,
				aspect:[1,1],
				quality:1
			})
			console.log(data);

			if(!data.cancelled){
				let newfile={
					uri:data.uri,
					type:`test/${data.uri.split(".")[1]}`,
					name:`test.${data.uri.split(".")[1]}`
				}
				upload(newfile)
			}
			
		}
		else{
			Alert.alert("grant storage permission ")
		}
	}

	return(
		//<KeyboardAvoidingView behavior="position"  enabled={setEnableShift} >
	<View style={styles.root} >
      <TextInput
	  	onFocus={()=>setEnableShift(false)}
      	style={styles.input}
      	theme={theme}
      	mode="outlined"
        label='Name'
        value={Name}
        onChangeText={text => setName(text)}
      />

      <TextInput
	  	onFocus={()=>setEnableShift(false)}
      	style={styles.input}
      	theme={theme}
      	mode="outlined"
        label='Email'
        value={Email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
	  	onFocus={()=>setEnableShift(false)}
      	style={styles.input}
      	theme={theme}
      	mode="outlined"
        label='Phone'
        keyboardType="number-pad"
        value={Phone}
        onChangeText={text => setPhone(text)}
      />

		<TextInput
		onFocus={()=>setEnableShift(true)}
      	style={styles.input}
      	theme={theme}
      	mode="outlined"
        label='Position'
        value={Position}
        onChangeText={text => setPosition(text)}
      />

      <TextInput
	  	onFocus={()=>setEnableShift(true)}
      	style={styles.input}
      	theme={theme}
      	mode="outlined"
        label='Salary'
        keyboardType="number-pad"
        value={Salary}
		onChangeText={text => setSalary(text)}
	
      />

       <Button 	style={styles.input} icon={Picture==""?"upload":"check"} mode="contained" theme={theme} onPress={() => setModel(true)}>
    		Press me
  		</Button>
		  {route.params?
		  	<Button 	style={styles.input} icon="content-save" mode="contained" theme={theme} 
			  onPress={() => UpDate()}>
				Update
			  </Button>
			  :
			  <Button 	style={styles.input} icon="content-save" mode="contained" theme={theme} 
		  		onPress={() => submitData()}>
    			save
  				</Button>
		}
		  
		  <Modal
			  animationType="slide"
			  transparent={true}
			  visible={model}

			  onRequestClose={()=>{
				  setModel(false)
			  }}
		  >

		<View style={styles.modelView}>
			<View style={styles.modelButtonView}>
				<Button icon="camera" mode="contained" theme={theme} onPress={() => PickFromCamera()}>
    				camera
  				</Button>

			    <Button icon="image-multiple" mode="contained" theme={theme} onPress={() => PickFromGallery()}>
		    		gallary
  				</Button>

			</View>

			<Button  onPress={() => setModel(false)}>
    			cancel
  			</Button>

		</View>
		  </Modal>
		
	</View>
	//</KeyboardAvoidingView>
	)
  }

const theme = {
	colors:{
		primary:"#00b4e0"
	}
}
const styles=StyleSheet.create({
	root:{
		flex:1,
		
	},
	input:{
		margin:5
	},
	modelView:{
		position:"absolute",
		bottom:4,
		width:"100%"
		
	},
	modelButtonView:{
		flexDirection:"row",
		justifyContent:"space-around",
		padding:10

	}
})

export default CreateEmpolyee