import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Platform } from 'react-native';
import { Home, ChevronLeft, BookOpen, Map, Target, BookMarked, Lightbulb } from 'lucide-react-native';

const AppLogicScreen = ({ onBack }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.backButtonsColumn}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Home size={24} color="#10B981" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <ChevronLeft size={24} color="#10B981" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Uygulama Mantığı</Text>
          <Text style={styles.subtitle}>Coğrafya uygulaması nasıl çalışır?</Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <BookOpen size={28} color="#10B981" />
              <Text style={styles.cardTitle}>Genel Yapı</Text>
            </View>
            <Text style={styles.cardText}>
              Uygulama ana menüden başlar. Buradan haritalar, quiz’ler, öğrenme ve pratik modlarına geçersin. 
              Her sayfada «Ana Menü» ile başa, «Geri» ile bir önceki sayfaya dönebilirsin.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Map size={28} color="#F97316" />
              <Text style={styles.cardTitle}>Haritalar</Text>
            </View>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>Türkiye Haritası:</Text> 81 ili haritada bul, bölgelere göre incele; dağlar, göller, ovalar, platolar gibi alt menülere gidebilirsin.{'\n\n'}
              <Text style={styles.bold}>Dünya Haritası:</Text> Kıtalar ve ülkeler; haritada ülke bulma veya bayrak/başkent quiz’leri.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Target size={28} color="#10B981" />
              <Text style={styles.cardTitle}>Quiz Modu</Text>
            </View>
            <Text style={styles.cardText}>
              Türkiye, Dünya veya Karışık quiz seçilir. Önce <Text style={styles.bold}>zorluk</Text> seçersin: Kolay (4 şık), Orta (4 şık), Zor (3 şık), Ultra Zor (2 şık). 
              Zor ve Ultra Zor’da daha zor sorular gelir. Günlük Quiz ise ana menüdeki sayaç kartından açılır; her gün 20 soru.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <BookMarked size={28} color="#EC4899" />
              <Text style={styles.cardTitle}>Pratik Modu</Text>
            </View>
            <Text style={styles.cardText}>
              Haritalarda veya quiz’lerde yanlış yaptığın sorular otomatik kaydedilir. Pratik Modu’nda sadece bu soruları tekrar edersin (Türkiye şehirleri, dünya ülkeleri, dağlar, göller, bayraklar). 
              «Pratik Yap» ile ilgili ekrana gider, doğru yaptıkça listeden düşer.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Lightbulb size={28} color="#059669" />
              <Text style={styles.cardTitle}>Öğrenme Modu</Text>
            </View>
            <Text style={styles.cardText}>
              Bilgi odaklı bölümler: <Text style={styles.bold}>Türkiye Şehirleri</Text> (haritada il il gezinip ilginç bilgiler), 
              <Text style={styles.bold}> Anahtar Kelimeler</Text> (kavram kartlarıyla tanımlar), 
              <Text style={styles.bold}> Dünya Ülkeleri / Bayraklar</Text> (keşfet + test). 
              Rozetler ana menüde 🏅 ile açılır; günlük tamamlama ve tam puan gibi koşullarla kazanılır.
            </Text>
          </View>

          <View style={styles.footerCard}>
            <Text style={styles.footerText}>Özet: Harita → keşfet, Quiz → test et, Pratik → yanlışları tekrarla, Öğrenme → bilgi oku. Hepsi ana menüden erişilir.</Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 52 : 44,
    paddingBottom: 2,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  backText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.15)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  cardText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 22,
  },
  bold: {
    fontWeight: '700',
    color: '#E2E8F0',
  },
  footerCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  footerText: {
    fontSize: 14,
    color: '#A7F3D0',
    lineHeight: 21,
    textAlign: 'center',
  },
});

export default AppLogicScreen;
