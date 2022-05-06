const puppeteer=require("puppeteer");
let { answer } = require("./codes.js");
let secdata=require('./secret');

let email=secdata.email;
let password=secdata.password;
let ctab;

let openbrowser=puppeteer.launch({
headless:false,
defaultViewport:null,
args: ["--start-maximized"],
executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});
openbrowser
.then(function (browser){
 console.log("browser is open ");
 //console.log(browser);
 //An array of all open pages inside the Browser.
 let alltab=browser.pages();
 return alltab;
})//promise chaining
//alltab.then() ,bottom written content means this
//'allTabArr' is declared but its value is never read
.then(function (aTabArr){
     ctab=aTabArr[0];
    console.log("new tab");
    //url to navigate pages
   let visitinglogin_page= ctab.goto("https://www.hackerrank.com/auth/login");
   return visitinglogin_page;
})
.then(function (){
    console.log("hackerrank login page opened");
    let emailtypepromise=ctab.type("input[name='username']",email,{delay:100});
    return emailtypepromise;
})
.then(function(){
 console.log("email is typed");
 let passwordtypepromise=ctab.type("input[type='password']",password,{delay:100});
 return passwordtypepromise;
})
.then(function(){
    console.log("password is typed");
    let login=ctab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return login;
})
.then(function(){
    console.log("logged in to hackerrank");
    //waitforselector will wait for the entire page to load
    //need to open the algorithm page
   let algorithmtabopen=waitandclick("div[data-automation='algorithms']");
    return algorithmtabopen;
})
.then(function(){
    console.log("algorithm page is open");
    let allQuesPromise = ctab.waitForSelector(
        'a[data-analytics="ChallengeListChallengeName"]'
      );
      return allQuesPromise;

})
.then(function(){
    function getAllQuesLinks() {
        let elemarr=document.querySelectorAll('a[data-analytics="ChallengeListChallengeName"]');
        let linkarr=[];
        for(let i=0;i<elemarr.length;i++){
           linkarr.push(elemarr[i].getAttribute("href"));

        }
        return linkarr;
    }
    let linksArrPromise = ctab.evaluate(getAllQuesLinks);
    
    return linksArrPromise;
})
.then(function(og){
    console.log("links to all ques received");
    //console.log(og);
    let questionsolverpromise=questionsolver(og[0], 0)
 for(let i=1;i<og.length;i++){
    questionsolverpromise=questionsolverpromise.then(function(){
        return questionsolver(og[i],i);
    });
 }
    return questionsolverpromise;


})
.then(function(){
    console.log("question is solved");
})
.catch(function(err){
    console.log(err);
})









function waitandclick(algobtn){
    let mypromise=new Promise(function(resolve,reject){
        let waitforselectorpromise=ctab.waitForSelector(algobtn);
        waitforselectorpromise
        .then(function(){
            let algomyselector=ctab.click(algobtn);
            return algomyselector;
        })
        .then(function(){
            console.log("algorithm is clicked");
            resolve();
        })
        .catch(function(err){
           reject(err);
        })
    });
    return mypromise;
}


function questionsolver(url,idx)
{  return new Promise(function(resolve,reject){
    let fullLink =`https://www.hackerrank.com${url}`;
    let goToQuesPagePromise = ctab.goto(fullLink);
    goToQuesPagePromise
    .then(function(){
        console.log("question opened");
        let waitForCheckBoxAndClickPromise = waitandclick(".checkbox-input");
        return waitForCheckBoxAndClickPromise;
    })
    .then(function(){
        let waitfortextboxpromise=ctab.waitForSelector(".custominput");
        return waitfortextboxpromise;
    })
    .then(function(){
        let answertypedpromise=ctab.type(".custominput",answer[idx],{delay: 100});
        return answertypedpromise
    })
    .then(function(){
        let controlpressedpromise=ctab.keyboard.down("Control");
        return controlpressedpromise;
    })
    .then (function(){
        let apressedkey=ctab.keyboard.press("a");
        return apressedkey;
    })
    .then(function(){
        let xpressedkey=ctab.keyboard.press("x");
        return xpressedkey;
    })
    .then(function(){
        let controlupkey=ctab.keyboard.up("Control");
        return controlupkey;
    })
    .then(function () {
        //select the editor promise
        let cursorOnEditorPromise = ctab.click(
          ".monaco-editor.no-user-select.vs"
        );
        return cursorOnEditorPromise;
      })
      .then(function () {
        //control key is pressed promise
        let controlPressedPromise = ctab.keyboard.down("Control");
        return controlPressedPromise;
      })
      .then(function () {
        let aKeyPressedPromise = ctab.keyboard.press("A");
        return aKeyPressedPromise;
      })
      .then(function () {
        let vKeyPressedPromise = ctab.keyboard.press("V");
        return vKeyPressedPromise;
      })
      .then(function () {
        let controlDownPromise = ctab.keyboard.up("Control");
        return controlDownPromise;
      })
      .then(function () {
        let submitButtonClickedPromise = ctab.click(".hr-monaco-submit");
        return submitButtonClickedPromise;
      })
      .then(function(){
          console.log("code is submiited successfully");
          resolve();
      })
      .catch(function(err){
        reject(err);
      })
}
)

}