import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import React, { Component } from 'react';
import db from '../database/firebaseDb';
import * as firestore from 'firebase/firestore'
import { doc, setDoc, deleteDoc} from 'firebase/firestore';

class UserDetailScreen extends Component {
    constructor() {
        super()
        this.state = {
            id:'',
            name: '',
            email: '',
            mobile: '',
            passwd: '',
            isLoading: false
        }
    }

    componentDidMount() {
        // alert(this.props.route.params.userKey+" "+this.props.route.params.name + " "+this.props.route.params.email)

        // Actualizar los estados con los parámetros enviados
        this.setState({
            id:this.props.route.params.userKey,
            name: this.props.route.params.name,
            email: this.props.route.params.email,
            mobile: this.props.route.params.mobile,
            passwd: this.props.route.params.passwd
        })
        
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state
        state[prop] = val;
        this.setState(state)
    }

    // Método asíncrono para actualizar la información de un user
    async updateUser(){
        if (this.state.name === '' || this.state.email === '' || this.state.mobile === '' || this.state.passwd === ''){
            alert("Debe ingresar todos los datos")
        }
        else{
            try {
                // Se actualiza el documento con el id respectivo
                await setDoc(doc(db,"users",this.state.id),{
                    name: this.state.name,
                    email: this.state.email,
                    mobile: this.state.mobile,
                    passwd: this.state.passwd
                });
                alert("Usuario actualizado correctamente ...");
                this.props.navigation.navigate('AddUserScreen');
                
            } catch (error) {
                console.log(error)
            }
        }
    }
    // Método para eliminar un documento - user - por id
    async deleteUser(){
        try {
            if (confirm(`Está seguro de eliminar el usuario: ${this.state.name}`)){
                await deleteDoc(doc(db, "users", this.state.id));
                alert("Usuario eliminado correctamente ...");
                this.props.navigation.navigate('AddUserScreen');
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <Text>{this.state.id}</Text> */}
                <Text>Nombre</Text>
                <TextInput
                    value={this.state.name}
                    onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                />
                <Text>Correo Electrónico</Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                />
                <Text>Teléfono Móvil</Text>
                <TextInput
                    value={this.state.mobile}
                    onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
                />
                <Text>Contraseña</Text>
                <TextInput
                    secureTextEntry={true}
                    value={this.state.passwd}
                    onChangeText={(val) => this.inputValueUpdate(val, 'passwd')}
                />
                <Text>{'\n'}</Text>
                <Button
                    title="Actualizar"
                    onPress={()=>this.updateUser()}
                   
                />
                <Text>{'\n'}</Text>
                <Button
                    title="Eliminar"
                    onPress={()=>this.deleteUser()}
                   
                />
                
            </View>
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
});

export default UserDetailScreen;