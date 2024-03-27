import mqtt from 'mqtt';
import {InfluxDB, Point} from '@influxdata/influxdb-client'

const token = 'K7MVFGETSqtNpc4vWArvmRw_r4d2pdxUTwzyFyQu6wgtroUuRcYaokkViNtM2KOTmAuywPD6OQlq8LurRA9pfQ=='
const url = 'http://192.168.0.153:8086'

const client1 = new InfluxDB({url, token})

let org = `Stage`
let bucket = `PLAQUE_DE_CUISSON`

let writeClient = client1.getWriteApi(org, bucket, 'ns')

const client = mqtt.connect('mqtt://192.168.0.153:1883');

client.on('connect', function () {
  //console.log('Connected to MQTT broker');
  client.subscribe('Humidity');
  client.subscribe('Temperature');
  client.subscribe('Power');
  client.subscribe('Ds18b20Temp');
  client.subscribe('MlxTemp');
  client.subscribe('ThermocoupleTemp');
  client.subscribe('ThermocoupleTestoTemp');
});

client.on('message', function (topicMqtt, message) {
  // message is Buffer
  //topicMqtt = topicMqtt.replace("Power", '');
  //console.log(topicMqtt + "\t", message.toString());

  let point = new Point(topicMqtt)
    .tag('tagname1', 'tagvalue1')
    .intField('field1', message.toString())

    void setTimeout(() => {
      writeClient.writePoint(point)
    },) 
  

});




