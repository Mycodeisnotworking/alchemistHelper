const qs=require('querystring');
const request=require('request');
const key="B3jbs7izT3mNCb8zQoJfDNgyqvlnv91h";
var item="무색 큐브 조각";
var inquiryMaterial=`https://api.neople.co.kr/df/auction?itemName=${qs.escape(item)}&sort=unitPrice:asc&limit=30&apikey=${key}`;
