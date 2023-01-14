import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';



export default function Home({ navigation }) {

    useEffect(() => {
        
        setTimeout(() => {
            navigation.replace('Mes Taches');
        }, 2000);
    }, []);

   

    return (
        <View style={styles.body} >
            <Image
                style={styles.logo}
                source={require('../../assets/checklist.png')}
            />
            <Text
                style={[
                
                    styles.text
                ]}
            >
                Application ToDolist
                KONE et BOHOUSSOU
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0080ff',
    },
    logo: {
        width: 150,
        height: 150,
        margin: 20,
    },
    text: {
        fontSize: 40,
        color: '#ffffff',
    },
})