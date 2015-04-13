# What's  leap-mqtt
======

  This is a nodejs module for grasping gesture data from LeapMotion devices,and then send these data to mqtt servers。
  
## Install
```bash
$ npm install leap-mqtt
```
  
## Useage
```js
var LM=require('leap-mqtt');
	Leap2Mqtt=LM.LeapMqtt;
var client = LM.getClient('mqtt://MQTTSERVER:PORT');
var controller = LM.getController();
	controller.connect();
Leap2Mqtt.sendgesture(client,controller,'LEAP');

```

```js
var LM=require('leap-mqtt');
var client2 = LM.getClient('mqtt://MQTTSERVER:PORT');
	client2.subscribe('LEAP');
client2.on('message', function (topic, data) {
        console.log(data.toString());
});
```
