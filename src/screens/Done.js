import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setTacheID, setTaches} from '../redux/actions';


export default function Done({ navigation }) {

    const { taches } = useSelector(state => state.tacheReducer);
    const dispatch = useDispatch();

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
            AsyncStorage.setItem('Taches', JSON.stringify(newTaches))
                .then(() => {
                    dispatch(setTaches(newTaches));
                    Alert.alert('La tache a été changé.');
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <View style={styles.body}>
            <FlatList
                data={taches.filter(tache => taches.Done === true)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(setTacheID(item.ID));
                            navigation.navigate('Tache');
                        }}
                    >
                        <View style={styles.item_row}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1
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
        paddingHorizontal: 10,
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
    }
})
