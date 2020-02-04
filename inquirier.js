const qs=require('querystring');
const request=require('request');
const materials = require('./materials');
const key="B3jbs7izT3mNCb8zQoJfDNgyqvlnv91h";
var maxPrice=new Map();

var lowest;
var itemName=[];
var itemLimit=30;
var inquiryMaterial;
var allowedPerSec=100;
for(var key1 in materials){
    for(var key2 in materials[key1]){
        for(var item in materials[key1][key2]){
            itemName.push(materials[key1][key2][item]);
        }
    }
}

var countCeiling=500;//다 합쳐서 이 수 이상이면 최대값 산정


for(var i=0;i<itemName.length;i++){
    ((j)=>{
        setTimeout(()=>{
            if(itemName[j]=="생명의 숨결"){
                countCeiling=2000;
            }
            else{
                countCeiling=500;
            }
            inquiryMaterial=`https://api.neople.co.kr/df/auction?itemName=${qs.escape(itemName[j])}&sort=unitPrice:asc&limit=${itemLimit}&apikey=${key}`;
            request.get(inquiryMaterial, (err, res, body)=>{
                var str=JSON.parse(body)["rows"];

                if(!str){
                    maxPrice.set(itemName[j], {
                        itemName: itemName[j],
                        price: null,
                        averagePrice: null,
                        count: 0,
                        lowest: null,
                        status: "매물 없음"
                    });
                    return;
                }
                var count=0;
                var checked=false;
                lowest=Number.MAX_VALUE;
                for(var idx=0;idx<str.length;idx++){
                    count+=str[idx].count;
                    if(count>=countCeiling){
                        try{
                            if(!maxPrice.get(itemName[j])){
                                lowest=str[idx].unitPrice;
                            }else if(lowest > maxPrice.get(itemName[j])["lowest"]){
                                lowest=maxPrice.get(itemName[j])["lowest"];
                            }
                        }
                        catch(e){
                            console.log(e);
                        }
                        maxPrice.set(itemName[j],{
                            itemName: str[idx].itemName,
                            price: str[idx].unitPrice,
                            averagePrice: str[idx].averagePrice,
                            count: count,
                            lowest: lowest,
                            status: "정상"
                        });
                        checked=true;
                       
                        break;
                    }
                }
                if(!checked){
                    if(lowest==Number.MAX_VALUE){
                        lowest=null;
                    }
                    maxPrice.set(itemName[j], {
                        itemName: itemName[j],
                        price: (str[str.length-1]) ? str[str.length-1].unitPrice : null,
                        averagePrice: (str[str.length-1]) ? str[str.length-1].averagePrice : null,
                        count: count,
                        lowest: lowest,
                        status: (str[str.length-1]) ? "재고 부족" : "매물 없음"
                    });
                }
            });
        }, 1000*Math.round(j/allowedPerSec));
    })(i);
}

module.exports=maxPrice;