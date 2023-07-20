import { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View, Text, Image, TextInput, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("little_lemon.db");


db.transaction(tx => {
    tx.executeSql(
        "create table if not exists menu (id integer primary key not null, name text, description text, price real, image text, category text);"
    );
});

const HomeScreen = () => {
    // Add state for selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [fontLoaded, setFontLoaded] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Function to handle category selection
    const handleCategorySelect = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((item) => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };
    
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
                const data = await response.json();
    
                const uniqueCategories = [...new Set(data.menu.map((item) => item.category))];
                setCategories(uniqueCategories);
    
                db.transaction(tx => {
                    data.menu.forEach(item => {
                        tx.executeSql("select name from menu where name = ?;", [item.name], (_, { rows: { _array } }) => {
                            if (_array.length === 0) {
                                tx.executeSql("insert into menu (name, description, price, image, category) values (?, ?, ?, ?, ?)", [item.name, item.description, item.price, item.image, item.category]);
                            }
                        });
                    });
                }, null, () => setDishes(data.menu));
            } catch (error) {
                
            }
        };
    
        fetchMenu();
    
        db.transaction(tx => {
            tx.executeSql("select * from menu;", [], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    setDishes(_array);
                }
            });
        });
    
        async function loadFonts() {
            await Font.loadAsync({
                MarkaziMedium: require('../assets/Markazi_Text/static/MarkaziText-Medium.ttf'),
                KarlaRegular: require('../assets/Karla/static/Karla-Regular.ttf'),
                KarlaMedium: require('../assets/Karla/static/Karla-Medium.ttf'),
                KarlaBold: require('../assets/Karla/static/Karla-Bold.ttf'),
                KarlaExtraBold: require('../assets/Karla/static/Karla-ExtraBold.ttf'),
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* header component */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require("../assets/Images/Logo.png")} style={styles.logo} />
                </View>
                <View style={styles.avatarContainer}>
                    <Image source={require("../assets/Images/Profile.png")} style={styles.avatar} />
                </View>
            </View>

            {/* Hero section */}
            <View style={styles.heroSection}>
                <Text style={styles.title}>Little Lemon</Text>
                <View style={styles.textAndImageSection}>
                    <View style={styles.textSection}>
                        <Text style={styles.subTitle}>Chicago</Text>
                        <Text style={styles.leadText}>
                            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                        </Text>
                    </View>
                    <Image source={require("../assets/Images/HeroImage.png")} style={styles.imageSection} resizeMode="cover" />
                </View>
                <View style={styles.searchSection}>
                    <Feather name="search" size={20} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        onChangeText={(text) => setSearchText(text)}
                    />
                </View>
            </View>

            {/* Delivery section */}
            <View style={styles.deliverySection}>
                <Text style={styles.deliveryText}>Order for Delivery!</Text>
                <Image source={require("../assets/Images/DeliveryVan.png")} style={styles.customImage} />
            </View>

            <View style={{height: 70}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.buttonsContainer} >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            // Apply different styles if category is selected
                            selectedCategories.includes(category) && styles.categoryButtonSelected,
                        ]}
                        onPress={() => handleCategorySelect(category)}
                    >
                        <Text
                            style={[
                                styles.categoryButtonText,
                                // Apply different styles if category is selected
                                selectedCategories.includes(category) && styles.categoryButtonTextSelected,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            </View>

            {/*Menu items*/}
            <FlatList
                style={{flex: 1}}
                data={selectedCategories.length > 0 ? dishes.filter(dish => selectedCategories.includes(dish.category) && dish.name.includes(searchText)) : dishes.filter(dish => dish.name.includes(searchText))}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <Text style={styles.itemDescription} numberOfLines={2} ellipsizeMode='tail'>{item.description}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                        <View style={styles.itemImageContainer}>
                            <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} style={styles.itemImage} resizeMode="cover" onError={(error) => console.log(error)} />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}


const styles = {
    categoryButtonSelected: {
        backgroundColor: '#F5B912',
    },
    categoryButtonTextSelected: {
        color: '#FFFFFF',
    },
    header: {
        top: 0,
        height: Platform.OS === 'ios' ? 60 : 100,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        zIndex: 10,
        flexDirection: 'row', // add this line
        alignItems: 'flex-end', // add this line
        justifyContent: 'center', // add this line
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center', // add this line
        paddingBottom: 15,
    },
    avatarContainer: {
        position: 'absolute', // add this line
        right: 30, // add this line
        paddingBottom: 15,
    },
    logo: {
        width: 150, // add this line
        height: 50, // add this line
        resizeMode: 'contain', // add this line
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    heroSection: {
        backgroundColor: "#495E57",
        paddingBottom: 10, // add some padding bottom for spacing
    },
    title: {
        fontFamily: "MarkaziMedium",
        fontSize: 64,
        fontWeight: "500",
        color: "#F5B912",
        paddingLeft: 15,
        paddingTop: 10
    },
    subTitle: {
        fontFamily: "MarkaziMedium",
        fontSize: 40,
        fontWeight: "500",
        color: "#FFFFFF",
        paddingLeft: 15,
        marginTop: -15
    },
    leadText: {
        fontFamily: "KarlaMedium",
        color: "#FFFFFF",
        fontSize: 18,
        paddingLeft: 15,
        marginTop: 12,
    },
    textSection: {
        flexDirection: "column",
        flex: 1, // take up remaining space, except for the image
    },
    textAndImageSection: {
        flexDirection: 'row',
        marginBottom: 10, // ensure some space between this section and the next
    },
    imageSection: {
        flex: 0.60,
        marginLeft: 15,
        width: 40,
        height: 160,
        borderRadius: 12,
        marginRight: 20,
        marginTop: 10
    },
    searchSection: {
        flexDirection: 'row', // ensure search bar comes below the image
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 0,
        margin: 15,
        borderRadius: 8,
        marginTop: 20, // ensure some space between this section and the previous,
    },
    searchIcon: {
        height: 20,
        width: 20,
        alignItems: 'center',
        marginLeft: 10
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
        borderRadius: 8,
    },
    deliverySection: {
        flexDirection: 'row',
        alignItems: "center",
        padding: 15,
        marginTop: 5,
        paddingBottom: 0
    },
    deliveryText: {
        fontFamily: 'KarlaExtraBold',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    customImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginLeft: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#D3D3D3",
        marginLeft: 10,
        height: 50,
    },
    categoryButton: {
        backgroundColor: '#D3D3D3',
        borderRadius: 15,
        paddingVertical: 0,
        paddingHorizontal: 12, // adjust this as needed
        justifyContent: "center", // adjust this as needed, // Center content vertically // Center content horizontally
        marginHorizontal: 10,
        marginTop: Platform.OS === 'ios' ? 10 : 5,
        marginVertical: Platform.OS === 'ios' ? 15 : 10,
        height: 30
    },
    categoryButtonText: {
        fontFamily: 'KarlaExtraBold',
        fontSize: 14,
        color: '#797474',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingVertical: 20,
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#DCDCDC",
    },
    itemInfo: {
        flex: 0.75,
        paddingLeft: 10
    },
    itemTitle: {
        fontSize: 20,
        fontFamily: "KarlaBold",
        marginBottom: 10
    },
    itemDescription: {
        fontFamily: "KarlaRegular",
        fontSize: 16,
        flexWrap: 'wrap',
        lineHeight: 20,
        marginBottom: 5,
        marginRight: 20
    },
    itemPrice: {
        fontSize: 18,
        fontFamily: "KarlaBold",
    },
    itemImageContainer: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    itemImage: {
        width: "90%",
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
        marginTop: 5
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#D3D3D3',
        padding: 10
    },
    buttonText: {
        color: '#A9A9A9'
    }
};


export default HomeScreen;