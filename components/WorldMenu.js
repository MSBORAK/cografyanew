import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const WorldMenu = ({ 
  onSelectWorldMap,
  onSelectContinents,
  onSelectEurope,
  onSelectAsia,
  onSelectAfrica,
  onSelectAmerica,
  onSelectOceania,
  onSelectFlags,
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
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🌍 Dünya Haritası</Text>
            <Text style={styles.subtitle}>Keşfetmek istediğin bölgeyi seç</Text>
          </View>

          {/* Menu Buttons - Grid Layout */}
          <View style={styles.menuContainer}>
            {/* İlk Satır */}
            <View style={styles.row}>
              {/* Tüm Dünya */}
              <TouchableOpacity
                style={[styles.menuButton, styles.worldButton]}
                onPress={() => {
                  console.log('Tüm Dünya butonu tıklandı');
                  onSelectWorldMap();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🌐</Text>
                <Text style={styles.buttonTitle}>Tüm Dünya</Text>
              </TouchableOpacity>

              {/* Kıtalar */}
              <TouchableOpacity
                style={[styles.menuButton, styles.continentsButton]}
                onPress={() => {
                  console.log('Kıtalar butonu tıklandı');
                  onSelectContinents();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🌍</Text>
                <Text style={styles.buttonTitle}>Kıtalar</Text>
              </TouchableOpacity>
            </View>

            {/* İkinci Satır */}
            <View style={styles.row}>
              {/* Avrupa */}
              <TouchableOpacity
                style={[styles.menuButton, styles.europeButton]}
                onPress={() => {
                  console.log('Avrupa butonu tıklandı');
                  onSelectEurope();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🇪🇺</Text>
                <Text style={styles.buttonTitle}>Avrupa</Text>
              </TouchableOpacity>

              {/* Asya */}
              <TouchableOpacity
                style={[styles.menuButton, styles.asiaButton]}
                onPress={() => {
                  console.log('Asya butonu tıklandı');
                  onSelectAsia();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🌏</Text>
                <Text style={styles.buttonTitle}>Asya</Text>
              </TouchableOpacity>
            </View>

            {/* Üçüncü Satır */}
            <View style={styles.row}>
              {/* Afrika */}
              <TouchableOpacity
                style={[styles.menuButton, styles.africaButton]}
                onPress={() => {
                  console.log('Afrika butonu tıklandı');
                  onSelectAfrica();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🌍</Text>
                <Text style={styles.buttonTitle}>Afrika</Text>
              </TouchableOpacity>

              {/* Amerika */}
              <TouchableOpacity
                style={[styles.menuButton, styles.americaButton]}
                onPress={() => {
                  console.log('Amerika butonu tıklandı');
                  onSelectAmerica();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🌎</Text>
                <Text style={styles.buttonTitle}>Amerika</Text>
              </TouchableOpacity>
            </View>

            {/* Dördüncü Satır */}
            <View style={styles.row}>
              {/* Okyanusya */}
              <TouchableOpacity
                style={[styles.menuButton, styles.oceaniaButton]}
                onPress={() => {
                  console.log('Okyanusya butonu tıklandı');
                  onSelectOceania();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🏝️</Text>
                <Text style={styles.buttonTitle}>Okyanusya</Text>
              </TouchableOpacity>

              {/* Bayrak Quiz */}
              <TouchableOpacity
                style={[styles.menuButton, styles.flagsButton]}
                onPress={() => {
                  console.log('Bayrak Quiz butonu tıklandı');
                  onSelectFlags();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🚩</Text>
                <Text style={styles.buttonTitle}>Bayrak Quiz</Text>
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
    gap: 12,
  },
  menuButton: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 130,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  worldButton: {
    backgroundColor: '#3B82F6',
  },
  continentsButton: {
    backgroundColor: '#10B981',
  },
  europeButton: {
    backgroundColor: '#8B5CF6',
  },
  asiaButton: {
    backgroundColor: '#F59E0B',
  },
  africaButton: {
    backgroundColor: '#EF4444',
  },
  americaButton: {
    backgroundColor: '#06B6D4',
  },
  oceaniaButton: {
    backgroundColor: '#14B8A6',
  },
  flagsButton: {
    backgroundColor: '#EC4899',
  },
  icon: {
    fontSize: 40,
    marginBottom: 6,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default WorldMenu;
