import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const ios = Platform.OS === 'ios';

export default function CustomKeyboard({ children,inChat}) {
  let kavConfig = {};
  let scrollViewConfig = {};
  if(inChat){
    kavConfig = {keyboardVerticalOffset: 90};
    scrollViewConfig = {contentContainerStyle: {flex: 1}};
  }
  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
      {...kavConfig}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }} // Using contentContainerStyle for inner container styling
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}