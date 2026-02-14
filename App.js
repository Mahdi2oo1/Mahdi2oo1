const ComponentFunction = function () {
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  const React = require('react');
  const { useState, useEffect, useContext, useMemo, useCallback } = React;
  const {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    Platform,
    StatusBar,
    FlatList,
    Linking,
    Switch
  } = require('react-native');
  const { Ionicons } = require('@expo/vector-icons');
  const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');
  const { NavigationContainer } = require('@react-navigation/native');

  const primaryColor = '#1E40AF';
  const accentColor = '#3B82F6';
  const backgroundColor = '#F8FAFC';
  const cardColor = '#FFFFFF';
  const textPrimary = '#1F2937';
  const textSecondary = '#6B7280';

  const Tab = createBottomTabNavigator();

  const transportLinesData = [
    { id: 1, type_ar: 'خط باب طويريج', type_en: 'Bab Towerej Line', fare_ar: '500 دينار', fare_en: '500 IQD', distance_ar: '—', distance_en: '—', time_ar: '—', time_en: '—', from_ar: 'منطقة باب طويريج', from_en: 'Bab Towerej Area', to_ar: 'حي العامل - سيف سعد - فريحة - خان النص', to_en: 'Al-Amel District - Seif Saad - Farihah - Khan Al-Nas', from_link: 'https://maps.app.goo.gl/GCFTxFJcNpq3TqWXA', to_link: '', more_ar: 'خط رئيسي يربط باب طويريج بعدة مناطق مهمة في المدينة', more_en: 'Main line connecting Bab Towerej with several important areas in the city', city_ar: 'كربلاء', vehicle_ar: 'خاصة' },
    { id: 2, type_ar: 'خط حي العامل', type_en: 'Al-Amel District Line', fare_ar: '500 دينار', fare_en: '500 IQD', distance_ar: '9 كم', distance_en: '9 km', time_ar: '15 دقيقة', time_en: '15 min', from_ar: 'باب طويريج', from_en: 'Bab Towerej', to_ar: 'حي العامل', to_en: 'Al-Amel District', from_link: 'https://maps.app.goo.gl/GCFTxFJcNpq3TqWXA', to_link: 'https://maps.app.goo.gl/wGRN4zEMdB97E8n68', more_ar: 'خط سريع ومباشر إلى حي العامل', more_en: 'Fast and direct line to Al-Amel District', city_ar: 'كربلاء', vehicle_ar: 'خاصة' },
    { id: 3, type_ar: 'خط سيف سعد', type_en: 'Seif Saad Line', fare_ar: '500 دينار', fare_en: '500 IQD', distance_ar: '10 كم', distance_en: '10 km', time_ar: '20 دقيقة', time_en: '20 min', from_ar: 'باب طويريج', from_en: 'Bab Towerej', to_ar: 'سيف سعد', to_en: 'Seif Saad', from_link: 'https://maps.app.goo.gl/GCFTxFJcNpq3TqWXA', to_link: 'https://maps.app.goo.gl/8JfZ6ufDMXZtMk5QA', more_ar: 'يخدم منطقة سيف سعد والمناطق المجاورة', more_en: 'Serves Seif Saad area and surrounding neighborhoods', city_ar: 'كربلاء', vehicle_ar: 'خاصة' },
    { id: 4, type_ar: 'خط خان النص', type_en: 'Khan Al-Nas Line', fare_ar: '1500 دينار', fare_en: '1500 IQD', distance_ar: '24 كم', distance_en: '24 km', time_ar: '32 دقيقة', time_en: '32 min', from_ar: 'باب طويريج', from_en: 'Bab Towerej', to_ar: 'خان النص', to_en: 'Khan Al-Nas', from_link: 'https://maps.app.goo.gl/GCFTxFJcNpq3TqWXA', to_link: 'https://maps.app.goo.gl/Jm2ACpeG9Fe8UvTX9', more_ar: 'رحلة طويلة إلى خان النص مع عدة توقفات', more_en: 'Long trip to Khan Al-Nas with several stops', city_ar: 'كربلاء', vehicle_ar: 'خاصة' },
    { id: 5, type_ar: 'خط السعدية', type_en: 'Al-Saadiya Line', fare_ar: '500 دينار', fare_en: '500 IQD', distance_ar: '6 كم', distance_en: '6 km', time_ar: '12 دقيقة', time_en: '12 min', from_ar: 'حي العامل', from_en: 'Al-Amel District', to_ar: 'شارع الروضتين', to_en: 'Al-Rawdatain Street', from_link: 'https://maps.app.goo.gl/wGRN4zEMdB97E8n68', to_link: 'https://maps.app.goo.gl/FpHr2VXkj5v3yGdy8', more_ar: 'يربط حي العامل بشارع الروضتين المقدس', more_en: 'Connects Al-Amel District to Al-Rawdatain Street', city_ar: 'كربلاء', vehicle_ar: 'خاصة' },
    { id: 6, type_ar: 'خط حي الحر', type_en: 'Al-Harr District Line', fare_ar: '500 دينار', fare_en: '500 IQD', distance_ar: '5 كم', distance_en: '5 km', time_ar: '9 دقيقة', time_en: '9 min', from_ar: 'فلكة حي المعلمين', from_en: 'Al-Moalimeen District Circle', to_ar: 'حي الحر', to_en: 'Al-Harr District', from_link: 'https://maps.app.goo.gl/yCByspzWCQwbSnrHA', to_link: 'https://maps.app.goo.gl/hQz9qfcFJeGmjxkg7', more_ar: 'خط قصير وسريع لحي الحر', more_en: 'Short and fast line to Al-Harr District', city_ar: 'كربلاء', vehicle_ar: 'خاصة' }
  ];

  const citiesData = [
    { id: 1, name_ar: 'كربلاء المقدسة', name_en: 'Karbala', status_ar: 'متاح حالياً', status_en: 'Available Now', routes: 6 },
    { id: 2, name_ar: 'بغداد', name_en: 'Baghdad', status_ar: 'قريباً', status_en: 'Coming Soon', routes: 0 }
  ];

  const translations = {
    ar: { appTitle: 'الخطوط', search: 'البحث عن خط أو تفاصيل...', linesTab: 'الخطوط', citiesTab: 'المدن', settingsTab: 'الإعدادات', profileTab: 'الملف الشخصي', darkMode: 'الوضع الليلي', language: 'اللغة', copyDetailsBtn: 'نسخ التفاصيل', closeBtn: 'إغلاق', directionsBtn: 'التوجيه عبر Google Maps', city: 'المدينة', vehicle: 'نوع المركبة', profileTitle: 'الملف الشخصي', nameLabel: 'الاسم', phoneLabel: 'رقم الهاتف', saveBtn: 'حفظ', savedTitle: 'تم الحفظ', savedDesc: 'تم حفظ البيانات محلياً بنجاح' },
    en: { appTitle: 'Routes', search: 'Search for a route or details...', linesTab: 'Routes', citiesTab: 'Cities', settingsTab: 'Settings', profileTab: 'Profile', darkMode: 'Dark Mode', language: 'Language', copyDetailsBtn: 'Copy Details', closeBtn: 'Close', directionsBtn: 'Directions via Google Maps', city: 'City', vehicle: 'Vehicle Type', profileTitle: 'Profile', nameLabel: 'Name', phoneLabel: 'Phone', saveBtn: 'Save', savedTitle: 'Saved', savedDesc: 'Data saved locally successfully' }
  };

  const ThemeContext = React.createContext();

  const ThemeProvider = function (props) {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('ar');
    const [selectedCity, setSelectedCity] = useState(1);

    const theme = useMemo(
      function () {
        return darkMode
          ? { colors: { primary: primaryColor, accent: accentColor, background: '#0F172A', card: '#111C2E', textPrimary: '#F1F5F9', textSecondary: '#CBD5E1', border: '#334155' } }
          : { colors: { primary: primaryColor, accent: accentColor, background: backgroundColor, card: cardColor, textPrimary: textPrimary, textSecondary: textSecondary, border: '#E2E8F0' } };
      },
      [darkMode]
    );

    const value = {
      theme,
      darkMode,
      toggleDarkMode: function () { setDarkMode(function (prev) { return !prev; }); },
      language,
      setLanguage,
      selectedCity,
      setSelectedCity,
      isRTL: language === 'ar',
      t: function (key) { return translations[language][key] || key; }
    };

    return React.createElement(ThemeContext.Provider, { value }, props.children);
  };

  const useTheme = function () { return useContext(ThemeContext); };

  const openUrlSafely = function (url) {
    if (!url) return;
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
      return;
    }
    Linking.openURL(url).catch(function () {});
  };

  const LineScreen = function () {
    const { theme, t, language, isRTL } = useTheme();
    const [search, setSearch] = useState('');
    const [selectedLine, setSelectedLine] = useState(null);

    const filtered = useMemo(function () {
      const q = search.toLowerCase();
      return transportLinesData.filter(function (line) {
        const text = [line.type_ar, line.type_en, line.from_ar, line.from_en, line.to_ar, line.to_en].join(' ').toLowerCase();
        return text.includes(q);
      });
    }, [search]);

    return React.createElement(
      View,
      { style: [styles.screen, { backgroundColor: theme.colors.background }] },
      React.createElement(View, { style: [styles.searchContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }] },
        React.createElement(TextInput, { style: [styles.searchInput, { color: theme.colors.textPrimary, textAlign: isRTL ? 'right' : 'left' }], value: search, onChangeText: setSearch, placeholder: t('search'), placeholderTextColor: theme.colors.textSecondary })
      ),
      React.createElement(FlatList, {
        data: filtered,
        keyExtractor: function (item) { return String(item.id); },
        renderItem: function ({ item }) {
          const lineType = language === 'ar' ? item.type_ar : item.type_en;
          const from = language === 'ar' ? item.from_ar : item.from_en;
          const to = language === 'ar' ? item.to_ar : item.to_en;
          return React.createElement(TouchableOpacity, { style: [styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }], onPress: function () { setSelectedLine(item); } },
            React.createElement(Text, { style: [styles.title, { color: theme.colors.textPrimary }] }, lineType),
            React.createElement(Text, { style: { color: theme.colors.textSecondary } }, from + ' → ' + to)
          );
        }
      }),
      React.createElement(Modal, { visible: !!selectedLine, transparent: true, animationType: 'slide', onRequestClose: function () { setSelectedLine(null); } },
        React.createElement(View, { style: styles.modalOverlay },
          React.createElement(View, { style: [styles.modalCard, { backgroundColor: theme.colors.card }] },
            selectedLine && React.createElement(Text, { style: [styles.title, { color: theme.colors.textPrimary }] }, language === 'ar' ? selectedLine.type_ar : selectedLine.type_en),
            selectedLine && React.createElement(TouchableOpacity, { style: styles.btn, onPress: function () { openUrlSafely(selectedLine.from_link || selectedLine.to_link); } },
              React.createElement(Text, { style: styles.btnText }, t('directionsBtn'))
            ),
            React.createElement(TouchableOpacity, { style: [styles.btn, { backgroundColor: '#475569' }], onPress: function () { setSelectedLine(null); } },
              React.createElement(Text, { style: styles.btnText }, t('closeBtn'))
            )
          )
        )
      )
    );
  };

  const CitiesScreen = function () {
    const { theme, language, selectedCity, setSelectedCity } = useTheme();
    return React.createElement(ScrollView, { style: [styles.screen, { backgroundColor: theme.colors.background }] },
      citiesData.map(function (city) {
        const name = language === 'ar' ? city.name_ar : city.name_en;
        return React.createElement(TouchableOpacity, { key: city.id, style: [styles.card, { backgroundColor: theme.colors.card, borderColor: selectedCity === city.id ? theme.colors.primary : theme.colors.border }], onPress: function () { setSelectedCity(city.id); } },
          React.createElement(Text, { style: [styles.title, { color: theme.colors.textPrimary }] }, name)
        );
      })
    );
  };

  const SettingsScreen = function () {
    const { theme, t, darkMode, toggleDarkMode, language, setLanguage } = useTheme();
    return React.createElement(View, { style: [styles.screen, { backgroundColor: theme.colors.background }] },
      React.createElement(View, { style: [styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }] },
        React.createElement(Text, { style: [styles.title, { color: theme.colors.textPrimary }] }, t('darkMode')),
        React.createElement(Switch, { value: darkMode, onValueChange: toggleDarkMode })
      ),
      React.createElement(View, { style: [styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }] },
        React.createElement(Text, { style: { color: theme.colors.textPrimary } }, t('language')),
        React.createElement(TouchableOpacity, { style: styles.btn, onPress: function () { setLanguage(language === 'ar' ? 'en' : 'ar'); } },
          React.createElement(Text, { style: styles.btnText }, language === 'ar' ? 'English' : 'العربية')
        )
      )
    );
  };

  const ProfileScreen = function () {
    const { theme, t } = useTheme();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(function () {
      AsyncStorage.getItem('profile').then(function (raw) {
        if (!raw) return;
        const parsed = JSON.parse(raw);
        setName(parsed.name || '');
        setPhone(parsed.phone || '');
      }).catch(function () {});
    }, []);

    const save = function () {
      AsyncStorage.setItem('profile', JSON.stringify({ name, phone })).then(function () {
        Alert.alert(t('savedTitle'), t('savedDesc'));
      });
    };

    return React.createElement(View, { style: [styles.screen, { backgroundColor: theme.colors.background }] },
      React.createElement(Text, { style: [styles.title, { color: theme.colors.textPrimary }] }, t('profileTitle')),
      React.createElement(TextInput, { style: [styles.input, { backgroundColor: theme.colors.card, color: theme.colors.textPrimary, borderColor: theme.colors.border }], value: name, onChangeText: setName, placeholder: t('nameLabel'), placeholderTextColor: theme.colors.textSecondary }),
      React.createElement(TextInput, { style: [styles.input, { backgroundColor: theme.colors.card, color: theme.colors.textPrimary, borderColor: theme.colors.border }], value: phone, onChangeText: setPhone, placeholder: t('phoneLabel'), placeholderTextColor: theme.colors.textSecondary }),
      React.createElement(TouchableOpacity, { style: styles.btn, onPress: save }, React.createElement(Text, { style: styles.btnText }, t('saveBtn')))
    );
  };

  const AppNavigator = function () {
    const { t, theme } = useTheme();
    return React.createElement(Tab.Navigator, {
      screenOptions: function ({ route }) {
        return {
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.textPrimary,
          tabBarStyle: { backgroundColor: theme.colors.card },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: function ({ color, size }) {
            const iconMap = { [t('linesTab')]: 'bus', [t('citiesTab')]: 'business', [t('settingsTab')]: 'settings', [t('profileTab')]: 'person' };
            return React.createElement(Ionicons, { name: iconMap[route.name] || 'ellipse', color, size });
          }
        };
      }
    },
    React.createElement(Tab.Screen, { name: t('linesTab'), component: LineScreen }),
    React.createElement(Tab.Screen, { name: t('citiesTab'), component: CitiesScreen }),
    React.createElement(Tab.Screen, { name: t('settingsTab'), component: SettingsScreen }),
    React.createElement(Tab.Screen, { name: t('profileTab'), component: ProfileScreen }));
  };

  return React.createElement(ThemeProvider, null,
    React.createElement(NavigationContainer, null,
      React.createElement(StatusBar, { barStyle: 'default' }),
      React.createElement(AppNavigator, null)
    )
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12 },
  searchContainer: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, marginBottom: 12 },
  searchInput: { minHeight: 44 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 },
  title: { fontSize: 17, fontWeight: '700', marginBottom: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 },
  modalCard: { borderRadius: 14, padding: 16 },
  btn: { marginTop: 12, backgroundColor: '#1E40AF', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  input: { borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 10 }
});

module.exports = ComponentFunction;
module.exports.default = ComponentFunction;
