import * as Google from 'expo-google-app-auth';

// this is for GoogleSignin

const config: Google.GoogleLogInConfig = {
  iosClientId:
    '828159899837-jcen79bb74ccsuetrfom9kkfu5fs7rnl.apps.googleusercontent.com',
  androidClientId:
    '828159899837-kcksemp2itup93uk6bdic66cubug5go8.apps.googleusercontent.com',
};

export default async function GoogleSignInAsync(): Promise<void> {
  try {
    // user에다가 GoogleUser 정보가 들어간다.
    const result = await Google.logInAsync(config);

    if (result.type === 'success') {
      console.log('success');
    } else {
      console.log('fail');
    }
  } catch (error) {
    console.log('error with login', error);
  }
}
