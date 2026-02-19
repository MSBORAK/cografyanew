import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DAILY_REMINDER_KEY = '@map_quiz_daily_reminder_v4';
const HOUR = 18;
const MINUTE = 13;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Sonraki 18:13 tarihini hesapla
function getNextTriggerDate() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(HOUR, MINUTE, 0, 0);
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

export async function setupDailyReminder() {
  try {
    const isScheduled = await AsyncStorage.getItem(DAILY_REMINDER_KEY);
    if (isScheduled === 'true') {
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('osym_reminder', {
        name: 'ÖSYM Hatırlatması',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#F59E0B',
      });
    }

    const content = {
      title: 'Bugün ÖSYM için ne yaptın? 📚',
      body: 'Harita Quiz ile coğrafya bilgini pekiştir!',
      data: {},
    };

    if (Platform.OS === 'ios') {
      await Notifications.scheduleNotificationAsync({
        content,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: HOUR,
          minute: MINUTE,
        },
      });
    } else {
      // Android: DAILY desteklenmediği için DATE ile tek seferlik planla
      // Her uygulama açılışında bir sonraki 18:13 için yeniden planlanacak
      const nextDate = getNextTriggerDate();
      await Notifications.scheduleNotificationAsync({
        content,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: nextDate,
          channelId: 'osym_reminder',
        },
      });
    }

    await AsyncStorage.setItem(DAILY_REMINDER_KEY, 'true');
  } catch (error) {
    console.warn('Hatırlatma ayarlanamadı:', error);
  }
}

// Android için: Uygulama her açıldığında sonraki 18:13'ü planla
export async function rescheduleAndroidReminder() {
  if (Platform.OS !== 'android') return;
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') return;

    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const hasFuture = scheduled.some((n) => {
      const trigger = n.trigger;
      if (trigger && typeof trigger === 'object' && 'date' in trigger) {
        return new Date(trigger.date).getTime() > Date.now();
      }
      return false;
    });

    if (!hasFuture) {
      const nextDate = getNextTriggerDate();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Bugün ÖSYM için ne yaptın? 📚',
          body: 'Harita Quiz ile coğrafya bilgini pekiştir!',
          data: {},
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: nextDate,
          channelId: 'osym_reminder',
        },
      });
    }
  } catch (e) {
    console.warn('Android hatırlatma yeniden planlanamadı:', e);
  }
}
