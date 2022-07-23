import React, {Component} from 'react';
import {Button, View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput} from 'react-native';
import db from '../database/firebaseDb';
import {collection, addDoc} from 'firebase/firestore'

class AddUserScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            mobile:'',
            passwd:'',
            isLoading:false
        }
    }
    // métodos
    inputValueUpdate = (val, prop)=>{
        const state = this.state
        state[prop] = val;
        this.setState(state)
    }

    storeUser(){
        if (this.state.name === '' || this.state.email === '' || this.state.mobile === '' || this.state.passwd === ''){
            alert("Debe ingresar todos los datos")
        }
        else{
            try{
                // Agregar un documento con los datos del usuario
                const docRef = addDoc(collection(db,"users"),{
                    name:this.state.name,
                    email:this.state.email,
                    mobile:this.state.mobile,
                    passwd:this.state.passwd
                });
                alert("Usuario agregado correctamente...")
                //Limpiar datos del formulario
                this.setState({name:''});
                this.setState({email:''});
                this.setState({mobile:''});
                this.setState({passwd:''});
                // Ir a pantalla para mostrar los usuarios
                //this.props.navigation.navigate('UserScreen');
            }
            catch (error){
                console.log("Error al agregar el registro: "+error)
            }
        }
    }
    render(){
        return(
            <ScrollView style={styles.container}>
                <View>
                    <TextInput
                        placeholder={'Nombre'}
                        value={this.state.name}
                        onChangeText={(val)=>this.inputValueUpdate(val, 'name')}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder={'Correo Electrónico'}
                        value={this.state.email}
                        onChangeText={(val)=>this.inputValueUpdate(val, 'email')}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder={'Número de Dispositivo Móvil'}
                        value={this.state.mobile}
                        onChangeText={(val)=>this.inputValueUpdate(val, 'mobile')}
                    />
                </View>
                <View>
                    <TextInput
                        secureTextEntry={true}
                        placeholder={'Contraseña'}
                        value={this.state.passwd}
                        onChangeText={(val)=>this.inputValueUpdate(val, 'passwd')}
                    />
                </View>
                <Text>{'\n'}</Text>
                <View>
                    <Button
                        title="Agregar Usuario"
                        onPress={()=>this.storeUser()}
                        color="#445F05"
                    />
                </View>
                <Text>{'\n'}</Text>
                <View>
                    <Button
                        title="Listar Usuarios"
                        onPress={()=>this.props.navigation.navigate('UserScreen')}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:10
      /*backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',*/
    },
  });

export default AddUserScreen;