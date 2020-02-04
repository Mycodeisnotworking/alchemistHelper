const maxPrice=require('./inquirier');
var cost=require("./recipes");//생산비 모음
const itemMap=require('./itemMap');
const itemMapK2E=require('./itemMapK2E');
const rawMaterials=require('./materials');
const raw=rawMaterials["raw"];
const purchasingPlace=["경매장", "생산"];
const middles=["magiccrystal", "fruitofcolorlessnessmagic", "fruitofwhitenessmagic", "essenceofveteranghost", "essenceofrobustghost"];
var target, middleMaterial;
var comp1, comp2;
var mats=[];
var elementList=new Array();
setTimeout(()=>{
    //calcMiddles();
    getElement();
    try{
        target=cost["magiccrystal"];
        mats[0]=maxPrice.get("하급 원소결정")["price"];
        mats[1]=maxPrice.get("생명의 숨결")["price"];
        target.cost=mats[0]*target.mat1count + mats[1]*target.mat2count;
        
        target.mat1unitPrice=mats[0];
        target.mat2unitPrice=mats[1];
        /*
            마력결정 상위 재료
         * 마력의 산물 시리즈
         * 영혼의 정수 시리즈
        */
       comp1=cost["magiccrystal"];
       comp2=maxPrice.get("마력 결정")["price"];
        if(comp1.cost >= comp2){//경매장가격이 싼 경우
            middleMaterial=cost["fruitofcolorlessnessmagic"];
            mats[0]=maxPrice.get("무색 큐브 조각")["price"];

            middleMaterial.cost=mats[0]*middleMaterial.mat1count+comp2*middleMaterial.mat2count;
            middleMaterial.mat2place=purchasingPlace[0];
            middleMaterial.mat1unitPrice=mats[0];
            middleMaterial.mat2unitPrice=comp2;

            middleMaterial=cost["fruitofwhitenessmagic"];
            mats[0]=maxPrice.get("흰색 큐브 조각")["price"];

            middleMaterial.cost=mats[0]*middleMaterial.mat1count+comp2*middleMaterial.mat2count;
            middleMaterial.mat2place=purchasingPlace[0];
            middleMaterial.mat1unitPrice=mats[0];
            middleMaterial.mat2unitPrice=comp2;

            middleMaterial=cost["essenceofveteranghost"];
            mats[0]=maxPrice.get("노련한 모험가의 영혼")["price"];

            middleMaterial.cost=mats[0]*middleMaterial.mat1count + comp2*middleMaterial.mat2count;
            middleMaterial.mat2place=purchasingPlace[0];
            middleMaterial.mat1unitPrice=mats[0];
            middleMaterial.mat2unitPrice=comp2;

            middleMaterial=cost["essenceofrobustghost"];
            mats[0]=maxPrice.get("강인한 모험가의 영혼")["price"];

            middleMaterial.cost=mats[0]*middleMaterial.mat1count + comp2*middleMaterial.mat2count;
            middleMaterial.mat2place=purchasingPlace[0];
            middleMaterial.mat1unitPrice=mats[0];
            middleMaterial.mat2unitPrice=comp2;
        }
        else{
            var targetCost=maxPrice.get("생명의 숨결")["price"]+maxPrice.get("하급 원소결정")["price"]*10;
            middleMaterial=cost["fruitofcolorlessnessmagic"];
            mats[0]=maxPrice.get("무색 큐브 조각")["price"];
            
            middleMaterial.cost=mats[0]*middleMaterial.mat1count+targetCost*middleMaterial.mat2count;
            middleMaterial.mat2place=purchasingPlace[1];
            middleMaterial.mat1unitPrice=mats[0];
            middleMaterial.mat2unitPrice=targetCost;
            
            middleMaterial=cost["fruitofwhitenessmagic"];
            mats[0]=maxPrice.get("흰색 큐브 조각")["price"];

            middleMaterial.cost=mats[0]*middleMaterial.mat1count+targetCost*middleMaterial.mat2count;
            middleMaterial.mat2place=purchasingPlace[1];
            middleMaterial.mat1unitPrice=mats[0];
            middleMaterial.mat2unitPrice=targetCost;


            middleMaterial=cost["essenceofveteranghost"];
            mats[0]= maxPrice.get("노련한 모험가의 영혼")["price"];

            middleMaterial.cost=mats[0]*middleMaterial.mat1count + targetCost*middleMaterial.mat2count;
            middleMaterial.mat2place=purchasingPlace[1];
            middleMaterial.mat1unitPrice=mats[0];
            middleMaterial.mat2unitPrice=targetCost;

            middleMaterial=cost["essenceofrobustghost"];
            mats[0]=maxPrice.get("강인한 모험가의 영혼")["price"];

            middleMaterial.cost=mats[0]*middleMaterial.mat1count + targetCost*middleMaterial.mat2count;
            middleMaterial.mat2place=purchasingPlace[1];
            middleMaterial.mat1unitPrice=mats[0];
            middleMaterial.mat2unitPrice=targetCost;
        }
        //피로 회복의 영약
        target=cost["fatiguerestorationpotion"];
        mats[0]=maxPrice.get("생명의 숨결")["price"];
        mats[1]=maxPrice.get("무색 마력의 산물")["price"];
        mats[2]=maxPrice.get("노련한 영혼의 정수")["price"];
        mats[3]=maxPrice.get("황금 큐브 조각")["price"];

        target.cost=mats[0]*target.mat1count+mats[3]*target.mat4count;
        target.mat1unitPrice=mats[0];
        target.mat4unitPrice=mats[3];
        
        middleMaterial=cost["fruitofcolorlessnessmagic"];
        if(middleMaterial.cost >= mats[1]){//무색 산물의 경매장가가 제작가보다 쌀 때
            target.mat2unitPrice=mats[1];
            target.cost+=mats[1]*target.mat2count;
            target.mat2place=purchasingPlace[0];
        }
        else{
            target.cost+=middleMaterial.cost;
            target.mat2unitPrice=middleMaterial.cost;
            target.mat2place=purchasingPlace[1];
        }

        middleMaterial=cost["essenceofveteranghost"];
        if(middleMaterial.cost>=mats[2]){
            target.mat3unitPrice=mats[2];
            target.cost+=mats[2]*target.mat3count;
            target.mat3place=purchasingPlace[0];
        }
        else{
            target.mat3unitPrice=middleMaterial.cost;
            target.cost+=middleMaterial.cost*target.mat3count;
            target.mat3place=purchasingPlace[1];
        }
        //성스러운 축복
        target=cost["holyblessing"];
        mats[0]=maxPrice.get("생명의 숨결")["price"];
        mats[1]=maxPrice.get("흰색 마력의 산물")["price"];
        target.cost+=mats[0]*target.mat1count;
        target.mat1unitPrice=mats[0];
        target.mat1place=purchasingPlace[0];

        middleMaterial=cost["fruitofwhitenessmagic"];
        if(middleMaterial.cost >= mats[1]){//무색 산물의 경매장가가 제작가보다 쌀 때
            target.cost+=mats[1]*target.mat2count;
            target.mat2unitPrice=mats[1];
            target.mat2place=purchasingPlace[0];
        }
        else{
            target.cost+=middleMaterial.cost;
            target.mat2place=purchasingPlace[1];
            target.mat2unitPrice=middleMaterial.cost;
        }

        target=cost["fatiguerestorationpotion"];
        var offset=1;
        var sellingPrice=(maxPrice.get("피로 회복의 영약")["lowest"]-offset);
        
        target=cost["holyblessing"];
        sellingPrice=maxPrice.get("성스러운 축복")["lowest"]-offset;

//        console.log(cost);
//        calcProductionCost("fatiguerestorationpotion");
 //       calcProductionCost("holyblessing");
    }
    catch(e){
        console.log(e);
    }

}, 1000);

function calcProductionCost(itemName){
    var item=cost[itemName];
    var materials=[], matCount=[], unitPrice=[], place=[];
    var matName;
    var notFoundMaterials=[];//검색 안된애들은 여기에
    var keystring;
    var productionCost=0;
    for(key in item)
    {
        keystring=key.toString();
        if(keystring.startsWith("mat"))
        {
            if(keystring.endsWith("count")){
                matCount.push(parseInt(item[key]));
            }
            else if(keystring.endsWith("unitPrice")){
                if(!item[key])//매물 없는경우
                {
                    notFoundMaterials.push(matName);
                    unitPrice.push(Number.MAX_VALUE);
                    //이건 내일 테이블 하나 새로 만들기
                }
                else
                {
                    unitPrice.push(parseInt(item[key]));
                }
            }
            else if(keystring.endsWith("place"))
            {
                place.push(item[key]);
            }
            else
            {
                matName=item[key];
                materials.push(matName);
            }
        }
    }

    for(var i=0;i<materials.length;i++){
        productionCost+=matCount[i]*unitPrice[i];
    }

    var itemNameKor=(itemName=="fatiguerestorationpotion") ? "피로 회복의 영약" : "성스러운 축복";//이후에 바꿔야됨!

    printPretty(itemNameKor, materials, matCount, unitPrice, place, productionCost);
}

function printPretty(itemName, materials, count, unitPrice, place, productionCost){
    //itemName: 한글
    var offset=1;
    var sellingPrice=maxPrice.get(itemName)["price"]-offset;
    var msg="이익:\t"+(sellingPrice*0.97 - productionCost) + "\t권장 판매가: "+sellingPrice+"\t생산비: "+productionCost;
    var msgMat="재료:\t\t";
    var msgCnt="수량:\t\t";
    var msguPrice="개당 가격:\t";
    var msgPlace="수급처:\t\t";

    for(var i=0;i<materials.length;i++){
        msgMat+=materials[i]+"\t";
    }
    for(var i=0;i<count.length;i++)
    {
        msgCnt+=count[i]+"\t\t";
        if(i>=1)
        {
            msgCnt+="\t";
        }
    }
    for(var i=0;i<unitPrice.length;i++){
        msguPrice+=unitPrice[i]+"\t\t";
        if(i>=1)
        {
            msguPrice+="\t";
        }
    }
    for(var i=0;i<place.length;i++){
        msgPlace+=place[i]+"\t\t";
        if(i>=1)
        {
            msgPlace+="\t";
        }
    }
    console.log("----------------------------------------------------------");
    console.log("아이템명 : "+itemName);
    console.log(msg);
    console.log(msgMat);
    console.log(msgCnt);
    console.log(msguPrice);
    console.log(msgPlace);
    console.log("----------------------------------------------------------");
}

function calcMiddles(){
    var middle;
    var total;
    var compare1, compare2;
    var materials=[], count=[], unitPrice=[], place=[];
    var elements=[];
    var keystring;

    operation.map((item)=>{
        elements.push(operation[item][i]);
    });
    
    middles.map((item)=>{
        middle=cost[item];
        for(key in middle){
            keystring=key.toString();
            if(keystring.startsWith(mat)){
                if(keystring.endsWith("count")){
                    count.push(middle[key]);
                }
                else if(keystring.endsWith("unitPrice"))
                {
                    unitPrice.push(middle[key]);
                }
                else if(keystring.endsWith("place"))
                {
                    place.push(middle[key]);
                }
                else{
                    materials.push(middle[key]);
                }
            }
        }
        var placeName, priceName;
        total=0;
        //하위재료명: materials
        for(var i=0;i<materials.length;i++){
            placeName="mat"+(i+1)+"place";
            priceName="mat"+(i+1)+"unitPrice";

            flag=false;
            flag=elements.map((e)=>{
                if(e==materials[i]){
                    return true;
                }
            });

            if(flag)//최하급재료 => 바로 경매장가로
            {

            }
            else{//중간재료 => 재료비 따지기
                
            }
            compare1=unitPrice[i];//생산
            compare2=maxPrice.get(itemMap.get(materials[i]))["price"];//경매장

            if(flag || compare1 >= compare2){//경매장이 더 싼 경우 / 하급재료
                middle[placeName]="경매장";
                middle[priceName]=maxPrice.get(itemMap.get(materials[i]))["price"];
                total+=compare2;
            }
            else{
                middle[placeName]="생산";
                middle[priceName]=unitPrice[i];
                total+=compare1;
            }
            middle["cost"]=total;
        }//compare1 : 생산한 재료로 조합 / compare2: 경매장에서 사서 조합

    });
}

function findLowPrice(itemName){//itemName: 한글
    if(isElement(itemName))
    {//하급재료인경우 => 경매장에서 구입
        return [maxPrice[itemName]["price"], purchasingPlace[0]];
    }
    //그외 : 경매가랑 하위재료 cost 총합 비교해서 최소값+사는곳 출력
    var materials=[], counts=[];
    var item=cost[itemName];
    var keystring;
    item.cost=0;
    for(key in item){
        keystring=key.toString();
        if(keystring.startsWith("mat"))
        {
            if(keystring.endsWith("count"))
            {
                counts.push(item[key]);
            }
            else if(keystring.endsWith("unitPrice") || keystring.endsWith("place"))
            {
            }
            else
            {
                materials.push(item[key]);
            }
        }
    }

    materials.map((item)=>{//재귀함수 호출
        var itemNameE=itemMapK2E.get(item);
        cost[itemNameE];
    });
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