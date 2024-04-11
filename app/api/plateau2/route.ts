// 1. Installer les dépendances nécessaires (ex: influxdb node client)
// 2. Configurer la connexion à la base de données InfluxDB
import { InfluxDB } from '@influxdata/influxdb-client';
import {NextResponse } from 'next/server';


const influxdb = new InfluxDB({
  url: 'http://192.168.0.153:8086',
  token: 'Grm2Vpl_k9QB7kaoIpCMwib4KICZOnHuVyP88RgmNU-5zYVNuCwChNH5GbToM7yHFGzyH6MwngiQIO93GmijxQ==',
});

const queryApi = influxdb.getQueryApi('17980c3d8cf14b98');
let f1 = '2023-03-26' // Déclarer f1 en variable globale
let f2 = '2023-03-27'  // Déclarer f2 en variable globale



export async function GET() {


  //const fluxQuery = 'from(bucket: "PLATEAU1") |> range(start: -5m)   |> filter(fn: (r) => r._field == "Ptot") |> drop(columns: ["_start", "table","_stop", "_measurement", "device", "SSID","result" ])  |> truncateTimeColumn(unit: 10s) |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")';
  const date = `from(bucket: "PLATEAU2") |> range(start: ${f1} , stop: ${f2})   |> filter(fn: (r) => r._field == "Ptot") |> drop(columns: ["_start", "table","_stop", "_measurement", "device", "SSID","result" ])  |> truncateTimeColumn(unit: 10s) |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")`;
  const data = await queryInfluxDB(date);

  // 5. Gérer les requêtes et les réponses
  return NextResponse.json(data);

}


export async function POST(req: Request) {

  const body = await req.json();
  f1 = body.from;
  f2 = body.to;
  // console.log("f1 = ",f1);
  // console.log("f2 = ",f2);


  return new Response('ok')
}


async function queryInfluxDB(fluxQuery: string) {
  const result = await queryApi.collectRows(fluxQuery);
  return result;
}