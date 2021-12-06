import React, { Component } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Paciente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaMinhasConsultas: []
        };
    }

    buscarConsultas = async () => {
        try {
            const token = await AsyncStorage.getItem('Token');
            if (token != null) {

                const resposta = await api.get('/Consultas/paciente', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });

                if (resposta.status === 200) {

                    this.setState({ listaMinhasConsultas: resposta.data })

                }

            }

        } catch (error) {
            console.warn(error)

        }
    }

    componentDidMount() {
        this.buscarConsultas();
    }


    realizarLogout = async () => {
        try {
            await AsyncStorage.removeItem('Token');
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.warn(error);
        }
    };


    render() {
        return (

            <View style={styles.container}>

                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={styles.titulo}>
                                <Image style={styles.logo} source={require('../../assets/img/logo_listar.png')} />
                                <Text style={styles.nome}>SP Medical Group</Text>
                            </View>



                            <TouchableOpacity
                                style={styles.sair}
                                onPress={this.realizarLogout}>
                                <Image style={styles.seta} source={require('../../assets/img/seta.png')} />
                                <Text style={styles.textsair} >Sair</Text>
                            </TouchableOpacity>

                            <View style={styles.img_txt}>
                                <Image style={styles.medico} source={require('../../assets/img/paciente.png')} />
                                <Text style={styles.textMC}>Minhas Consultas</Text>
                            </View>

                        </>
                    }


                    contentContainerStyle={styles.mainBodyContent}
                    data={this.state.listaMinhasConsultas}
                    keyExtractor={item => item.idConsulta}
                    renderItem={this.renderItem}



                />

            </View>


        )
    }

    renderItem = ({ item }) => (
        <View style={styles.nat}>
            <Text style={styles.txtlista}>Paciente: {(item.idPacienteNavigation.nomePaciente)}</Text>
            <Text style={styles.txtlista}>
                Data/Hora:
                {Intl.DateTimeFormat("pt-BR", {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', hour12: true
                }).format(new Date(item.dataHora))}
            </Text>
            <Text style={styles.txtlista}>Médico: {(item.idMedicoNavigation.nomeMedico)}</Text>
            <Text style={styles.txtlista}>Especialidade: {(item.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade)}</Text>
            <Text style={styles.txtlista} >Descrição: {item.descricao}</Text>
        </View>


    )
}
const styles = StyleSheet.create({

    nat: {

        backgroundColor: 'white',
        marginTop: 20,
        height: 220,
        paddingTop: 13,
        paddingRight: 50,
        paddingLeft: 50,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.90,
        shadowRadius: 2.62,

        elevation: 4,
        marginBottom:20
    },


    container: {
        backgroundColor: 'rgba(91,176,240,0.06)',
        // backgroundColor: 'rgba(24,133,113,0.07)',
        height: '100%',
    },

    titulo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 6
    },

    logo: {
        marginRight: 18
    },

    nome: {
        fontSize: 26,
        fontFamily: 'OdorMeanChey'
    },

    sair: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30
    },

    textsair: {
        fontSize: 18,
        marginLeft: 10,
        fontFamily: 'OdorMeanChey'
    },

    img_txt: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    textMC: {
        fontSize: 18,
        marginTop: 30,
        fontFamily: 'OdorMeanChey'
    },
    medico: {
        height: 90,
        width: 80
    },

    mainBodyContent: {
        paddingTop: 30,
        paddingRight: 50,
        paddingLeft: 50,

    },

    txtlista: {
        marginTop: 10,
        color: 'black',

    }
})