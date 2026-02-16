import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const TurkeyMenu = ({ 
  onSelectCities, 
  onSelectRegions, 
  onSelectRegionsOnly, 
  onSelectMountains, 
  onSelectPlains, 
  onSelectLakes, 
  onSelectUnesco,
  onSelectMassifs,
  onSelectCoasts,
  onSelectPlateaus,
  onSelectNeighbors,
  onSelectBorderGates,
  onBackToMain 
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => {
                console.log('Geri butonu tıklandı');
                onBackToMain();
              }}
            >
              <ChevronLeft size={20} color="#FFFFFF" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🇹🇷 Türkiye Haritası</Text>
            <Text style={styles.subtitle}>Öğrenmek istediğin konuyu seç</Text>
          </View>

          {/* Menu Buttons - Grid Layout */}
          <View style={styles.menuContainer}>
            {/* İlk Satır */}
            <View style={styles.row}>
              {/* 81 İl */}
              <TouchableOpacity
                style={[styles.menuButton, styles.citiesButton]}
                onPress={() => {
                  console.log('81 İl butonu tıklandı');
                  onSelectCities();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🏙️</Text>
                <Text style={styles.buttonTitle}>81 İl</Text>
              </TouchableOpacity>

              {/* 7 Coğrafi Bölge */}
              <TouchableOpacity
                style={[styles.menuButton, styles.regionsButton]}
                onPress={() => {
                  console.log('Bölgeler butonu tıklandı');
                  onSelectRegions();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🗺️</Text>
                <Text style={styles.buttonTitle}>7 Bölge</Text>
              </TouchableOpacity>
            </View>

            {/* İkinci Satır */}
            <View style={styles.row}>
              {/* Bölgeler Haritası */}
              <TouchableOpacity
                style={[styles.menuButton, styles.regionsOnlyButton]}
                onPress={() => {
                  console.log('Bölgeler Haritası butonu tıklandı');
                  onSelectRegionsOnly();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>📍</Text>
                <Text style={styles.buttonTitle}>Bölgeler</Text>
              </TouchableOpacity>

              {/* Dağlar */}
              <TouchableOpacity
                style={[styles.menuButton, styles.mountainsButton]}
                onPress={() => {
                  console.log('Dağlar butonu tıklandı');
                  onSelectMountains();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>⛰️</Text>
                <Text style={styles.buttonTitle}>Dağlar</Text>
              </TouchableOpacity>
            </View>

            {/* Üçüncü Satır */}
            <View style={styles.row}>
              {/* Ovalar */}
              <TouchableOpacity
                style={[styles.menuButton, styles.plainsButton]}
                onPress={() => {
                  console.log('Ovalar butonu tıklandı');
                  onSelectPlains();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🌾</Text>
                <Text style={styles.buttonTitle}>Ovalar</Text>
              </TouchableOpacity>

              {/* Göller */}
              <TouchableOpacity
                style={[styles.menuButton, styles.lakesButton]}
                onPress={() => {
                  console.log('Göller butonu tıklandı');
                  onSelectLakes();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🌊</Text>
                <Text style={styles.buttonTitle}>Göller</Text>
              </TouchableOpacity>
            </View>

            {/* Dördüncü Satır */}
            <View style={styles.row}>
              {/* UNESCO Mirası */}
              <TouchableOpacity
                style={[styles.menuButton, styles.unescoButton]}
                onPress={() => {
                  console.log('UNESCO butonu tıklandı');
                  onSelectUnesco();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🏛️</Text>
                <Text style={styles.buttonTitle}>UNESCO</Text>
              </TouchableOpacity>

              {/* Masif Araziler */}
              <TouchableOpacity
                style={[styles.menuButton, styles.massifsButton]}
                onPress={() => {
                  console.log('Masif Araziler butonu tıklandı');
                  onSelectMassifs();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🗻</Text>
                <Text style={styles.buttonTitle}>Masifler</Text>
              </TouchableOpacity>
            </View>

            {/* Beşinci Satır */}
            <View style={styles.row}>
              {/* Kıyı Tipleri */}
              <TouchableOpacity
                style={[styles.menuButton, styles.coastsButton]}
                onPress={() => {
                  console.log('Kıyı Tipleri butonu tıklandı');
                  onSelectCoasts();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🏖️</Text>
                <Text style={styles.buttonTitle}>Kıyılar</Text>
              </TouchableOpacity>

              {/* Platolar */}
              <TouchableOpacity
                style={[styles.menuButton, styles.plateausButton]}
                onPress={() => {
                  console.log('Platolar butonu tıklandı');
                  onSelectPlateaus();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🏔️</Text>
                <Text style={styles.buttonTitle}>Platolar</Text>
              </TouchableOpacity>
            </View>

            {/* Altıncı Satır */}
            <View style={styles.row}>
              {/* Komşu Ülkeler */}
              <TouchableOpacity
                style={[styles.menuButton, styles.neighborsButton]}
                onPress={() => {
                  console.log('Komşular butonu tıklandı');
                  onSelectNeighbors();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🤝</Text>
                <Text style={styles.buttonTitle}>Komşular</Text>
              </TouchableOpacity>

              {/* Sınır Kapıları */}
              <TouchableOpacity
                style={[styles.menuButton, styles.borderGatesButton]}
                onPress={() => {
                  console.log('Sınır Kapıları butonu tıklandı');
                  onSelectBorderGates();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🚪</Text>
                <Text style={styles.buttonTitle}>Sınır Kapıları</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 6,
  },
  backText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 8,
    gap: 8,
  },
  menuButton: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 110,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  singleButton: {
    maxWidth: 110,
  },
  citiesButton: {
    backgroundColor: '#EF4444',
  },
  regionsButton: {
    backgroundColor: '#10B981',
  },
  regionsOnlyButton: {
    backgroundColor: '#8B5CF6',
  },
  mountainsButton: {
    backgroundColor: '#F97316',
  },
  plainsButton: {
    backgroundColor: '#84CC16',
  },
  lakesButton: {
    backgroundColor: '#06B6D4',
  },
  unescoButton: {
    backgroundColor: '#A855F7',
  },
  massifsButton: {
    backgroundColor: '#78716C',
  },
  coastsButton: {
    backgroundColor: '#0EA5E9',
  },
  plateausButton: {
    backgroundColor: '#DC2626',
  },
  neighborsButton: {
    backgroundColor: '#059669',
  },
  borderGatesButton: {
    backgroundColor: '#DC2626',
  },
  icon: {
    fontSize: 28,
    marginBottom: 4,
  },
  buttonTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default TurkeyMenu;
