import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { db, doc, updateDoc, deleteDoc  } from '../firebase/index';

//Shopping item object

// id
// title
// isChecked

const ShoppingItem = (props) => {
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const updateIsChecked = async() => {
        const shoppingRef = doc(db, "shopping", props.id);

        await updateDoc(shoppingRef, {
        isChecked: isChecked,
        });
    };

    const deleteShoppingItem = async() => {
        await deleteDoc(doc(db, "shopping", props.id));
        props.getShoppingList();
    }

    useEffect(() => {
        updateIsChecked();
    },[isChecked]);

  return (
    <View style={styles.container}>
      {/* Checked icons */}
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        {
            isChecked ? (<AntDesign name="checkcircle" size={24} color="black" />
            ) : (
                <AntDesign name="checkcircleo" size={24} color="black" />
            )
        }
        
      </Pressable>

      {/* Shopping Text */}
      <Text style={styles.title}>{props.title}</Text>

      {/* Delete button */}
      <Pressable onPress={deleteShoppingItem}>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  )
}

export default ShoppingItem

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f2f2f2',
      width: '90%',
      alignSelf: 'center',
      borderRadius: '10px',
      marginVertical: '5px',
    },
    title: {
      fontWeight: '500',
      flex: 1,
      marginLeft: 10,
      fontSize: 18,
    }
  
})