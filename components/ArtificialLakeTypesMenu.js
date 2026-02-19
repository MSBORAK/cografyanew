import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const ArtificialLakeTypesMenu = ({ onSelectType, onBackToLakeMainMenu }) => {
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
                onBackToLakeMainMenu();
              }}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Göller Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🏗️ Yapay Göller</Text>
            <Text style={styles.subtitle}>Baraj gölleri</Text>
          </View>

          {/* Sadece Baraj Gölleri */}
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={[styles.menuButton, styles.artificialOnlyButton]}
              onPress={() => onSelectType('artificial')}
              activeOpacity={0.9}
            >
              <Text style={styles.icon}>🏗️</Text>
              <Text style={styles.buttonTitle}>Baraj Gölleri</Text>
              <Text style={styles.buttonSubtitle}>Su hazneleri ve barajlar</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuButton: {
    alignSelf: 'center',
    width: '85%',
    maxWidth: 320,
    borderRadius: 20,
    padding: 28,
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
  artificialOnlyButton: {
    backgroundColor: '#F97316',
  },
  icon: {
    fontSize: 48,
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 6,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
});

export default ArtificialLakeTypesMenu;
