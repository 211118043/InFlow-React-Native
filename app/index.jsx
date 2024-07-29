import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { images } from "../constants";
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';



export default function App() {

  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[100vh] px-4">
            <View className="flex-row items-center mb-75">
              <Image
                source={images.logo}
                className='w-[120px] h-[70px]  mb-35'
                resizeMode="contain"
              />
              <Text className="mr-8 mb-35" style={{ color: "white", fontSize: 36, fontFamily: 'Poppins-Medium' }}>InFlow</Text>
            </View>
            <Image
              source={images.cards}
              className="max w-[380px] w-full h-[300px] mb-4 mt-4"
              resizeMode='contain'
            />
            <View className="relative mb-510">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless{"\n"}
                Possibilities with{" "}
                <Text style={{ color: "#ffa404" }}>InFlow</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where Creativity Meets Innovation: Embark on a Journey of Limitless
              Exploration with InFlow
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7 mr-8"
              textStyles="text-black"
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );



}


// <View className="flex-1 items-center justify-center bg-white">
//   <Text className="text-3xl font-pblack">crybabymelcegm</Text>
//   <StatusBar style="auto" />
//   <Link href="/home" style={{color:"cornflowerblue"}}>Go to home</Link>
// </View>