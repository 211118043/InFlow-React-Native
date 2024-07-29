
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import React from 'react'
import { Button } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signOut, getCurrentUser } from '../../lib/appwrite';
import { useState } from 'react';
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from 'expo-router';

const Profile = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const submit = async () => {
    setSubmitting(true)
    try {
      const result = await getCurrentUser();
      await signOut();      
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/sign-in")
    }
    catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <CustomButton
        title="Sign out"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={isSubmitting}
      />
    </SafeAreaView>
  );

}


export default Profile

const styles = StyleSheet.create({})