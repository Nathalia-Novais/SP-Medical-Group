import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    TextInput,
} from 'react-native';

import jwt_decode from "jwt-decode";



import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // email: 'roberto.possarle@spmedicalgroup.com.br',
            // senha: '345'
            // email: '',
            // senha: ''
            // email: 'henrique@gmail.com',
            // senha: '234'
        };
    }

    efetuarLogin = async () => {
        const resposta = await api.post('/Login', {
            email: this.state.email,
            senha: this.state.senha,

        })

        const token = resposta.data.token;
        await AsyncStorage.setItem('Token', token);
        const role = jwt_decode(token).role

        if (resposta.status === 200) {
            // this.setState(email = "" )
            // this.setState(senha = "" )
        
             if (role == '2') {
                 this.props.navigation.navigate('Medico')
                 

             }
             else if(role == '3') {
                 this.props.navigation.navigate('Paciente')
                //  this.setState({ email = "" })
                //  this.setState({ senha = "" })
             }
       
        }

    }


    render() {
        return (
            <ImageBackground
                source={require('../../assets/img/FundoLogin.png')}
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/img/logo_login.png')}
                    />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#9C9C9C"
                        keyboardType="email-address"
                        style={styles.inputE}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#9C9C9C"
                        keyboardType="default"
                        secureTextEntry={true}
                        style={styles.inputS}
                        onChangeText={senha => this.setState({ senha })}
                    />
                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this.efetuarLogin}
                    >
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>


                </View>

            </ImageBackground>


        )
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputE: {
        backgroundColor: 'white',
        width: 300,
        borderRadius: 20,
        height: 35,
        padding: 10,
        alignItems: 'flex-start',
        fontSize: 14,
        marginTop: 60,
        marginBottom: 32,
        justifyContent: 'flex-start'
    },
    inputS: {
        backgroundColor: 'white',
        width: 300,
        borderRadius: 20,
        height: 35,
        padding: 10,
        alignItems: 'center',
        fontSize: 14,
        marginBottom: 34
    },


    btnLogin: {
        backgroundColor: '#3582FF',
        width: 116,
        height: 25,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnText: {
        color: 'white',

    }



})
