﻿'use strict';
//npx playwright codegen 'https://www.bybit.com/trade/option/usdc/BTC'
// 左に//を付けるとコメント行になります。プログラムから無視されます。
//google console
//npx playwright install 
//エラーが出るので、指示に従う

//LINE Messaging APIを使って、LINE Botから定型文を送信する
//https://blog.kimizuka.org/entry/2023/11/08/232842

//環境変数の代わりに .env ファイルを使用する (dotenv)
//https://maku77.github.io/nodejs/env/dotenv.html


const fs = require( 'fs' );
require('dotenv').config();
//let urlpath = '../Dropbox/Attachments/'
let urlpath = 'public/';//'../Dropbox/Attachments/'
let express = require("express");
let app = express();

let server = app.listen(8080, function(){
  console.error(["Node.js is listening to localhost:" + server.address().port + '/' + urlpath]);
});
//app.use('~/aaa/bbb', express.static(__dirname + '~/aaa/bbb'));
//app.use('/public', express.static(__dirname + '/public'));
app.use('/'+urlpath, express.static(__dirname + '/'+urlpath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let arrDDMMYY = [];
arrDDMMYY[0] = '26-07-24';
arrDDMMYY[1] = '02-08-24';

let cnt = -1;

let lineCnt = [];
lineCnt[0] = [[0,0,0,0,0],[0,0,0,0,0]];//C          
lineCnt[1] = [[0,0,0,0,0],[0,0,0,0,0]];//P      

let lineAlert = [];//5750;
lineAlert[0] = [[0,0,0,0,0],[0,0,0,0,0]];//C 
lineAlert[1] = [[0,0,0,0,0],[0,0,0,0,0]];//P 

let arrKenri = [];
arrKenri[0] = [[0,0,0,0,0],[0,0,0,0,0]];//C
arrKenri[1] = [[0,0,0,0,0],[0,0,0,0,0]];//P

let arrResult =[];
arrResult = readfile0();
lineAlert = arrResult[0];
arrKenri  = arrResult[1];
arrDDMMYY = arrResult[2];

//app

app.get('/' + urlpath+ 'download', (req, res) => {
  res.download('./' + urlpath + 'zdownload.html');
})

app.get('/del', (req, res) => {
  console.error('Start app.get(/del)');
  let deletefiels = "";
  let files2 = fs.readdirSync(urlpath);
  let filter2 = files2.filter(RegExp.prototype.test, /.*\.html$/); // ファイル名一覧から、拡張子で抽出
  //res.send(filter2);
  
  for(let i =0 ; i < filter2.length ; i++){
      //res.send(filter2[i]);
      fs.unlinkSync(urlpath + filter2[i]);
      console.error(filter2[i]);
      deletefiels += '<br>' + filter2[i] + ' is Deleted.\n';
  }
  console.error(deletefiels);
  //res.redirect(301, '../')
  res.send('<a href=\"/' + urlpath + '\"> Home </a>' + deletefiels);
  console.error('END app.get(/del)');

})

app.get('/'+urlpath, (req, res) => {
  console.error("")
  console.error("Start app.get()")

  arrResult = readfile0();
  lineAlert = arrResult[0];
  arrKenri  = arrResult[1];
  arrDDMMYY = arrResult[2];

  let htmltag = maketag(lineAlert,arrKenri,arrDDMMYY,urlpath);
  
  res.send(
    //pathtext 
    htmltag
  );
  console.error("END app.get()")
})

app.post('/', function (req, res) {
  console.error('')
  console.error('Start app.post("\/")')
  Object.keys(req.body).forEach((key,i) => {
    console.error(['i:'+i,'key:'+key ,'value:'+req.body[key]]);
  });

  writefile0(lineAlert,arrKenri,arrDDMMYY,req);

  console.error('END app.post("\/")')
  res.redirect(301, urlpath)
})

//app

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


  let arrRes = [];
  for(let l = 0 ; l < 5 ; l++){
    arrResult = readfile0();
    lineAlert = arrResult[0];
    arrKenri  = arrResult[1];
    arrDDMMYY = arrResult[2];
  
    console.error(["loop l[0-4] ",l,"cnt:",cnt]);

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

      let dd = ddmmyy.split('-')[0]; 
      let mm = ddmmyy.split('-')[1]; 
      let yy = ddmmyy.split('-')[2];
      let arrMM = [];
      arrMM = ['','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
      mm = arrMM[parseInt(mm)];
      dd = parseInt(dd);

      console.error("");
      console.error(["dd-mm-yy:", ddmmyy , dd+mm+yy],[" genshisan:" + genshi]);
      console.error("");

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

  //権利行使価  
  let arrKenri_c = [];
  let arrKenri_p = [];
  if(j == 0){
    for(let i = 0 ; i<=4 ; i++){
      arrKenri_c[i] = arrKenri[0][0][i] ;//call
      arrKenri_p[i] = arrKenri[1][0][i] ;//put
    }

  }else{
    for(let i = 0 ; i<=4 ; i++){
      arrKenri_c[i] = arrKenri[0][1][i] ;//call
      arrKenri_p[i] = arrKenri[1][1][i] ;//put
    }

  }
  //権利行使価格

  //Call
  for(let i = 0 ; i <= 4 ; i++){
    await page.waitForTimeout(500);

    let BTC_C      = dd + mm        + yy + '-' + arrKenri_c[i] ;
    let BTC_C_line = 'BTC-Options\n' + arrDDMMYY[j] + '\n-' + arrKenri_c[i] + '000[C]';


    meigara = 'C'
            + arrDDMMYY[j].split('-')[2]  
            + arrDDMMYY[j].split('-')[1]
            + arrDDMMYY[j].split('-')[0]
            + '-' + arrKenri_c[i];


  /*          
    if(i == 0){
      meigara = 'C' + meigara + 'a' + j;
    }else{
      meigara = 'C' + meigara;
    }
  */
    PATH = urlpath//'../Dropbox/Attachments/' 
         + meigara
         + '.html';
    
    //コール側をクリックできるか確認
    let test1 = await page.$('#BTC-' + BTC_C + '000');

    if(test1 != null){
      try{

        console.error("");        
        console.error([meigara],["Start async function CALL["+i+']'],['#BTC-' + BTC_C + '000']);
      
        await page.waitForTimeout(500);
        await page.locator('#BTC-' + BTC_C + '000' + ' canvas').click({ position: {x: 200,y: 15} });
        await page.waitForTimeout(2000);
        //await page.locator('#BTC-' + BTC_C + '000' + '-C_checked div').first().click();
        //await page.waitForTimeout(1000);
  

        
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
        vola = vola.split('\n')[3].split('%')[0].split('.')[0]; 

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
        resC = ymd + ',' + nokori + ',<br>,' 
             + genshi +',<font color="red">[,'+ sell +',]</font>,'+ mark +','+ buy +','+ vola +',' 
             + meigara  +  ',<br>\n'; 
        
        fs.appendFileSync( PATH , resC );
        let sorted = sortFunc(PATH);
        fs.writeFileSync(PATH, sorted,{flag: "w"}); 

        fs.appendFileSync( urlpath + 'zdownload.html', resC );

        await page.waitForTimeout(500);


        let lineCount = 0;
        lineCount = lineCnt[0][j][i]

    
        if(sell > lineAlert[0][j][i] && lineCount < 5){
          let linemsg = '[SELL Alert]>' + lineAlert[0][j][i] + '\n\n'
                      + BTC_C_line 
                      + '\n[Sell]:' + sell 
                      + '\n[原資産]:' + genshi 
                      + '\n' + ymd
                      + '\nCount:' + (lineCount+1);
          await sendline(linemsg);
          let msg = linemsg.split('\n')
          console.error(msg[0])
          console.error(msg[2],msg[3],msg[4])
          console.error(msg[5],msg[6])
          console.error(msg[7],msg[8])
          
          lineCount++;
          lineCnt[0][j][i] = lineCount;
        }

        console.error([meigara],['Alert'],lineAlert[0][j][i]
          ,['CountC'+i,lineCount]
          ,["j[0-1] j",j],["i[0-2] i",i],["l[0-4] l",l],["cnt:",cnt]);

        let resC1 = resC.split(',')
        console.error([resC1[10]],[resC1[3]],resC1[5],[resC1[7]],[resC1[8]],[resC1[9]],[resC1[0]],[resC1[1]]);

      } catch(e) {
          console.error( 'err : ' + e.message );
      }
    }
  }//for(let i = 0 ; i <= 2 ; i++){

  
  //put
  for(let i = 0 ; i <= 4 ; i++){
    await page.waitForTimeout(500);

    let BTC_P      = dd + mm        + yy + '-' + arrKenri_p[i] ;
    let BTC_P_line = 'BTC-Options\n' + arrDDMMYY[j] + '\n-' + arrKenri_p[i] + '000[P]';
    
    meigara = 'P'
        + arrDDMMYY[j].split('-')[2]  
        + arrDDMMYY[j].split('-')[1]
        + arrDDMMYY[j].split('-')[0]
        + '-' + arrKenri_p[i];

    PATH = urlpath//'../Dropbox/Attachments/' 
        + meigara
        + '.html';
     

    //put側をクリックできるか確認
    let test1 = await page.$('#BTC-' + BTC_P + '000');

    if(test1 != null){
      try{

        console.error("");        
        console.error([meigara],["Start async function PUT["+i+']'],['#BTC-' + BTC_P + '000']);
      
        await page.waitForTimeout(500);
        await page.locator('#BTC-' + BTC_P + '000' + ' canvas').click({ position: {x: 600,y: 15} });
        await page.waitForTimeout(2000);
        //await page.locator('#BTC-' + BTC_P + '000' + '-P_checked div').first().click();
  

        
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
        vola = vola.split('\n')[3].split('%')[0].split('.')[0]; 

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
        resC = ymd + ',' + nokori + ',<br>,' 
             + genshi +',<font color="red">[,'+ sell +',]</font>,'+ mark +','+ buy +','+ vola +',' 
             + meigara  +  ',<br>\n'; 

        fs.appendFileSync( PATH, resC );
        let sorted = sortFunc(PATH);
        fs.writeFileSync(PATH, sorted,{flag: "w"}); 

        fs.appendFileSync( urlpath + 'zdownload.html', resC );
        if(i == 2){
          let sorted1 = sortFunc(urlpath + 'zdownload.html');
          //console.log(sorted1)
          fs.writeFileSync(urlpath + 'zdownload.html', sorted1,{flag: "w"});   
        }


        await page.waitForTimeout(500);

        let lineCount = 0;
        lineCount = lineCnt[1][j][i]

        if(sell > lineAlert[1][j][i] && lineCount < 5){
          let linemsg = '[SELL Alert]>' + lineAlert[1][j][i] + '\n\n'
                      + BTC_P_line
                      + '\n[Sell]:' + sell 
                      + '\n[原資産]:' + genshi 
                      + '\n' + ymd
                      + '\nCount:' + (lineCount+1);
          await sendline(linemsg);
          let msg = linemsg.split('\n')
          console.error(msg[0])
          console.error(msg[2],msg[3],msg[4])
          console.error(msg[5],msg[6])
          console.error(msg[7],msg[8])
          
          lineCount++;
          lineCnt[1][j][i] = lineCount;
          
        }

        console.error([meigara],['Alert'],lineAlert[1][j][i]
          ,['CountP'+i,lineCount]
          ,["j[0-1] j",j],["i[0-2] i",i],["l[0-4] l",l],["cnt:",cnt]);

        let resC1 = resC.split(',')
        console.error([resC1[10]],[resC1[3]],resC1[5],[resC1[7]],[resC1[8]],[resC1[9]],[resC1[0]],[resC1[1]]);
  
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
    console.error('error : async function sendline(linemsg) => ' + `${ error.statusMessage }`);
    console.error(error.originalError.response.data);
  }
}

function readfile0() {
  console.error("")
  console.error("Start readfile0()")
  let lineAlert = [];
  let arrKenri  = [];
  let arrDDMMYY = [];
  lineAlert[0] = [[0,0,0,0,0],[0,0,0,0,0]];//C ;
  lineAlert[1] = [[0,0,0,0,0],[0,0,0,0,0]];//P ;
  arrKenri[0]  = [[0,0,0,0,0],[0,0,0,0,0]];//C ;
  arrKenri[1]  = [[0,0,0,0,0],[0,0,0,0,0]];//P ;
  try{
    let ac0 = fs.readFileSync(urlpath+"paramAlertC0.csv", 'utf-8');
    let ac1 = fs.readFileSync(urlpath+"paramAlertC1.csv", 'utf-8');
    let ap0 = fs.readFileSync(urlpath+"paramAlertP0.csv", 'utf-8');
    let ap1 = fs.readFileSync(urlpath+"paramAlertP1.csv", 'utf-8');
    let kc0 = fs.readFileSync(urlpath+"paramKenriC0.csv", 'utf-8');
    let kc1 = fs.readFileSync(urlpath+"paramKenriC1.csv", 'utf-8');
    let kp0 = fs.readFileSync(urlpath+"paramKenriP0.csv", 'utf-8');
    let kp1 = fs.readFileSync(urlpath+"paramKenriP1.csv", 'utf-8');
    let dmy = fs.readFileSync(urlpath+"paramDDMMYY.csv" , 'utf-8');
  
  
    let ac00  = ac0.split('\r')[0].split(',');
    let ac01  = ac1.split('\r')[0].split(',');
    let ap00  = ap0.split('\r')[0].split(',');
    let ap01  = ap1.split('\r')[0].split(',');

    lineAlert[0][0] = ac00.slice(0,-1);//[ac00[0],ac00[1],ac00[2],ac00[3],ac00[4]];
    lineAlert[0][1] = ac01.slice(0,-1);//[ac01[0],ac01[1],ac01[2],ac01[3],ac01[4]];
    lineAlert[1][0] = ap00.slice(0,-1);//[ap00[0],ap00[1],ap00[2],ap00[3],ap00[4]];
    lineAlert[1][1] = ap01.slice(0,-1);//[ap01[0],ap01[1],ap01[2],ap01[3],ap01[4]];
  
    let kc00 = kc0.split('\r')[0].split(',');
    let kc01 = kc1.split('\r')[0].split(',');
    let kp00 = kp0.split('\r')[0].split(',');
    let kp01 = kp1.split('\r')[0].split(',');
    arrKenri[0][0] = kc00.slice(0,-1);//[kc00[0],kc00[1],kc00[2],kc00[3],kc00[4]];
    arrKenri[0][1] = kc01.slice(0,-1);//[kc01[0],kc01[1],kc01[2],kc01[3],kc01[4]];
    arrKenri[1][0] = kp00.slice(0,-1);//[kp00[0],kp00[1],kp00[2],kp00[3],kp00[4]];
    arrKenri[1][1] = kp01.slice(0,-1);//[kp01[0],kp01[1],kp01[2],kp01[3],kp01[4]];
  
  
    let dmy1  = dmy.split('\r')[0].split(',');
    arrDDMMYY[0]    = dmy1[0];
    arrDDMMYY[1]    = dmy1[1];



    console.error(['read paramAlertC0.csv',ac0],'  =>',['AlertC0',lineAlert[0][0]]);
    console.error(['read paramAlertC1.csv',ac1],'  =>',['AlertC1',lineAlert[0][1]]);
    console.error(['read paramAlertP0.csv',ap0],'  =>',['AlertP0',lineAlert[1][0]]);
    console.error(['read paramAlertC1.csv',ap1],'  =>',['AlertP1',lineAlert[1][1]]);
    console.error(['read paramKenriC0.csv',kc0],'        =>',['KenriC0',arrKenri[0][0]]);
    console.error(['read paramKenriC1.csv',kc1],'        =>',['KenriC1',arrKenri[0][1]]);
    console.error(['read paramKenriP0.csv',kp0],'        =>',['KenriP0',arrKenri[1][0]]);
    console.error(['read paramKenriP1.csv',kp1],'        =>',['KenriP1',arrKenri[1][1]]);
    console.error(['read paramDDMMYY.csv ',dmy],'=>',['DDMMYY ',arrDDMMYY]);

  
  }catch(e){
    console.error(e)
  }
  
  console.error("End readfile0()")
  return [lineAlert,arrKenri,arrDDMMYY];
}

function writefile0(lineAlert,arrKenri,arrDDMMYY,req) {
  console.error(" Start writefile0(lineAlert,arrKenri,arrDDMMYY,req) ")

  arrDDMMYY[0] = Object.values(req.body)[0][0];
  arrDDMMYY[1] = Object.values(req.body)[0][1];

  for(let i = 0 ; i <= 4 ; i++){
     arrKenri[0][0][i] = Object.values(req.body)[1][i]
    lineAlert[0][0][i] = Object.values(req.body)[2][i]
     arrKenri[1][0][i] = Object.values(req.body)[3][i] 
    lineAlert[1][0][i] = Object.values(req.body)[4][i]
     arrKenri[0][1][i] = Object.values(req.body)[5][i]
    lineAlert[0][1][i] = Object.values(req.body)[6][i]
     arrKenri[1][1][i] = Object.values(req.body)[7][i]
    lineAlert[1][1][i] = Object.values(req.body)[8][i]
  }


  let lac0 = '';
  let lac1 = '';
  let kec0 = '';
  let kec1 = '';
  for(let j = 0 ; j <= 1 ; j++){
    for(let i = 0 ; i <= 4 ; i++){
      if(j == 0){
        lac0 += lineAlert[0][j][i] + ','
        kec0 += arrKenri[0][j][i]  + ','  
      }else{
        lac1 += lineAlert[0][j][i] + ','
        kec1 += arrKenri[0][j][i]  + ','  
      }
    }
    
  }

  let lap0 = '';
  let lap1 = '';
  let kep0 = '';
  let kep1 = '';
  for(let j = 0 ; j <= 1 ; j++){
    for(let i = 0 ; i <= 4 ; i++){
      if(j == 0){
        lap0 += lineAlert[1][j][i] + ','
        kep0 += arrKenri[1][j][i]  + ','  
      }else{
        lap1 += lineAlert[1][j][i] + ','
        kep1 += arrKenri[1][j][i]  + ','  

      }
    }
    
  }

  fs.writeFileSync(urlpath+"paramDDMMYY.csv" , arrDDMMYY[0]+','+arrDDMMYY[1]);
  fs.writeFileSync(urlpath+"paramAlertC0.csv", lac0);
  fs.writeFileSync(urlpath+"paramAlertC1.csv", lac1);
  fs.writeFileSync(urlpath+"paramAlertP0.csv", lap0);
  fs.writeFileSync(urlpath+"paramAlertP1.csv", lap1);
  fs.writeFileSync(urlpath+"paramKenriC0.csv", kec0);
  fs.writeFileSync(urlpath+"paramKenriC1.csv", kec1);
  fs.writeFileSync(urlpath+"paramKenriP0.csv", kep0);
  fs.writeFileSync(urlpath+"paramKenriP1.csv", kep1);


  console.error(["write paramDDMMYY.csv ", arrDDMMYY[0]+','+arrDDMMYY[1]])
  console.error(["write paramKenriC0.csv", kec0])
  console.error(["write paramAlertC0.csv", lac0])
  console.error(["write paramKenriP0.csv", kep0])
  console.error(["write paramAlertP0.csv", lap0])
  console.error(["write paramKenriC1.csv", kec1])
  console.error(["write paramAlertC1.csv", lac1])
  console.error(["write paramKenriP1.csv", kep1])
  console.error(["write paramAlertP1.csv", lap1])

  console.error(" END writefile0(lineAlert,arrKenri,arrDDMMYY,req) ")

}

function maketag(lineAlert,arrKenri,arrDDMMYY,urlpath){
  console.error(" Start maketag(lineAlert,arrKenri,arrDDMMYY) ")

  const files  = fs.readdirSync(urlpath);
  let filter = files.filter(RegExp.prototype.test, /.*\.html$/); // ファイル名一覧から、拡張子で抽出

  filter = filter.slice(0,-1)//zdownload無視する
  /*
  console.log(filter.slice(0,5).toString())
  console.log(filter.slice(10,15).toString())
  console.log(filter.slice(5,10).toString())
  console.log(filter.slice(15,20).toString())
  */
  
  let sq0C = ''
  let sq0P = ''
  let sq1C = ''
  let sq1P = ''
  for(let i = 0 ; i <= 4 ; i++){
    sq0C += '<td><a href="' + filter[i]    + '">' + filter[i] + '</a></td>\n'
    sq1C += '<td><a href="' + filter[i+5]  + '">' + filter[i+5] + '</a></td>\n'
    sq0P += '<td><a href="' + filter[i+10] + '">' + filter[i+10] + '</a></td>\n'
    sq1P += '<td><a href="' + filter[i+15] + '">' + filter[i+15] + '</a></td>\n'
  }

  let pathtext ='<table> <tbody>';
  pathtext += '<tr><td>'+ arrDDMMYY[0] + '</td></tr>\n'
  pathtext += '<tr>\n' + sq0C + '</tr>\n'
  pathtext += '<tr>\n' + sq0P + '</tr>\n'
  pathtext += '<tr></tr><tr><td>'+arrDDMMYY[1]+'</td></tr><tr></tr>\n'
  pathtext += '<tr>\n' + sq1C + '</tr>\n'
  pathtext += '<tr>\n' + sq1P + '</tr>\n'
  pathtext += '</tbody></table>\n';

  //console.log(pathtext)

  let sq0Ck =''
  let sq0Ca =''
  let sq0Pk =''
  let sq0Pa =''
  let sq1Ck =''
  let sq1Ca =''
  let sq1Pk =''
  let sq1Pa =''
  
  for(let i = 0 ; i <= 4 ; i++){
    sq0Ck += '<input type="text" size="1" name="kenriC0" value="'+ arrKenri[0][0][i]+'">\n'
    sq0Ca += '<input type="text" size="2" name="alertC0" value="'+lineAlert[0][0][i]+'">\n'
    sq0Pk += '<input type="text" size="1" name="kenriP0" value="'+ arrKenri[1][0][i]+'">\n'
    sq0Pa += '<input type="text" size="2" name="alertP0" value="'+lineAlert[1][0][i]+'">\n'
    sq1Ck += '<input type="text" size="1" name="kenriC1" value="'+ arrKenri[0][1][i]+'">\n'
    sq1Ca += '<input type="text" size="2" name="alertC1" value="'+lineAlert[0][1][i]+'">\n'
    sq1Pk += '<input type="text" size="1" name="kenriP1" value="'+ arrKenri[1][1][i]+'">\n'
    sq1Pa += '<input type="text" size="2" name="alertP1" value="'+lineAlert[1][1][i]+'">\n'
  }

  let htmltag =
    '<br> <a href="zdownload.html">データ表示　：全データファイル</a>\n'
    + '<br> <a href="download">/download ダウンロード：全データファイル</a>\n'
    + '<br> <a href="../del" >/del ファイル削除：全データファイル（ダウンロード後）</a>\n'
    + '<br> <form action="/" method="post">\n'
    + 'パラメータ設定　※注意：ＳＱ日以外は、すべて数値で入力してください！\n'
    
    + '<br>ＳＱ日０ : \n' 
    + '<input type="text" size="4" name="ddmmyy0" value="'+arrDDMMYY[0]+'">\n'
    + '<br>ＣＡＬＬ 権利行使価格 : ' + sq0Ck + ' Alert ' + sq0Ca
    + '<br>ＰＵＴ　 権利行使価格 : ' + sq0Pk + ' Alert ' + sq0Pa

    + '<br>ＳＱ日１ : \n'
    + '<input type="text" size="4" name="ddmmyy0" value="'+arrDDMMYY[1]+'">\n'
    + '<br>ＣＡＬＬ 権利行使価格 : ' + sq1Ck + ' Alert ' + sq1Ca
    + '<br>ＰＵＴ　 権利行使価格 : ' + sq1Pk + ' Alert ' + sq1Pa
    
    + '<br><input type="submit" value="送信！">\n'
    + '</form>\n'
    ;
/*
    console.error(['DD-MM-YY ' + arrDDMMYY])
    console.error(['KenriC0 ' +  arrKenri[0][0]])
    console.error(['AlertC0 ' + lineAlert[0][0]])
    console.error(['KenriP0 ' +  arrKenri[1][0]])
    console.error(['AlertP0 ' + lineAlert[1][0]])
    console.error(['KenriC1 ' +  arrKenri[0][1]])
    console.error(['AlertC1 ' + lineAlert[0][1]])
    console.error(['KenriP1 ' +  arrKenri[1][1]])
    console.error(['AlertP1 ' + lineAlert[1][1]])
*/
    console.error(pathtext + htmltag)
  

    console.error(" END maketag(lineAlert,arrKenri,arrDDMMYY) ")
  
    return (pathtext + htmltag);
}

function sortFunc(PATH){
  //sort 参考資料
  //https://zenn.dev/tk4/articles/0dcfdd76b862202b217c

  let txt = fs.readFileSync(PATH);
  let txt1 = txt.toString().split('\n').slice(0,-1)
  let txt2 = txt1.sort((a,b) => (a > b ? -1 : 1))//降順にソート
  let txt3 = ''
  for(let ii = 0 ; ii < txt2.length ; ii++){
    txt3 += txt2[ii].split(',').toString()+'\n'
  }
  //console.log(txt3)
  
  return txt3;
  
}