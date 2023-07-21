import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import * as Device from 'expo-device';

let modelName = Device.modelName;
const windowWidth = Dimensions.get('window').width;

export default function Profile({ route, navigation }) {
    const firstNameParam = route.params?.firstName;
    const emailParam = route.params?.email;
    const [firstName, setFirstName] = useState(firstNameParam);
    const [email, setEmail] = useState(emailParam);
    const [avatar, setAvatar] = useState(null);
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderStatusesNotifs, setOrderStatusesNotifs] = useState(false);
    const [passwordChangesNotifs, setPasswordChangesNotifs] = useState(false);
    const [specialOffersNotifs, setSpecialOffersNotifs] = useState(false);
    const [newsletterNotifs, setNewsletterNotifs] = useState(false);

    useEffect(() => {
        setFirstName(firstNameParam);
        setEmail(emailParam);
    }, [firstNameParam, emailParam]);

    useEffect(() => {
        loadProfile();
    }, []);

    const Checkbox = ({ isChecked, onCheck, title }) => (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onCheck}>
            <View style={[styles.checkbox, { backgroundColor: isChecked ? '#495E57' : 'white' }]}>
                {isChecked && <FontAwesome name="check" size={20} color="white" />}
            </View>
            <Text style={[styles.checkboxLabel, { marginLeft: 10 }]}>{title}</Text>
        </TouchableOpacity>
    );

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    const saveProfile = async () => {
        try {
            const profile = {
                avatar,
                firstName,
                lastName,
                email,
                phoneNumber,
                orderStatusesNotifs,
                passwordChangesNotifs,
                specialOffersNotifs,
                newsletterNotifs
            };
            await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
            const newAvatar = avatar;
            props.route.params.updateAvatar(newAvatar);
        } catch (e) {
            console.log(e);
        }
    }

    const loadProfile = async () => {
        try {
            const savedProfile = await AsyncStorage.getItem('userProfile');
            if (savedProfile !== null) {
                const profile = JSON.parse(savedProfile);
                setAvatar(profile.avatar);
                setFirstName(profile.firstName);
                setLastName(profile.lastName);
                setEmail(profile.email);
                setPhoneNumber(profile.phoneNumber);
                setOrderStatusesNotifs(profile.orderStatusesNotifs);
                setPasswordChangesNotifs(profile.passwordChangesNotifs);
                setSpecialOffersNotifs(profile.specialOffersNotifs);
                setNewsletterNotifs(profile.newsletterNotifs);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('userProfile');
            await AsyncStorage.setItem('isOnboardingComplete', JSON.stringify(false));
            // reset the states
            setAvatar(null);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setOrderStatusesNotifs(false);
            setPasswordChangesNotifs(false);
            setSpecialOffersNotifs(false);
            setNewsletterNotifs(false);
            // navigate back to Onboarding screen
            navigation.navigate('Logout');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={modelName === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={modelName === "ios" ? 0 : 20}
        >

            {/* header component */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color="white" />
                    </TouchableOpacity>
                    <Image source={require("../assets/Images/Logo.png")} />
                    <View style={styles.avatarGroupSmall}>
                        {avatar ? (<Image source={{ uri: avatar }} style={styles.avatar} />) : (
                            <View style={styles.avatar}>
                                <Text style={styles.avatarPlaceholderSmall}>
                                    {firstName && firstName.charAt(0)}
                                    {lastName && lastName.charAt(0)}
                                </Text>
                            </View>)}
                    </View>
                </View>
            </View>

            {/* start of scrollable */}
            <ScrollView style={styles.form}>
                <Text style={styles.title}>Personal Information</Text>

                {/* Avatar Picture section */}
                <View style={styles.avatarGroup}>
                    {avatar ? (<Image source={{ uri: avatar }} style={styles.editAvatar} />) : (
                        <View style={styles.editAvatar}>
                            <Text style={styles.avatarPlaceholder}>
                                {firstName && firstName.charAt(0)}
                                {lastName && lastName.charAt(0)}
                            </Text>
                        </View>)}
                    <TouchableOpacity style={[styles.changeButton, { marginLeft: 30, marginRight: 20 }]} onPress={pickImage}>
                        <Text style={{ color: 'white' }}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={() => setAvatar(null)}>
                        <Text style={{ color: '#495E57' }}>Remove</Text>
                    </TouchableOpacity>
                </View>

                {/* User Information section */}
                <View>
                    {/* FIRST NAME */}
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName} />

                    {/* LAST NAME */}
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName} />

                    {/* EMAIL */}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    {/* PHONE NUMBER */}
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInputMask
                        type={'custom'}
                        options={{
                            mask: '(999) 999-9999'
                        }}
                        keyboardType='number-pad'
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={styles.input}
                        placeholder="Phone number"
                    />
                </View>

                {/* Email Notifications (checkboxes) section */}
                <Text style={[styles.title, { marginTop: 10, marginBottom: 20 }]}>Email Notifications</Text>
                <View style={styles.checkboxGroup}>
                    <Checkbox title='Order statuses' isChecked={orderStatusesNotifs} onCheck={() => setOrderStatusesNotifs(!orderStatusesNotifs)} />
                    <Checkbox title='Password changes' isChecked={passwordChangesNotifs} onCheck={() => setPasswordChangesNotifs(!passwordChangesNotifs)} />
                    <Checkbox title='Special offers' isChecked={specialOffersNotifs} onCheck={() => setSpecialOffersNotifs(!specialOffersNotifs)} />
                    <Checkbox title='Newsletter' isChecked={newsletterNotifs} onCheck={() => setNewsletterNotifs(!newsletterNotifs)} />
                </View>

                {/* Final buttons  section */}
                <TouchableOpacity style={[styles.logOutButton, { marginBottom: 30 }]} onPress={logOut}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Log Out</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignSelf: "center" }}>
                    <TouchableOpacity style={[styles.removeButton, { marginRight: 30 }]} onPress={() => { }}>
                        <Text style={{ color: '#495E57' }}>Discard Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.changeButton} onPress={saveProfile}>
                        <Text style={{ color: 'white' }}>Save Changes</Text>
                    </TouchableOpacity>
                </View>

                {/* Spacer view for Scrollview */}
                <View style={{ height: 150 }}></View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 0,
        height: 120,
        left: 0,
        right: 0,
        flex: 0.15,
        backgroundColor: "#DEE3E9",
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
    logo: {
        width: '50%',
        resizeMode: 'contain',
        position: 'absolute',
        top: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#B6B6B6",
        alignItems: 'center',
        justifyContent: 'center'
    },
    editAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    avatarPlaceholder: {
        fontSize: 40,
        color: '#fff',
    },
    avatarPlaceholderSmall: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    form: {
        flex: 1,
        padding: 20,
        borderRadius: 20,
        paddingTop: 135,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        color: '#495E57',
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 10
    },
    avatarGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    avatarGroupSmall: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 45,
        borderColor: '#495E57',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        marginLeft: 10,
        borderRadius: 5
    },
    checkboxGroup: {
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        marginRight: 5,
        marginLeft: 10,
        borderColor: '#495E57',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    changeButton: {
        borderRadius: 10,
        backgroundColor: "#495E57",
        padding: 15,
        paddingHorizontal: 25
    },
    removeButton: {
        borderRadius: 10,
        borderColor: '#495E57',
        borderWidth: 1,
        padding: 15,
        paddingHorizontal: windowWidth > 500 ? 25 : 20,
    },
    logOutButton: {
        height: 50,
        width: "95%",
        backgroundColor: "#F4CE15",
        borderColor: "#DEB04D",
        borderRadius: 8,
        borderWidth: 1.5,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: "center",
    },
    backButton: {
        backgroundColor: "#495E57",
        borderRadius: 25,
        padding: 10,
        marginBottom: 5
    }
});
