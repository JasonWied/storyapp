import PushNotificationHelper from './utils/push-notification.js';

const SubscribePresenter = {
  async init({ subscribeBtn, unsubscribeBtn }) {
    let subscription = null;

    try {
      const registration = await navigator.serviceWorker.ready;
      subscription = await registration.pushManager.getSubscription();

      // Show correct button based on subscription
      const isSubscribed = Boolean(subscription);
      subscribeBtn.hidden = isSubscribed;
      unsubscribeBtn.hidden = !isSubscribed;
    } catch (err) {
      console.error('Gagal memeriksa status push subscription:', err.message);
      subscribeBtn.hidden = false;
      unsubscribeBtn.hidden = true;
    }

    subscribeBtn.addEventListener('click', async () => {
      try {
        await PushNotificationHelper.askPermission();
        const registration = await navigator.serviceWorker.ready;
        subscription = await PushNotificationHelper.subscribeUserToPush(registration);
        const result = await PushNotificationHelper.sendSubscriptionToServer(subscription);

        if (!result.error) {
          alert('Berhasil berlangganan notifikasi!');
          subscribeBtn.hidden = true;
          unsubscribeBtn.hidden = false;
        } else {
          alert('Gagal berlangganan: ' + result.message);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });

    unsubscribeBtn.addEventListener('click', async () => {
      try {
        if (!subscription) {
          const registration = await navigator.serviceWorker.ready;
          subscription = await registration.pushManager.getSubscription();
        }

        const result = await PushNotificationHelper.unsubscribeUserFromPush(subscription);
        await subscription.unsubscribe();

        if (!result.error) {
          alert('Berhasil berhenti berlangganan notifikasi!');
          subscribeBtn.hidden = false;
          unsubscribeBtn.hidden = true;
        } else {
          alert('Gagal unsubscribe: ' + result.message);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }
};

export default SubscribePresenter;
