import {useState, useEffect} from 'react';
import { View, Text, Image, TextInput, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  // loading custom font
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
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

    // Dummy data for FlatList
    const dishes = [
        { title: 'Dish 1', description: 'This is a great dish...', price: '$12.99', image: require('../assets/Images/Grilled fish.png') },
        { title: 'Dish 2', description: 'This is another great dish...', price: '$13.99', image: require('../assets/Images/Grilled fish.png') },
        // Add more dish objects here...
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            {/* header component */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require("../assets/Images/Logo.png")} style={styles.logo}/>  
                </View>
                <View style={styles.avatarContainer}>
                    <Image source={require("../assets/Images/Profile.png")} style={styles.avatar}/>  
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
                    <Image source={require("../assets/Images/HeroImage.png")} style= {styles.imageSection} resizeMode="cover" />
                </View>
                <View style={styles.searchSection}>
                    <Feather name="search" size={20} color="black" style={styles.searchIcon}/>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Search"
                    />  
                </View>
            </View>

            {/* Delivery section */}
            <View style={styles.deliverySection}>
                <Text style={styles.deliveryText}>Order for Delivery!</Text>
                <Image source={require("../assets/DeliveryVan.png")} style={styles.customImage} />
            </View>

            {/* Category buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>Starters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>Mains</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>Desserts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>Sides</Text>
                </TouchableOpacity>
            </View>


            
            {/* Delivery section 
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                <Text style={{ textTransform: 'uppercase' }}>Order for Delivery!</Text>
                <Image source={require('../assets/Hero image.png')} />
            </View>

            Category buttons 
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Starters</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Mains</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Desserts</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Sides</Text></TouchableOpacity>
            </View>

            Menu items 
            <FlatList 
                data={dishes}
                keyExtractor={item => item.title}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                            <Text style={{ flexWrap: 'wrap', maxWidth: 130, lineHeight: 20 }}>{item.description}</Text>
                            <Text>{item.price}</Text>
                        </View>
                        <Image source={item.image} style={{ width: 50, height: 50 }} />
                    </View>
                )}
            />
                */}
        </View>
    );
}

const styles = {
    header: {
        position: 'absolute',
        top: 0,
        height: 120,
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
        paddingTop: 120,
        backgroundColor: "#495E57",
        paddingBottom: 10, // add some padding bottom for spacing
    }, 
    title: {
        fontFamily: "MarkaziMedium",
        fontSize: 64,
        fontWeight: "500",
        color: "#F5B912",
        paddingLeft: 15
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
        resizeMode: 'stretch',
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
    deliveryText: {

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
