const axios = require('axios');
const url = 'http://3.92.215.217:3000/queryStreamKeys?stream=bb_stream';
const url1 = 'http://3.92.215.217:3000';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const checkAndPushNotifications = async () => {
  const result = await axios.get(url);
  const users = result.data.items;
  const stream = 'bb_stream';
  console.log('Total Users', users.length);
  await asyncForEach(users, async (user, index) => {
    console.log('index', index);
    try {
      const response = await axios.get(
        `${url1}/queryDataByKey?stream=${stream}&key=${user}`,
      );
      const items = response.data.items;
      let data = {};
      if (items.length > 0) {
        data = JSON.parse(items[items.length - 1].data);
      }

      const { deviceToken, childVaccines } = data;
      if (deviceToken && childVaccines) {
        console.log(`UserInfo user ${user} deviceToken ${deviceToken}`);
        let keys = [];
        for (let key in childVaccines) {
          keys.push(key);
        }
        await asyncForEach(keys, async (key, index) => {
          const dueDate = childVaccines[key].dueDate;
          const dueDateArray = dueDate.split("/");
          const [dd, mm, yyyy ] = dueDateArray;
          const dateFormatted = `${yyyy}-${mm}-${dd}`;
          const childDueDate = new Date(dateFormatted);
          const dueDateString = childDueDate.getDate() + '/' + (childDueDate.getMonth()+1)+ '/' + childDueDate.getFullYear();

          let reminderDate = new Date().addDays(2); // To send reminder before 2 days
          let reminderDateString = reminderDate.getDate() + '/' + (reminderDate.getMonth()+1) + '/' + reminderDate.getFullYear();
          console.log(`2 days Reminder Date, ${reminderDateString} for ${user}`);

          if(reminderDateString === dueDateString) {
            // If reminder date is equal to due date send notification
            console.log(`sending push notification for user ${user} ${key}`)
            const notificationData = {
              to: data.deviceToken,
              notification: {
                body: '48 HRS left for next vaccine, hurry up',
                title: 'Baby Boo Vaccine Reminder',
                content_available: true,
                priority: 'high',
              },
              data: {
                body: '48 HRS left for next vaccine, hurry up',
                title: 'Baby Boo Vaccine Reminder',
                content_available: true,
                priority: 'high',
              },
            };
            axios.defaults.headers.common[
              'Authorization'
              ] = `key=AAAAVD9hswU:APA91bGTDcpQtJiISU9yPvzdbb0Hkg9BjXGKtZ2rJQKxFUCTKXQqVPYhnx6nGs4kGxJlZBZaX2PPKSGKyqis9TSW_fjtcmft_BYweHts9shrjU_jdaTqPFHoSNXMxhxA3m-WxKWTbnkb`;
            await axios.post(
              'https://fcm.googleapis.com/fcm/send',
              notificationData,
            );
          }

          reminderDate = new Date().addDays(1);// To send reminder before 1 day
          reminderDateString = reminderDate.getDate() + '/' + (reminderDate.getMonth()+1) + '/' + reminderDate.getFullYear();
          console.log(`1 day Reminder Date, ${reminderDateString} for ${user}`);
          if(reminderDateString === dueDateString) {
            // If reminder date is equal to due date send notification
            console.log(`sending push notification for user ${user} ${key}`)
            const notificationData = {
              to: data.deviceToken,
              notification: {
                body: '24 HRS left for next vaccine, hurry up',
                title: 'Baby Boo Vaccine Reminder',
                content_available: true,
                priority: 'high',
              },
              data: {
                body: '24 HRS left for next vaccine, hurry up',
                title: 'Baby Boo Vaccine Reminder',
                content_available: true,
                priority: 'high',
              },
            };
            axios.defaults.headers.common[
              'Authorization'
              ] = `key=AAAAVD9hswU:APA91bGTDcpQtJiISU9yPvzdbb0Hkg9BjXGKtZ2rJQKxFUCTKXQqVPYhnx6nGs4kGxJlZBZaX2PPKSGKyqis9TSW_fjtcmft_BYweHts9shrjU_jdaTqPFHoSNXMxhxA3m-WxKWTbnkb`;
            await axios.post(
              'https://fcm.googleapis.com/fcm/send',
              notificationData,
            );
          }
        });

      }
      if (index === users.length - 1) {
        console.log('End of Push notifications');
      }
    } catch (e) {
      console.log('error for user ', user);
    }
  });
};

module.exports = { checkAndPushNotifications };
