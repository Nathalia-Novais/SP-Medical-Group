import React, { Component } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Medico extends Component {

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

                const resposta = await api.get('/Consultas/medico', {
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



    render() {
        return (
            <SafeAreaView>
                <ScrollView>


                    <View style={styles.container}>
                        <View style={styles.titulo}>
                            <Image style={styles.logo} source={require('../../assets/img/logo_listar.png')} />
                            <Text style={styles.nome}>SP Medical Group</Text>
                        </View>

                        <TouchableOpacity style={styles.sair}>
                            <Image style={styles.seta} source={require('../../assets/img/seta.png')} />
                            <Text style={styles.textsair} >Sair</Text>
                        </TouchableOpacity>
                        <View style={styles.img_txt}>
                            <Image style={styles.medico} source={require('../../assets/img/medico.png')} />
                            <Text style={styles.textMC}>Minhas Consultas</Text>
                        </View>

                        <View

                        >

                            <FlatList
                                contentContainerStyle={styles.mainBodyContent}
                                data={this.state.listaMinhasConsultas}
                                keyExtractor={item => item.idConsulta}
                                renderItem={this.renderItem}


                            />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>

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
        height: 200,
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
    },


    container: {
        backgroundColor: 'rgba(24,133,113,0.07)',
        height: '100%',
        // alignItems:'center',
        // justifyContent:'center'
    },

    titulo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 35
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
        height: 80,
        width: 60
    },
    // lista:{
    //     backgroundColor:'white',
    //     width:286,

    // },
    mainBodyContent: {
        paddingTop: 30,
        paddingRight: 50,
        paddingLeft: 50,
        // backgroundColor:'white',
        // borderTopColor:'black',
        // borderTopWidth:20

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 8,
        // },
        // shadowOpacity: 0.46,
        // shadowRadius: 11.14,

        
    },

    txtlista: {
        marginTop: 10,
        color: 'black',

    }
})