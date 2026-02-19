import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TurkeyMapSimple = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handlePress = (cityName) => {
    Alert.alert('Tıklandı!', cityName);
    setSelectedCity(cityName);
  };

  // Basit bir test path'i (Ankara)
  const testPath = "M349.776,112.635l-0.47,0.969l-0.062,0.125l-0.125,0.062l-1.939,1.187";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Haritası</Text>
      <Text style={styles.subtitle}>
        Seçilen: {selectedCity || 'Henüz seçim yapılmadı'}
      </Text>
      
      <Svg
        width={SCREEN_WIDTH * 0.9}
        height={300}
        viewBox="0 0 1007.478 527.323"
        style={styles.svg}
      >
        <Path
          d={testPath}
          fill={selectedCity === 'Ankara' ? '#2563EB' : '#E5E7EB'}
          stroke="#1F2937"
          strokeWidth="2"
          onPress={() => handlePress('Ankara')}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  svg: {
    backgroundColor: 'transparent',
  },
});

export default TurkeyMapSimple;
