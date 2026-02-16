import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const MountainTypesMenu = ({ onSelectType, onSelectAdjust, onBackToTurkeyMenu }) => {
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
                onBackToTurkeyMenu();
              }}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Türkiye Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>⛰️ Dağlar</Text>
            <Text style={styles.subtitle}>Dağ tipini seç</Text>
          </View>

          {/* Menu Buttons - Grid Layout */}
          <View style={styles.menuContainer}>
            {/* İlk Satır */}
            <View style={styles.row}>
              {/* Volkanik Dağlar */}
              <TouchableOpacity
                style={[styles.menuButton, styles.volcanicButton]}
                onPress={() => {
                  console.log('Volkanik Dağlar butonu tıklandı');
                  onSelectType('volcanic');
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🌋</Text>
                <Text style={styles.buttonTitle}>Volkanik</Text>
              </TouchableOpacity>

              {/* Tektonik Dağlar */}
              <TouchableOpacity
                style={[styles.menuButton, styles.tectonicButton]}
                onPress={() => {
                  console.log('Kıvrımlı Dağlar butonu tıklandı');
                  onSelectType('tectonic');
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>⛰️</Text>
                <Text style={styles.buttonTitle}>Kıvrımlı</Text>
              </TouchableOpacity>
            </View>

            {/* İkinci Satır */}
            <View style={styles.row}>
              {/* Kırık Dağlar */}
              <TouchableOpacity
                style={[styles.menuButton, styles.faultButton]}
                onPress={() => {
                  console.log('Kırıklı Dağlar butonu tıklandı');
                  onSelectType('fault');
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>🏔️</Text>
                <Text style={styles.buttonTitle}>Kırıklı</Text>
              </TouchableOpacity>

              {/* Konum Ayarla */}
              <TouchableOpacity
                style={[styles.menuButton, styles.adjustButton]}
                onPress={() => {
                  console.log('Konum Ayarla butonu tıklandı');
                  onSelectAdjust();
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.icon}>⚙️</Text>
                <Text style={styles.buttonTitle}>Konum Ayarla</Text>
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
  singleButton: {
    maxWidth: 130,
  },
  volcanicButton: {
    backgroundColor: '#EF4444',
  },
  tectonicButton: {
    backgroundColor: '#F97316',
  },
  faultButton: {
    backgroundColor: '#8B5CF6',
  },
  adjustButton: {
    backgroundColor: '#10B981',
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

export default MountainTypesMenu;
