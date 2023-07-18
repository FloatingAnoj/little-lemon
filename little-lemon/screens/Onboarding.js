import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Onboarding = ({ onDone }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  
  // Checks if the inputs are valid
  const isValid = () => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return firstName.length > 0 && emailPattern.test(email);
  };

  const handleOnDone = () => {
    if(isValid()) {
        onDone(firstName, email);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroText}>Let us get to know you</Text>
        <Text style={styles.inputText}>Name</Text>
        <TextInput 
          placeholder="First Name" 
          style={styles.input} 
          onChangeText={setFirstName}
          value={firstName}
        />
        <Text style={styles.inputText}>Email</Text>
        <TextInput 
          placeholder="Email" 
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, !isValid() ? styles.buttonDisabled : '']} onPress={handleOnDone} disabled={!isValid()}>
        <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flex: 0.2,  
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: "#DEE3E9",
      paddingBottom: 10
    },
    logo: {
      width: '70%',  
      height: '60%',  
      resizeMode: 'contain',
    },
    hero: {
      flex: 0.9,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: "#CBD2D9",
      paddingBottom:20
    },
    heroText: {
      fontSize: 30,
      color: "#324753",
      marginBottom: 150,
      marginTop: 60,
    },
    inputText: {
      fontSize: 30,
      color: "#324753",
      marginBottom: 10,
    },
    input: {
      height: "10%",
      width: "80%",
      borderColor: '#324753',
      borderWidth: 2,
      paddingLeft: 10,
      borderRadius: 8,
      marginBottom: 20
    },
    footer: {
      flex: 0.25,
      backgroundColor: "#F1F4F7",
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 10,
    },
    button: {
        backgroundColor: "#CBD2D9",
        borderRadius: 8,
        paddingHorizontal: 40,
        paddingVertical: 10,
    },      
    buttonDisabled: {
      backgroundColor: 'gray'
    },
    buttonText: {
      fontSize: 30,
      color: '#465969',
    }
});

export default Onboarding;
