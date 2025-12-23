Було використано useCallback для функції в listItem, cам item в React.memo. Reanimated для анімацій з хуками useSharedValue, useAnimatedStyle.
Після аналізу з source-map-explorer - був зменшений start-bg.png.

(base) Serges-MacBook-Pro:menti siangicher$ npx expo export --platform ios --source-maps --clear
Starting Metro Bundler
iOS Bundled 748ms node_modules/expo/AppEntry.js (1387 modules)

› Assets (42):
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf (130 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.ttf (66.2 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/EvilIcons.ttf (13.5 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf (55.6 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf (166 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf (134 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf (33.7 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf (203 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Brands.ttf (209 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Regular.ttf (68 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Solid.ttf (424 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Fontisto.ttf (314 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Foundation.ttf (57 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf (390 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf (1.31 MB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf (357 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Octicons.ttf (69.4 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/SimpleLineIcons.ttf (54.1 kB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Zocial.ttf (25.8 kB)
node_modules/@react-navigation/drawer/lib/module/views/assets/toggle-drawer-icon.png (4 variations | 176 B)
node_modules/@react-navigation/elements/lib/module/assets/back-icon-mask.png (653 B)
node_modules/@react-navigation/elements/lib/module/assets/back-icon.png (4 variations | 566 B)
node_modules/@react-navigation/elements/lib/module/assets/clear-icon.png (4 variations | 425 B)
node_modules/@react-navigation/elements/lib/module/assets/close-icon.png (4 variations | 235 B)
node_modules/@react-navigation/elements/lib/module/assets/search-icon.png (3 variations | 582 B)
src/assets/logo.png (57.3 kB)
src/assets/select-bg.png (189 kB)
src/assets/start-bg.png (2.07 MB)

› ios bundles (2):
_expo/static/js/ios/AppEntry-2e8a397b4e0625ba09d11634dad8916f.js (3.05 MB)
_expo/static/js/ios/AppEntry-2e8a397b4e0625ba09d11634dad8916f.js.map (9.55 MB)

› Files (1):
metadata.json (2.98 kB)

Exported: dist


https://github.com/user-attachments/assets/d08e677a-d7db-455b-bd03-b8a054227f36


