import { InfluxDB } from '@influxdata/influxdb-client';
import { NextResponse } from 'next/server';

const influxdb = new InfluxDB({
  url: 'http://192.168.0.153:8086',
  token: 'Grm2Vpl_k9QB7kaoIpCMwib4KICZOnHuVyP88RgmNU-5zYVNuCwChNH5GbToM7yHFGzyH6MwngiQIO93GmijxQ==',
});

const queryApi = influxdb.getQueryApi('17980c3d8cf14b98');




export  async function GET() {
  const fluxQuery = 'from(bucket: "PLAQUE_DE_CUISSON") |> range(start: -5m) |> drop(columns: ["_start", "_stop", "_field", "table", "tagname1", "result", "table"])  |> truncateTimeColumn(unit: 10s) |> pivot(rowKey:["_time"], columnKey: ["_measurement"], valueColumn: "_value")';
  //const union = 'union(tables: [ from(bucket: "PLAQUE_DE_CUISSON") |> range(start: -5m) |> filter(fn: (r) => r._measurement == "Temperature") |> drop(columns: ["_start", "_stop", "_field", "table", "tagname1", "result", "table"]) |> truncateTimeColumn(unit: 1s), from(bucket: "PLAQUE_DE_CUISSON") |> range(start: -5m) |> filter(fn: (r) => r._measurement == "Humidity") |> drop(columns: ["_start", "_stop", "_field", "table", "tagname1","result", "table"]) |> truncateTimeColumn(unit: 1s), from(bucket: "PLAQUE_DE_CUISSON") |> range(start: -5m)  |> filter(fn: (r) => r._measurement == "Power") |> drop(columns: ["_start", "_stop", "_field", "table", "tagname1", "result", "table"]) |> truncateTimeColumn(unit: 1s), from(bucket: "PLAQUE_DE_CUISSON") |> range(start: -5m) |> filter(fn: (r) => r._measurement == "Ds18b20Temp")  |> drop(columns: ["_start", "_stop", "_field", "table", "tagname1", "result", "table"]) |> truncateTimeColumn(unit: 1s), from(bucket: "PLAQUE_DE_CUISSON") |> range(start: -5m) |> filter(fn: (r) => r._measurement == "ThermocoupleTemp")  |> drop(columns: ["_start", "_stop", "_field", "table", "tagname1", "result", "table"]) |> truncateTimeColumn(unit: 1s), from(bucket: "PLAQUE_DE_CUISSON") |> range(start: -5m) |> filter(fn: (r) => r._measurement == "ThermocoupleTestoTemp")  |> drop(columns: ["_start", "_stop", "_field", "table", "tagname1", "result", "table"]) |> truncateTimeColumn(unit: 1s), from(bucket: "PLAQUE_DE_CUISSON") |> range(start: -5m)  |> filter(fn: (r) => r._measurement == "MlxTemp")  |> drop(columns: ["_start", "_stop", "_field", "table", "tagname1", "result", "table"]) |> truncateTimeColumn(unit: 1s),]) |> pivot(rowKey: ["_time"], columnKey: ["_measurement"], valueColumn: "_value" )'
  const data = await queryInfluxDB(fluxQuery);
  return NextResponse.json(data);
}

async function queryInfluxDB(fluxQuery: string) {
  const result = await queryApi.collectRows(fluxQuery);
  return result;
}

