// import { Drawer } from 'expo-router/drawer';
// import { Text } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { useSelector } from 'react-redux';

// export default function Layout() {
//     const user = useSelector((state) => state.user)
//     console.log("first111", user)
//     const auth = false
//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <Drawer>
//                 <Drawer.Screen
//                     name="index" // This is the name of the page and must match the url from root
//                     options={{
//                         drawerLabel: 'Home',
//                         title: 'Dashboard',
//                     }}
//                 />
//                 <Drawer.Screen
//                     name="profile" // This is the name of the page and must match the url from root
//                     options={{
//                         drawerLabel: 'My Profile',
//                         title: 'My profileee',
//                         drawerItemStyle: { display: auth ? 'flex' : 'none' },
//                     }} />
//                 <Text>shfbs</Text>
//             </Drawer>
//         </GestureHandlerRootView>
//     );
// }

import { logout } from '@/src/redux/slices/userSlice'; // 👈 make sure this path is correct
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../../src/utils/Storage';

export default function Layout() {
    const user = useSelector((state) => state.user);

    // 👇 Custom drawer content
    const CustomDrawerContent = (props) => {
        const dispatch = useDispatch();

        const handleLogout = async() => {
           await removeToken()
           const res = await dispatch(logout())         // Clear Redux state
           console.log("res",res)
            router.push('/app/(drawer)/index');    // Navigate to login page
        };

        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />

                {/* 🔴 Logout Button */}
                <DrawerItem
                    label="Logout"
                    labelStyle={{ color: 'red', fontWeight: 'bold' }}
                    onPress={handleLogout}
                />
            </DrawerContentScrollView>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={CustomDrawerContent}>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Dashboard',
                    }}
                />
                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: 'My Profile',
                        title: 'My Profile',
                        drawerItemStyle: { display: user?.isLoggedIn ? 'flex' : 'none' },
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
