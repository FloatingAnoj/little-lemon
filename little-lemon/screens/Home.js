import {useState, useEffect} from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

const HomeScreen = () => {
  // loading custom font
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Markazi: require('../assets/Markazi_Text/static/MarkaziText-Medium.ttf'),
        Karla: require('../assets/Karla/static/Karla-Medium.ttf'),
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
        { title: 'Dish 1', description: 'This is a great dish...', price: '$12.99', image: require('../assets/Grilled fish.png') },
        { title: 'Dish 2', description: 'This is another great dish...', price: '$13.99', image: require('../assets/Grilled fish.png') },
        // Add more dish objects here...
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            {/* header component */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={require("../assets/Logo.png")} />  
                    <Image source={require("../assets/Profile.png")} style={styles.avatar}/>  
                </View>
            </View>

            {/* Hero section */}
            <View style={styles.heroSection}>
                <Text style={styles.title}>Little Lemon</Text>
                    {/* <View style={styles.textSection}>
                        <Text style={styles.subTitle}>Chicago</Text>
                        <Text style={styles.leadText}>
                            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                        </Text>
                        <TextInput placeholder="Search" style={{ flex: 1 }} />
                    </View> */}
                    <Image source={require("../assets/HeroImage.png")} style= {{height: 25, width: 25}} />  
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
        flex: 0.15,
        backgroundColor: "#FFFFFF",
        zIndex: 10
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 30,
        paddingBottom: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    heroSection: {
        paddingTop: 120,
        flex: 0.4,
        backgroundColor: "#495E57"
    },
    title: {
        fontFamily: "Markazi",
        fontSize: 64,
        fontWeight: "500",
        color: "#F5B912",
        paddingLeft: 15
    },
    subTitle: {
        fontFamily: "Markazi",
        fontSize: 40,
        fontWeight: "500",
        color: "#FFFFFF",
        paddingLeft: 15,
        marginTop: -15
    },
    leadText: {
        fontFamily: "Karla",
        color: "#FFFFFF",
        fontSize: 18, 
        paddingLeft: 15,

    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15, // or any padding you prefer
    },    
    textSection: {
        flexDirection: "column"
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
