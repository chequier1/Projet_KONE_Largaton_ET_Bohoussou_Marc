import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setTacheID, setTaches } from '../redux/actions';


export default function ToDo({ navigation }) {

    const { taches } = useSelector(state => state.tacheReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getTaches();
    }, [])

    const getTaches = () => {
        AsyncStorage.getItem('Taches')
            .then(taches => {
                const parsedTaches = JSON.parse(taches);
                if (parsedTaches && typeof parsedTaches === 'object') {
                    dispatch(setTaches(parsedTaches));
                }
            })
            .catch(err => console.log(err))
    }

    const deleteTache = (id) => {
        const filteredTaches = taches.filter(tache => tache.ID !== id);
        AsyncStorage.setItem('Taches', JSON.stringify(filteredTaches))
            .then(() => {
                dispatch(setTaches(filteredTaches));
                Alert.alert('Tache supprimée');
            })
            .catch(err => console.log(err))
    }

    const checkTache = (id, newValue) => {
        const index = taches.findIndex(tache => tache.ID === id);
        if (index > -1) {
            let newTaches = [...taches];
            newTaches[index].Done = newValue;
            AsyncStorage.setItem('Tache', JSON.stringify(newTaches))
                .then(() => {
                    dispatch(setTaches(newTaches));
                    Alert.alert('Tache modifiée');
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <View style={styles.body}>
            <FlatList
                data={taches.filter(tache => tache.Done === false)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(setTacheID(item.ID));
                            navigation.navigate('Tache');
                        }}
                    >
                        <View style={styles.item_row}>
                            <View
                                style={[
                                    {
                                        backgroundColor:
                                            item.Color === 'red' ? '#f28b82' :
                                                item.Color === 'blue' ? '#aecbfa' :
                                                    item.Color === 'green' ? '#ccff90' : '#ffffff'
                                    },
                                    styles.color]}
                            />
                            <CheckBox
                                value={item.Done}
                                onValueChange={(newValue) => { checkTache(item.ID, newValue) }}
                            />
                            <View style={styles.item_body}>
                                <Text
                                    style={[
                                       
                                        styles.titre
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.Titre}
                                </Text>
                                <Text
                                    style={[
                                     styles.subtitre
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.Desc}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.delete}
                                onPress={() => { deleteTache(item.ID) }}
                            >
                                <FontAwesome5
                                    name={'trash'}
                                    size={25}
                                    color={'#ff3636'}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(setTacheID(taches.length + 1));
                    navigation.navigate('Tache');
                }}
            >
                <FontAwesome5
                    name={'plus'}
                    size={20}
                    color={'#ffffff'}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0080ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5,
    },
    item_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_body: {
        flex: 1,
    },
    delete: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    titre: {
        color: '#000000',
        fontSize: 30,
        margin: 5,
    },
    subtitre: {
        color: '#999999',
        fontSize: 20,
        margin: 5,
    },
    color: {
        width: 20,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    }
})
