# 使用expo的通知系统



### 第一步

在firebase 中创建项目， 下载服务token文件



### 第二步

```
pnpm create expo-app notification
```

```
cd notification 
```

```
eas init
```

```
eas build:configure
```

选择all

然后先到app.json中

```
 "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.evay_din.notification"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.evay_din.notification"
    },
```

加上bundleIdentifier和package

```
eas credentials
```

选择 android

选择production

选择 Google Service Account

选择Manage your Google Service Account Key for Push Notifications (FCM V1)

选择Set up a Google Service Account Key for Push Notifications (FCM V1)

然后选择./notifications-76c1c-firebase-adminsdk-fbsvc-1e934c541d.json

上传成功之后 ctrl + c



### 第三步

到firebase中创建安卓应用

添加指纹

指纹的创建方式：

```
eas build -p android
```

然后到expo控制台中， 进入这个项目中

![image-20251030161351263](/Users/dingyiwei/Library/Application Support/typora-user-images/image-20251030161351263.png)

![image-20251030161519940](/Users/dingyiwei/Library/Application Support/typora-user-images/image-20251030161519940.png)

然后下载google-services.json文件

把不需要上传到git的文件标注到.gitignore文件中

```
goggle-services.json
/ios
/android
```

创建.easignore

然后把gitignore中的所有代码复制到.easignore中， 但是要把

```
goggle-services.json
```

这一行删掉



### 第四步

在app.json中

```
"android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.evay_din.notification",
      "googleServicesFile": "./google-services.json"
    },
```

添加"googleServicesFile": "./google-services.json"这一行



### 第五步

https://docs.expo.dev/push-notifications/push-notifications-setup/

```
npx expo install expo-notifications expo-device expo-constants
```



### 第六步

创建 utils/registerForPushNotificationsAsync.ts文件

```
```











