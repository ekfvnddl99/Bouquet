import React, {Component} from 'react'
import * as AppleAuthentication from 'expo-apple-authentication';

export default class App extends React.Component {
  render(){
    return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: 200, height: 44 }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          // signed in
        } catch (e) {
          if (e.code === 'ERR_CANCELED') {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    />
  );
  }
}