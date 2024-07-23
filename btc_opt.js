'use strict';

//npx playwright codegen 'https://www.bybit.com/trade/option/usdc/BTC'
// 左に//を付けるとコメント行になります。プログラムから無視されます。
//google console
//npx playwright install 
//エラーが出るので、指示に従う

//LINE Messaging APIを使って、LINE Botから定型文を送信する
//https://blog.kimizuka.org/entry/2023/11/08/232842


require('dotenv').config();
let cnt = -1;
let lineCnt = {cnt:0};
let lineAlert = [];//5750;
lineAlert[0] = [7400,1400];
lineAlert[1] = [7200,1200];
lineAlert[2] = [7000,1000];
console.error(['lineAlertC0',lineAlert[0][0] , 'lineAlertP0',lineAlert[0][1]]);
console.error(['lineAlertC1',lineAlert[1][0] , 'lineAlertP1',lineAlert[1][1]]);
console.error(['lineAlertC2',lineAlert[2][0] , 'lineAlertP2',lineAlert[2][1]]);

let arrKenri = [];
arrKenri[0] = [71,61];//C,P
arrKenri[1] = [72,60];//C,P
console.error(['権利行使価格 0 C : ' + arrKenri[0][0]],['権利行使価格 0 P : ' + arrKenri[0][1]]);
console.error(['権利行使価格 1 C : ' + arrKenri[1][0]],['権利行使価格 1 P : ' + arrKenri[1][1]]);

var express = require("express");
var app = express();
var server = app.listen(8080, function(){
    console.error(["Node.js is listening to localhost:" + server.address().port + '../Dropbox/Attachments']);
});
app.use('../Dropbox/Attachments', express.static(__dirname + '../Dropbox/Attachments'));

const fs = require( 'fs' );


//const { chromium } = require('playwright');//Chromiumというブラウザを使う
const { firefox } = require('playwright');

(async () => {
  //ヘッダー

//ここに無限ループ
for(let loop = 0 ; loop < 2 ; loop++){
  loop = 0;
  //バグ
  //https://github.com/microsoft/playwright/issues/27600
  let ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.81"
  //page = browser.new_page(user_agent=ua)
  //const browser = await chromium.launch({
  const browser = await firefox.launch({
    headless: true  //false 画面あり　true 画面なし
    //headless: false //false 画面あり　true 画面なし
  });
  const context = await browser.newContext();//contextを使う宣言をする
  const page = await context.newPage();            //pageを使う宣言をする
  let timeout  = 30000;                    //timeoutを30000ミリ秒に設定する
  page.setDefaultTimeout(timeout);   //デフォルトタイムアウトを30000ミリ秒に設定する。
  await page.setViewportSize({
    width:  1300,
    height: 1800,
  });//ブラウザの大きさを設定する。

  let timeout1 = 3000;

  let res_text = "";



  console.error(["page.goto() Start"]);
  await page.goto('https://www.bybit.com/trade/option/usdc/BTC');
  await page.waitForTimeout(6000);
  cnt++;
  console.error(["page.goto('https://www.bybit.com/trade/option/usdc/BTC');"]);
  console.error(["page.goto() End"]);



  timeout  = 20000;                    //timeoutを30000ミリ秒に設定する
  page.setDefaultTimeout(timeout);  

  let arrDDMMYY = [];
/*
  arrDDMMYY[0] = '26-07-24';
  arrDDMMYY[1] = '02-08-24';
*/
  arrDDMMYY[0] = '26-07-24';
  arrDDMMYY[1] = '02-08-24';

  let arrRes = [];
  for(let l = 0 ; l < 5 ; l++){
    console.error(["loop","l=0-4","l=" + l,"cnt=" + cnt ]);
    for(let j = 0 ; j < arrDDMMYY.length ; j++){  

      //日付をクリック
      await page.waitForTimeout(500);
      //await page.getByText(arrDDMMYY[j]).click();
      await page.locator('._delivery-time_nlm51_18', { hasText: arrDDMMYY[j] }).click();
      await page.waitForTimeout(2000);

      //日付
      let ddmmyy = arrDDMMYY[j]; 
      //console.error("ddmmyy " + ddmmyy);

      //原資産
      let genshi = "0.00";
      genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];

      if(genshi == "0.00"){
        console.error("genshi err");
        await page.waitForTimeout(500);
        genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
      }
      if(genshi == "0.00"){
        break;
      }

      console.error("");
      console.error(["dd-mm-yy:" + ddmmyy , " genshisan:" + genshi]);
      console.error("");



      let dd = ddmmyy.split('-')[0]; 
      let mm = ddmmyy.split('-')[1]; 
      let yy = ddmmyy.split('-')[2];
      if(      mm == '01'){
        mm = 'JAN';
      }else if(mm == '02'){
        mm = 'FEB';
      }else if(mm == '03'){
        mm = 'MAR';
      }else if(mm == '04'){
        mm = 'APR';
      }else if(mm == '05'){
        mm = 'MAY';
      }else if(mm == '06'){
        mm = 'JUN';
      }else if(mm == '07'){
        mm = 'JUL';
      }else if(mm == '08'){
        mm = 'AUG';
      }else if(mm == '09'){
        mm = 'SEP';
      }else if(mm == '10'){
        mm = 'OCT';
      }else if(mm == '11'){
        mm = 'NOV';
      }else if(mm == '12'){
        mm = 'DEC';
      }else{
        mm = 'err'
      }
      dd = parseInt(dd);

        
      await callput(page,dd,mm,yy,j,arrDDMMYY,l,cnt,lineCnt,lineAlert,arrKenri);
      
    


      
    }//for(let j = 0 ; j < arrDDMMYY.length ; j++){
  }//for(let l = 0 ; l < 10 ; l++){

  await page.close();
  await context.close();
  await browser.close();

}//for(let loop = 0 ; loop < 2 ; loop++){

})();

async function callput(page,dd,mm,yy,j,arrDDMMYY,l,cnt,lineCnt,lineAlert,arrKenri){

  let PATH = '';
  let meigara = '';

  let kenri_c = 0;//call
  let kenri_p = 0;//put

  if(j == 0){
    kenri_c = arrKenri[0][0] ;//call
    kenri_p = arrKenri[0][1] ;//put
  }else{
    kenri_c = arrKenri[1][0] ;//call
    kenri_p = arrKenri[1][1] ;//put
  }

  //権利行使価格
  let arrKenri_c = [];
  arrKenri_c[0] = kenri_c           ;//call
  arrKenri_c[1] = arrKenri_c[0] + 1 ;
  arrKenri_c[2] = arrKenri_c[0] + 2 ;

  let arrKenri_p = [];
  arrKenri_p[0] = kenri_p           ;//put
  arrKenri_p[1] = arrKenri_p[0] - 1 ;
  arrKenri_p[2] = arrKenri_p[0] - 2 ;


  for(let i = 0 ; i <= 2 ; i++){
    await page.waitForTimeout(500);

    let BTC_C      = dd + mm        + yy + '-' + arrKenri_c[i] ;
    let BTC_C_line = 'BTC-Options\n' + arrDDMMYY[j] + '\n-' + arrKenri_c[i] + '000[C]';

    meigara = arrDDMMYY[j].split('-')[2]  
            + arrDDMMYY[j].split('-')[1]
            + arrDDMMYY[j].split('-')[0]
            + '-' + arrKenri_c[i];

    if(i == 0){
      meigara = 'C' + meigara + 'a' + j ;
    }else{
      meigara = 'C' + meigara;
    }

    PATH = '../Dropbox/Attachments/' 
         + meigara
         + '.html';

    //コール側をクリックできるか確認
    let test1 = await page.$('#BTC-' + BTC_C + '000');

    if(test1 != null){
      try{
        if(i == 0){
          console.error("");        
          console.error(["Start async function call"]);
          console.error("");        
        }
      
        await page.waitForTimeout(500);
        await page.locator('#BTC-' + BTC_C + '000' + ' canvas').click({ position: {x: 200,y: 15} });
        await page.waitForTimeout(2000);
        //await page.locator('#BTC-' + BTC_C + '000' + '-C_checked div').first().click();
        //await page.waitForTimeout(1000);
  
        console.error(['lineAlertC'+i,lineAlert[i][0]],["c-" + BTC_C ],["i:0-2 i:" + i],["j:"+ j ],["l:"+ l ],["cnt:"+ cnt]);

        
        //権利行使価格
        let kenri = await page.locator('//*[@id="orderContainer"]/div[2]/div[1]/div/div[2]').innerText(); 
        

        //ymd
        let ymd = new Date().toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo', 
          year: 'numeric', month: '2-digit' ,day: '2-digit',
          hour: '2-digit', minute: '2-digit',second: '2-digit'});
        

        //原資産
        let genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
        genshi  = parseInt(genshi.replace(/,/g, '')) ;

        
        //ボラティリティ
        let vola = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[1]').innerText(); 
        vola = vola.split('\n')[3].split('%')[0]; 

        //価格
        let kakaku = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[2]/div[1]/div/div[1]').innerText(); 
        let sell = parseInt((kakaku.split('\n')[17]).replace(/,/g, '')) ;//売：注文価格
        //resC += (kakaku.split('\n')[18]).replace(/,/g, '') + ',';//売：数量
        //resC += (kakaku.split('\n')[19]).replace(/,/g, '') + ',';//売：合計BTC
        let mark = parseInt((kakaku.split('\n')[16]).replace(/,/g, '')) ;//マーク価格
        let buy  = parseInt((kakaku.split('\n')[11]).replace(/,/g, '')) ;//買：注文価格 
        //resC += (kakaku.split('\n')[12]).replace(/,/g, '') + ',';//買：数量
        //resC += (kakaku.split('\n')[13]).replace(/,/g, '') + ',';//買：合計BTC



        //残り時間
        let nokori  = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[11];
            nokori += (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[12];
        let nokori1 = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[13];
        if(nokori1.indexOf('min') > 0){
          nokori += nokori1;
        }      
        nokori = nokori.split('min')[0];     

        let resC = "";
        resC =  genshi +',<font color="red">[,'+ sell +',]</font>,'+ mark +','+ buy +','+ vola +',' + meigara  +  ',<br>,'
             + ymd + ',' + nokori + ',<br>\n'; 
        
        fs.appendFileSync( PATH , resC );
        fs.appendFileSync( '../Dropbox/Attachments/' + 'zdownload.html', resC );

        console.warn([PATH]);
        console.error([resC]);

        await page.waitForTimeout(500);
    
        if(i == 0 && sell > lineAlert[i][0] && lineCnt.cnt < 10){
          let linemsg = '[SELL Alert]>' + lineAlert[i][0] + '\n\n'
                      + BTC_C_line 
                      + '\n[Sell]:' + sell 
                      + '\n[原資産]:' + genshi 
                      + '\n' + ymd
                      + '\nCount:' + lineCnt.cnt;
          await sendline(linemsg);
          console.error(linemsg);
          lineCnt.cnt++;
        }
      


      } catch(e) {
          console.error( 'err : ' + e.message );
      }
    }
  }//for(let i = 0 ; i <= 2 ; i++){

  

  for(let i = 0 ; i <= 2 ; i++){
    await page.waitForTimeout(500);

    let BTC_P      = dd + mm        + yy + '-' + arrKenri_p[i] ;
    let BTC_P_line = 'BTC-Options\n' + arrDDMMYY[j] + '\n-' + arrKenri_p[i] + '000[P]';
    
    meigara = arrDDMMYY[j].split('-')[2]  
            + arrDDMMYY[j].split('-')[1]
            + arrDDMMYY[j].split('-')[0]
            + '-' + arrKenri_p[i];

    if(i == 0){
      meigara = 'P' + meigara + 'a' + j;
    }else{
      meigara = 'P' + meigara;
    }

    PATH = '../Dropbox/Attachments/' 
         + meigara
         + '.html';

    //コール側をクリックできるか確認
    let test1 = await page.$('#BTC-' + BTC_P + '000');

    if(test1 != null){
      try{
        if(i == 0){
          console.error("");        
          console.error(["Start async function put"]);
          console.error("");        
        }
      
        await page.waitForTimeout(500);
        await page.locator('#BTC-' + BTC_P + '000' + ' canvas').click({ position: {x: 600,y: 15} });
        await page.waitForTimeout(2000);
        //await page.locator('#BTC-' + BTC_P + '000' + '-P_checked div').first().click();
        //await page.waitForTimeout(1000);
  
        console.error(['lineAlertP'+i,lineAlert[i][1]],["p-" + BTC_P],["i:0-2 i:" + i ],["j:"+ j ],["l:"+ l ],["cnt:"+ cnt ]);

        
        //権利行使価格
        let kenri = await page.locator('//*[@id="orderContainer"]/div[2]/div[1]/div/div[2]').innerText(); 
        

        //ymd
        let ymd = new Date().toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo', 
          year: 'numeric', month: '2-digit' ,day: '2-digit',
          hour: '2-digit', minute: '2-digit',second: '2-digit'});
        

        //原資産
        let genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
        genshi  = parseInt(genshi.replace(/,/g, '')) ;

        
        //ボラティリティ
        let vola = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[1]').innerText(); 
        vola = vola.split('\n')[3].split('%')[0]; 

        //価格
        let kakaku = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[2]/div[1]/div/div[1]').innerText(); 
        let sell = parseInt((kakaku.split('\n')[17]).replace(/,/g, '')) ;//売：注文価格
        //resC += (kakaku.split('\n')[18]).replace(/,/g, '') + ',';//売：数量
        //resC += (kakaku.split('\n')[19]).replace(/,/g, '') + ',';//売：合計BTC
        let mark = parseInt((kakaku.split('\n')[16]).replace(/,/g, '')) ;//マーク価格
        let buy  = parseInt((kakaku.split('\n')[11]).replace(/,/g, '')) ;//買：注文価格 
        //resC += (kakaku.split('\n')[12]).replace(/,/g, '') + ',';//買：数量
        //resC += (kakaku.split('\n')[13]).replace(/,/g, '') + ',';//買：合計BTC



        //残り時間
        let nokori  = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[11];
            nokori += (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[12];
        let nokori1 = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[13];
        if(nokori1.indexOf('min') > 0){
          nokori += nokori1;
        }      
        nokori = nokori.split('min')[0] ;     

        let resC = "";
        resC = genshi +',<font color="red">[,'+ sell +',]</font>,'+ mark +','+ buy +','+ vola + ',' + meigara + ',<br>,'
             + ymd + ',' + nokori + ',<br>\n'; 
        
        fs.appendFileSync( PATH, resC );
        fs.appendFileSync( '../Dropbox/Attachments/' + 'zdownload.html', resC );
        
        console.warn([PATH]);
        console.error([resC]);

        await page.waitForTimeout(500);

        if(i == 0 && sell > lineAlert[i][1] && lineCnt.cnt < 10){
          let linemsg = '[SELL Alert]>' + lineAlert[i][1] + '\n\n'
                      + BTC_P_line
                      + '\n[Sell]:' + sell 
                      + '\n[原資産]:' + genshi 
                      + '\n' + ymd
                      + '\nCount:' + lineCnt.cnt;
          await sendline(linemsg);
          console.error(linemsg);
          lineCnt.cnt++;
        }
    
    
      


      } catch(e) {
          console.error( 'err : ' + e.message );
      }
    }


  }//for(let i = 0 ; i <= 2 ; i++){


}//async function callput(page,dd,mm,yy){

async function sendline(linemsg) {
  //LINE Messaging APIを使って、LINE Botから定型文を送信する
  //https://blog.kimizuka.org/entry/2023/11/08/232842

  const line = require('@line/bot-sdk');
  const { CHANNEL_SECRET, CHANNEL_TOKEN } = process.env;
  const config = {
      channelSecret: CHANNEL_SECRET,
      channelAccessToken: CHANNEL_TOKEN
  };
  const client = new line.Client(config);
  const messages = [{
    type: 'text',
    text: '[Bybit]\n[USDCオプション]\n'+ linemsg
  }];

  try {
    await client.broadcast(messages);
  } catch (error) {
    console.log(`${ error.statusMessage }`);
    console.log(error.originalError.response.data);
  }
}