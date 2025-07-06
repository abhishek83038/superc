import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../../src/utils/Storage';

export default function Layout() {
    const user = useSelector((state) => state.user);

    const CustomDrawerContent = (props) => {
        const dispatch = useDispatch();

        const handleLogout = async () => {
            await removeToken()
            router.replace('/login');
        };

        return (
            <ImageBackground
                source={{ uri: 'https://i.pinimg.com/736x/28/d1/ab/28d1ab818bbf5481ff6c5524aa7bb91e.jpg' }}
                style={{ flex: 1,paddingTop:120 }}
                resizeMode="cover"
            >
                <DrawerContentScrollView
                    {...props}
                    contentContainerStyle={{
                        flex: 1,
                        paddingTop: 0,
                        paddingBottom: 0,
                    }}
                >
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Logout"
                        labelStyle={{ color: 'white', fontWeight: 'bold' }}
                        onPress={handleLogout}
                    />
                </DrawerContentScrollView>
            </ImageBackground>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={CustomDrawerContent}>
                <Drawer.Screen
                    name="index"
                    options={{
                        headerShown: false,
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
