// src/scripts/utils/push-notification.js
import Auth from '../data/auth.js';

const PushNotificationHelper = {
  async askPermission() {
    if (!('Notification' in window)) return;

    const status = await Notification.requestPermission();
    if (status !== 'granted') {
      throw new Error('Notification permission not granted');
    }
  },

  async subscribeUserToPush(registration) {
    const vapidPublicKey = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';
    const convertedKey = this.urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey
    });

    return subscription;
  },

  async sendSubscriptionToServer(subscription) {
    const token = Auth.getToken();

    const subscriptionObj = subscription.toJSON ? subscription.toJSON() : subscription;
    if ('expirationTime' in subscriptionObj) {
      delete subscriptionObj.expirationTime;
    }

    const response = await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscriptionObj)
    });

    return response.json();
  },

  async unsubscribeUserFromPush(subscription) {
    const token = Auth.getToken();
    const body = { endpoint: subscription.endpoint };

    const response = await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return response.json();
  },

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  }
};

export default PushNotificationHelper;
