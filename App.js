import { useEffect, useState } from 'react';
import { 
  ActivityIndicator, FlatList, TextInput, Pressable, 
  StyleSheet, Text, View, SafeAreaView 
} from 'react-native';
import ShoppingItem from './components/ShoppingItem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { db, collection, addDoc, getDocs, deleteDoc, doc } from './firebase/index';

export default function App() {
  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  // Function to add an item to Firestore
  const addShoppingItem = async () => {
    if (title.trim() === "") return; // Prevent adding empty items

    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle(""); 
      getShoppingList(); // Refresh list after adding item
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Function to fetch shopping list from Firestore
  const getShoppingList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shopping"));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShoppingList(items);
    } catch (error) {
      console.error("Error fetching shopping list: ", error);
    }
  };

  // Function to delete all items from Firestore
  const deleteAllItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shopping"));
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "shopping", document.id));
      });
      setShoppingList([]); // Clear local state
      console.log("All items deleted.");
    } catch (error) {
      console.error("Error deleting all items: ", error);
    }
  };

  // Fetch shopping list when app loads
  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>
        <Text style={styles.noOfItems}>{shoppingList.length}</Text>
        <Pressable onPress={deleteAllItems}>
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>

      {/* Shopping List */}
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => 
          <ShoppingItem 
          title={item.title} 
          isChecked={item.isChecked} 
          id={item.id}
          getShoppingList={getShoppingList}
          />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator size="large" color="#666" />
      )}

      {/* Input Field */}
      <TextInput
        placeholder="Add new item"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: '500',
    flex: 1,
  },
  noOfItems: {
    fontSize: 30,
    color: '#666',
    fontWeight: '500',
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    marginTop: 'auto',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    color: '#666',
    fontSize: 17,
  },
});


