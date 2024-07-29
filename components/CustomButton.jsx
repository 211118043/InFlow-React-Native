import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-50 border-2 border-secondary-400 rounded-xl min-h-[62px] w-[83%] ml-8 flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
       <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
      {isLoading && <ActivityIndicator size="small" color="#fff" />}
    </TouchableOpacity>

      
    
  );
};

export default CustomButton;
