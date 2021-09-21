'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'avgRotorSpeed' function below.
 *
 * URL for cut and paste
 * https://jsonmock.hackerrank.com/api/iot_devices/search?status={statusQuery}&page={number}
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING statusQuery
 *  2. INTEGER parentId
 */

const https = require('https');

async function request(statusQuery, { page = 1 } = {}) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    const request = https.get(`https://jsonmock.hackerrank.com/api/iot_devices/search?status=${statusQuery}&page=${page}`, res => {
      res.on('data', c => {
        chunks.push(c);
      });
      
      res.on('end', chunk => {
        const body = Buffer.concat(chunks);
        resolve(JSON.parse(body.toString()));
      });
      
      res.on('error', err => {
        console.error('Request ERROR ->', err);
        reject(err);
      });
    });

    request.end();
  });
}

async function getAllPages(statusQuery) {
  const response = [];
  
  let page = 1;
  let totalPages = 1;
  
  while(page <= totalPages) {
    const { total_pages, data } = await request(statusQuery, { page });

    totalPages = total_pages;
    response.push(...data);
    page++;
  }

  return response;
}

async function avgRotorSpeed(statusQuery, parentId) {
  const response = await getAllPages(statusQuery);

  const { totalSpeed, quantity } = response.reduce((acc, i) => {
    if (i.parent && i.parent.id === parentId) {
      acc.totalSpeed += i.operatingParams.rotorSpeed;
      acc.quantity++;
    }

    return acc;
  }, { totalSpeed: 0, quantity: 0 });

  return Math.round((totalSpeed / quantity) || 0);
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const statusQuery = readLine();

    const parentId = parseInt(readLine().trim(), 10);

    const result = await avgRotorSpeed(statusQuery, parentId);

    ws.write(result + '\n');

    ws.end();
}
