const maxPrice=require('./inquirier');
var cost=require("./recipes");//생산비 모음
const itemMapK2E=require('./itemMapK2E');
const rawMaterials=require('./materials');
const raw=rawMaterials["raw"];
const purchasingPlace=["경매장", "생산"];

var elementList=new Array();
setTimeout(()=>{
    getElement();
    try{
        var productList=["피로 회복의 영약", "성스러운 축복", "고농축 힘의 비약"];
        var resultList=[];
        var sellingPrice=[];
        var profit=[];
        var sell, result;

        for(var i=0;i<productList.length;i++)
        {
            result=findLowPrice(productList[i]);
            resultList.push(result);
            sell=maxPrice.get(productList[i])["lowest"]-1;
            sellingPrice.push(sell);
            profit.push(sell*0.97-result[0]);
        }

        console.log("====================================================");
        console.log("품목\t\t\t생산비\t\t판매가\t이익");
        for(var i=0;i<productList.length;i++)
        {
            console.log(productList[i]+"\t"+resultList[i][0]+"\t"+sellingPrice[i]+"\t"+profit[i]);
        }
        console.log("====================================================");
    }
    catch(e){
        console.log(e);
    }

}, 1000);

function findLowPrice(itemName){//itemName: 한글
    if(isElement(itemName))
    {//하급재료인경우 => 경매장에서 구입
        var search=maxPrice.get(itemName);
        var result=[search["price"], purchasingPlace[0], search["status"]];
        return result;
    }
    //그외 : 경매가랑 하위재료 cost 총합 비교해서 최소값+사는곳 출력
    var materials=[];//필요한 하위재료
    var counts=[];//하위재료 필요 개수
    var unitPrice=[];//재료 1개당 최저가
    var place=[];//최저 재료 수급처
    var total=0;//총 최저가
    var auctionCost=maxPrice.get(itemName)["price"];//해당 물품의 경매장 가격(최저가는 아닐 수 있음. 물량이 확보된 선에서 최고가)
    var materialCost;
    var itemName_English=itemMapK2E.get(itemName);
    var item=cost[itemName_English];
    var keystring;
    var recur;

    for(key in item)
    {
        keystring=key.toString();
        if(keystring.startsWith("mat")){
            if(keystring.endsWith("count"))
            {
                counts.push(item[key]);
            }
            else if(keystring.endsWith("unitPrice") || keystring.endsWith("place"))
            {}
            else{
                materials.push(item[key]);
            }
        }
    }
    for(var i=0;i<materials.length;i++){
        materialCost=maxPrice.get(materials[i])["price"];
        recur=findLowPrice(materials[i]);
        if(recur[2] != "매물 없음")
        {
            if(materialCost > recur[0])
            {//경매장가 > 재료 생산 최저가
                total+=(recur[0]*counts[i]);
                place.push(purchasingPlace[1]);
                unitPrice.push(recur[0]);
            }
            else{
                total+=(materialCost*counts[i]);
                place.push(purchasingPlace[0]);
                unitPrice.push(materialCost);
            }
        }
        else//경매장에 재고없는경우 => 완제품은 무조건 경매장에서 사게 유도 
        {
            total+=10000000;
            place.push(purchasingPlace[1]);
            unitPrice.push(10000000);
        }
    }
    var placeidx=unitPriceidx=0;
    for(key in item)
    {
        keystring=key.toString();
        if(keystring.startsWith("mat")){
            if(keystring.endsWith("unitPrice"))
            {
                item[key]=unitPrice[unitPriceidx++].price;
            }
            else if( keystring.endsWith("place"))
            {
                item[key]=place[placeidx++];
            }
        }
    }
    if(auctionCost > total)
    {//경매장 완제품 비용 > 생산 최저가
        item["cost"]=total;
        return [total, purchasingPlace[1]];
    }
    else{
        item["cost"]=auctionCost;
        return [auctionCost, purchasingPlace[0]];
    }

}

function isElement(itemName){
    return elementList.some((item)=> itemName===item);
}

function getElement(){
    for(key in raw){
        raw[key].map((item)=>{
            elementList.push(item);
        });
    }
}