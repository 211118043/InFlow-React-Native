import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { icons } from '../constants'


const FormField = ({ title, value, placeholder, handleTextChange, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ml-8 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

            <View className="w-[90%] h-16 px-4 bg-black-100 rounded-2xl border-2 border-secondary-300 focus:border-secondary flex flex-row items-center">

                <TextInput className="flex-1 text-white font-semibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleTextChange}
                    secureTextEntry={title === "Password" && !showPassword} />

                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField