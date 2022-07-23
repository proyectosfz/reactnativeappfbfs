import {Button, View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import db from '../database/firebaseDb';
import * as firestore from 'firebase/firestore'
class UserScreen extends Component{
    constructor(){
        super()
        this.state = {
            isLoading: true,
            userArr:[]
        }
    }
    // Método para ejecutar instrucciones cada vez que se renderize el componente
    componentDidMount(){
        this.getUsers();
    }

    // Método para recuperar todos los documentos de la colección user
    
    getUsers = () => {
        const userArr = [];
        firestore.getDocs(firestore.collection(db, "users"))
        .then((docs) => {
            // pasar todos los usuarios al arreglo userArr
            docs.forEach((res)=>{
                const {name, email, mobile, passwd } = res.data()
                userArr.push({
                    key: res.id,
                    name,
                    email,
                    mobile,
                    passwd
                });
            });
            // Actualizar los estados del componente
            this.setState({
                isLoading:false,
                userArr
            })
            //console.log(userArr);
        })
    }

    render(){
        // Verificar el estado isLoading
        if (this.state.isLoading){
            return(
                <View style={styles.preloader}>
                    <ActivityIndicator
                        size="large" 
                        color="green"
                    />
                </View>
            )
        }
        return(
            <ScrollView>
                <FlatList
                    data={this.state.userArr}
                    renderItem={({item})=>(
                        <TouchableOpacity
                            style={{backgroundColor:'gray',padding:5,borderRadius:10,marginLeft:'10%',marginTop:5, width:'80%'}}
                            onPress={()=>{
                                this.props.navigation.navigate('UserDetailScreen',{
                                    userKey: item.key,
                                    name:item.name,
                                    email:item.email,
                                    mobile:item.mobile,
                                    passwd:item.passwd
                                })
                            }}
                        >
                            {/* <Text style={{color:'yellow'}}>{item.key}</Text> */}
                            <Text style={{color:'yellow'}}>{item.name}</Text>
                            <Text style={{color:'yellow'}}>{item.email}</Text>

                        </TouchableOpacity>
                        
                    )}
                
                >

                </FlatList>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    preloader:{
        left:0,
        right:0,
        top:0,
        bottom:0,
        position:'absolute',
        alignItems:'center',
        justifyContent:'center'

    }
  });

export default UserScreen;