// // import { Stack } from "expo-router";
// // import React, { useState } from "react";
// // import { Provider } from 'react-redux'; // ✅ Import Redux Provider
// // import { store } from '../src/redux/store'; // ✅ Import your Redux store

// // export default function RootLayout() {
// //   const [initalroute, setInitialRoute] = useState("countryselect");



// //   return (
// //     <Provider store={store}>
// //       <Stack initialRouteName={initalroute} screenOptions={{ headerShown: false }}>
// //         <Stack.Screen name="countryselect" />
// //         <Stack.Screen name="index" />
// //         <Stack.Screen name="login" />
// //         <Stack.Screen name="registration" />
// //         <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
// //       </Stack>
// //     </Provider>
// //   );
// // }

// import { userInfo } from '@/src/redux/slices/userSlice';
// import { getToken } from '@/src/utils/Storage';
// import { Stack } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import { store } from '../src/redux/store';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#0066FF',
//     accent: '#FFC107',
//   },
// };

// // 🔁 Wrapper for accessing Redux inside layout
// function LayoutInner() {
//   const dispatch = useDispatch()
//   const user = useSelector((state) => state.user);
//   const [ initialRouteName,setinitailRoute] = useState(null)

//   console.log("firstuser",user)

//   const initApi = async () => {
//     const token = await getToken()
//     console.log("token",token)
//     const data = await dispatch(userInfo())
//     console.log("first",data?.payload?.user_id)
//     if(data?.payload?.user_id){
//       setinitailRoute("(drawer)")
//     }else{
//       setinitailRoute("index")
//     }
//   }
//     console.log("useruser",user)


//   useEffect(() => {
//     initApi()
//   }, [])


//   return (
//     <Stack screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
//       {/* <Stack.Screen name="countryselect" /> */}
//       {!user?.isLoggedIn? (
//         <>
//           <Stack.Screen name="index" />
//           <Stack.Screen name="login" />
//           <Stack.Screen name="registration" />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="(drawer)" />
//         </>
//       )}
//     </Stack>
//   );
// }

// // ✅ Final exported layout with Redux Provider
// export default function RootLayout() {
//   return (
//     <Provider store={store}>
//       <PaperProvider theme={theme}>
//         <LayoutInner />
//       </PaperProvider>
//     </Provider>
//   );
// }

import { userInfo } from '@/src/redux/slices/userSlice';
import { getToken } from '@/src/utils/Storage';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../src/redux/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0066FF',
    accent: '#FFC107',
  },
};

// 👇 Inner wrapper with redux access
function LayoutInner() {
  const dispatch = useDispatch();
  const [initialRouteName, setInitialRouteName] = useState(null); // ✅ spelling fixed

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = await getToken();
        if (token) {
          const resultAction = await dispatch(userInfo()); // ✅ thunk fetches token inside
          const userId = resultAction?.payload?.user_id;
          if (userId) {
            setInitialRouteName('(drawer)');
            return;
          }
        }
        setInitialRouteName('index'); // fallback if no token/user
      } catch (e) {
        console.error('initApp error:', e);
        setInitialRouteName('index');
      }
    };

    initApp();
  }, [dispatch]);

  // 🕐 Wait for route decision
  if (!initialRouteName) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="countryselect" />
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="registration" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}

// ✅ Outer Redux + Paper wrapper
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <LayoutInner />
      </PaperProvider>
    </Provider>
  );
}

