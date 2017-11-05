var request = require("request");
var reqprom=require('request-promise');

// var api = "https://api.github.com/search/users?q=location:serbia+language:javascript&page=1&access_token=8fe0841ba3e20ac9065eb59c1483f123644b6c21";
//
// var test = new Promise(function(resolve, reject){
//     request('https://api.github.com/search/users?q=location:serbia+language:javascript&page=1&access_token=f3cf2928fb4f4646eb883b951f970a1127ab79ba',
//     function(error, response, body){
//         if(!error && response.statusCode===200){
//             console.log(body.total_count);
//         } else {
//             console.log(error+" "+response.statusCode);
//         }
//     });
// });

var test = new Promise(function(resolve, reject) {
    //authorize(function(err, res) {
        // var data = JSON.parse(res);
        // var apiKey = data["access_token"];
        // var authReq = 'Bearer ' + apiKey;
        request({
            headers: {
                'User-Agent': 'MY IPHINE 7s'
            },
            url: 'https://api.github.com/search/users?q=location:serbia+language:javascript&page=1&access_token=f3cf2928fb4f4646eb883b951f970a1127ab79ba',
            method: 'get'
        }, function(err, res, body) {
            resolve(JSON.parse(body));
        });
    //});
});

test.then(function(res){
    for(var i=0; i<res.items.length; i++){
        console.log(res.items[i].login);
    }
    console.log(res.total_count);
});

var result=[];
var niz = [];
var users = test.then(function(res){
    for(var i=0; i<res.items.length; i++){
        niz.push(res.items[i]);
    }
    //console.log(niz);
    var urls=niz.map(function(user){
        return user.url+'?access_token=f3cf2928fb4f4646eb883b951f970a1127ab79ba';
    });

    console.log(urls);

    // var promises = urls.map(function(url){
    //     return new Promise(function(resolve, reject) {
    //             reqprom({
    //                 headers: {
    //                     'User-Agent': 'MY IPHINE 7s'
    //                 },
    //                 url: url,
    //                 method: 'get'
    //             }, function(err, res, body) {
    //                 return body;
    //             });
    //
    //     });
    // });
    // console.log(promises);
    //
    // Promise.all(promises).then(function(data){
    //     data.forEach(function(user){
    //     user=JSON.parse(user);
    //     //if(user.hireable===false){
    //         var tmp={
    //             name:user.login,
    //             email:user.email,
    //             image:user.avatar_url,
    //             bio:user.bio,
    //             link:user.html_url
    //         };
    //             result.push(tmp);
    //         //}
    //     });
    //
    //     console.log(result);
    // });
//     const promises = urls.map(async url => await reqprom({url:url,
//         headers:{
//             'User-Agent':'zsevic'
//         }
//     },(err,res,body)=>{
// 	    return body;
//     }));
//
// 	Promise.all(promises).then((data) => {
//
//         data.forEach((user)=>{
//             user=JSON.parse(user);
//             if(user.hireable===true){
//                 let tmp={
//                     name:user.login,
//                     email:user.email,
//                     image:user.avatar_url,
//                     bio:user.bio,
//                     link:user.html_url
//                 };
//                 result.push(tmp);
//             }
//         });
//
//         console.log(result);
// 	});
//
// });





// var axios=require('axios');
//
//  async function bro(){
//    //let users = await axios(`https://api.github.com/search/users?q=location:${location}+language:${language}&per_page=5&access_token=${GITHUB_TOKEN}`);
//    var users = await axios('https://api.github.com/search/users?q=location:serbia+language:javascript&page=1&access_token=8fe0841ba3e20ac9065eb59c1483f123644b6c21');
//    // for(let i=0;i<users.data.items.length;i++){
//    //     const users=await getUsersData(users.data.items[i].url);
//    //     console.log(users);
//    // }
//    //return users.data.items;
//    console.log(users.data.total_count);
// }
//
//
// bro();
// async function getUsersData(url){
//    const data=await axios(url);
//    return data;
// }
