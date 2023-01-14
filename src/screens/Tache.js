import React, { useState, useEffect } from 'react'
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import CustomButton from '../utils/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setTaches} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';


export default function Tache({ navigation }) {

    const { taches, tacheID } = useSelector(state => state.tacheReducer);
    const dispatch = useDispatch();

    const [titre, setTitre] = useState('');
    const [desc, setDesc] = useState('');
    const [done, setDone] = useState(false);
    const [showBellModal, setShowBellModal] = useState(false);
    const [bellTime, setBellTime] = useState('1');
  
   
  


    useEffect(() => {
        navigation.addListener('focus', () => {
            getTache();
        });
    }, [])

    const getTache = () => {
        const Tache = taches.find(tache => tache.ID === tacheID)
        if (Tache) {
            setTitre(Tache.Titre);
            setDesc(Tache.Desc);
            setDone(Tache.Done);
            
        }
    }

    const setTache = () => {
        if (titre.length == 0) {
            Alert.alert('Veuillez écrire le titre de la tache')
        } else {
            try {
                var Tache = {
                    ID: tacheID,
                    Titre: titre,
                    Desc: desc,
                    Done: done
            
                }
                const index = taches.findIndex(tache => tache.ID === tacheID);
                let newTaches = [];
                if (index > -1) {
                    newTaches = [...taches];
                    newTaches[index] = Tache;
                } else {
                    newTaches = [...taches, Tache];
                }
                AsyncStorage.setItem('Tache', JSON.stringify(newTaches))
                    .then(() => {
                        dispatch(setTaches(newTaches));
                        Alert.alert('Tache sauvergardée');
                        navigation.goBack();
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                console.log(error);
            }
        }
    }

   
   
    return (
        <ScrollView>
            <View style={styles.body}>
                <Modal
                    visible={showBellModal}
                    transparent
                    onRequestClose={() => setShowBellModal(false)}
                    animationType='slide'
                    hardwareAccelerated
                >
                    <View style={styles.centered_view}>
                        <View style={styles.bell_modal}>
                            <View style={styles.bell_body}>
                                <Text style={styles.text}>Remind me After</Text>
                                <TextInput
                                    style={styles.bell_input}
                                    keyboardType='numeric'
                                    value={bellTime}
                                    onChangeText={(value) => setBellTime(value)}
                                />
                                <Text style={styles.text}>minute(s)</Text>
                            </View>
                            <View style={styles.bell_buttons}>
                                <TouchableOpacity
                                    style={styles.bell_cancel_button}
                                    onPress={() => {
                                        setShowBellModal(false)
                                    }}
                                >
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                             
                            </View>
                        </View>
                    </View>
                </Modal>
                <TextInput
                    value={titre}
                    style={styles.input}
                    placeholder='Titre'
                    onChangeText={(value) => setTitre(value)}
                />
                <TextInput
                    value={desc}
                    style={styles.input}
                    placeholder='Description'
                    multiline
                    onChangeText={(value) => setDesc(value)}
                />
              
               
                <View style={styles.checkbox}>
                    <CheckBox
                        value={done}
                        onValueChange={(newValue) => setDone(newValue)}
                    />
                    <Text style={styles.text}>
                        Est fait
                    </Text>
                </View>
                <CustomButton
                    titre='Enregistré'
                    color='#1eb900'
                    style={{ width: '100%' }}
                    onPressFunction={setTache}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    checkbox: {
        flexDirection: 'row',
        margin: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 20,
        color: '#000000',
    },
    color_bar: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#555555',
        marginVertical: 10,
    },
    color_white: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    color_red: {
        flex: 1,
        backgroundColor: '#f28b82',
        justifyContent: 'center',
        alignItems: 'center',
    },
    color_blue: {
        flex: 1,
        backgroundColor: '#aecbfa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    color_green: {
        flex: 1,
        backgroundColor: '#ccff90',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    extra_row: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    extra_button: {
        flex: 1,
        height: 50,
        backgroundColor: '#0080ff',
        borderRadius: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered_view: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_modal: {
        width: 300,
        height: 200,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000000',
    },
    bell_body: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_buttons: {
        flexDirection: 'row',
        height: 50,
    },
    bell_input: {
        width: 50,
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
    },
    bell_cancel_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_ok_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        margin: 20,
    },
    delete: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#ffffff80',
        margin: 10,
        borderRadius: 5,
    }
})
