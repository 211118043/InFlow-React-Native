import { View, Text, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in the all fields')
    }
    if (form.password.length < 8 || form.password.length > 265) {
      Alert.alert('Error', 'Password must be between 8 and 265 characters long');
      return;
    }
    setSubmitting(true)
    try {
      const result = await createUser(form.email, form.password , form.username)
      setUser(result)
      setIsLoggedIn(true)
      //set it global state
      router.replace("/home")
    }
    catch {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }

  }
  

  return (
    <SafeAreaView className="bg-primary h-full pt-20">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: '84vh',
            padding: 4,
            marginTop: 24,
            flexDirection: 'row',
          }}
        >
          <Image source={images.logo} style={{ width: 100, height: 60 }} resizeMode="contain" />
          <Text style={{ marginLeft: 5, color: 'white', fontSize: 36, fontFamily: 'Poppins-Medium' }}>InFlow</Text>
        </View>
        <View className="ml-8">
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Sign Up to InFlow</Text>
        </View>
        <FormField
          title="Username"
          value={form.username}
          handleTextChange={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-10"

        />
        <FormField
          title="Email"
          value={form.email}
          handleTextChange={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          value={form.password}
          handleTextChange={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Already have an account
          </Text>
          <Link href="/sign-in" className='text-lg font-semibold text-secondary align-items-center'>Sign In</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

};


export default SignUp;
