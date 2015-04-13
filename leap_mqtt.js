exports.sendgesture = function (client,controller,topic) {
    var pretimestamp = null,
        pregesture = null;
    controller.on("frame", function (frame) {
        if (frame.data.gestures != undefined && frame.data.gestures.length > 0) {
            for (var i = 0; i < frame.data.gestures.length; i++) {
                //console.log(frame.data.gestures);
                for (dev in frame.controller.devices) {
                    if (pretimestamp == null && pregesture == null) {
                        pretimestamp = frame.timestamp;
                        pregesture = frame.data.gestures[i].type;
                        client.publish(topic,'{"name":"' + dev + '","dev":"leap","time":"' + frame.timestamp + '","type":"gesture","gesture":{"name":"' + frame.data.gestures[i].type + '","edge":"' + frame.data.gestures[i].state + '"}}');
                    } else if(parseFloat(frame.timestamp) - parseFloat(pretimestamp) < 500000 ){
                        pretimestamp = frame.timestamp;
                        pregesture = frame.data.gestures[i].type;
                    } else if (pregesture !== frame.data.gestures[i].type || parseFloat(frame.timestamp) - parseFloat(pretimestamp) > 2000000 || frame.data.gestures[i].state == 'stop') {
                        client.publish(topic, '{"name":"' + dev + '","dev":"leap","time":"' + frame.timestamp + '","type":"gesture","gesture":{"name":"' + frame.data.gestures[i].type + '","edge":"' + frame.data.gestures[i].state + '"}}');
                        pretimestamp = frame.timestamp;
                        pregesture = frame.data.gestures[i].type;
                    } else {
                        pretimestamp = frame.timestamp;
                        pregesture = frame.data.gestures[i].type;
                    }

                }
            }
        }
    });
    controller.on('streamingStarted', function () {
         client.publish(topic, '{"name":"LEAPMOTION","dev":"leap","time":null,"type":"gesture","gesture":{"name":"devicein","edge":"start"}}');
    });
    controller.on('streamingStopped', function () {
        client.publish(topic, '{"name":"LEAPMOTION","dev":"leap","time":null,"type":"gesture","gesture":{"name":"deviceout","edge":"stop"}}');
    });
}