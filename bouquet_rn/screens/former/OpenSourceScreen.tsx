import React from 'react';
import { WebView } from 'react-native-webview';

export default function OpenSourceScreen(): React.ReactElement {
  return (
    <WebView
      source={{
        html: `<h3>MIT License</h3><br/>
        <br/>
        The following component(s) are licensed under the MIT License reproduced below:<br/>
        <br/>
        - @types/i18n-js<br/>
        - @types/lodash.memoize<br/>
        - @types/styled-components-react-native<br/>
        - expo, Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)<br/>
        - i18n-js<br/>
        - lodash, Copyright JS Foundation and other contributors https://js.foundation/<br/>
        - react, Copyright (c) Facebook, Inc. and its affiliates.<br/>
        - react-native, Copyright (c) Facebook, Inc. and its affiliates.<br/>
        - react-native-web, Copyright (c) 2015-present, Nicolas Gallagher.<br/>
        - react-navigation, Copyright (c) 2017 React Navigation Contributors<br/>
        - recoil, Copyright (c) Facebook, Inc. and its affiliates.<br/>
        - styled-components, Copyright (c) 2016-present Glen Maddern and Maximilian Stoiber<br/>
        <br/>
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br/>
        <br/>
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br/>
        <br/>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
      }}
    />
  );
}
