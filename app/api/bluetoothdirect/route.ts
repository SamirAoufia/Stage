// 1. Installer les dépendances nécessaires (ex: influxdb node client)
// 2. Configurer la connexion à la base de données InfluxDB
import { InfluxDB } from '@influxdata/influxdb-client';
import {NextResponse } from 'next/server';


const influxdb = new InfluxDB({
  url: 'http://192.168.0.153:8086',
  token: 'Grm2Vpl_k9QB7kaoIpCMwib4KICZOnHuVyP88RgmNU-5zYVNuCwChNH5GbToM7yHFGzyH6MwngiQIO93GmijxQ==',
});

const queryApi = influxdb.getQueryApi('17980c3d8cf14b98');
let f1 = '-5m' // Déclarer f1 en variable globale




export async function GET() {


  const fluxQuery = `from(bucket: "Bluetooth") |> range(start: ${f1})   |> pivot(rowKey:["_time"], columnKey: ["_measurement"], valueColumn: "_value") `;
 

  const data = await queryInfluxDB(fluxQuery);

  // 5. Gérer les requêtes et les réponses
  return NextResponse.json(data);

}

export async function POST(req: Request) {

  const body = await req.json();
  f1 = body.time;
  // console.log("f1 = ",f1);


  return new Response('ok')
}



async function queryInfluxDB(fluxQuery: string) {
  const result = await queryApi.collectRows(fluxQuery);
  return result;
}