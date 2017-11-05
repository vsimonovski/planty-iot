var NodeGeocoder = require('node-geocoder');
var request = require('request');
var reqprom = require('request-promise');
//ar axios=require('axios');

var options = {
    provider: 'google'
};

var geocoder = NodeGeocoder(options);
var street;
var pinDigits;
var logged = false;
var wasLogged = false;
//TODO: google map image https://maps.googleapis.com/maps/api/staticmap?size=764x400&center="+msg.lat+",
// "+msg.long+"&zoom=17&markers="+msg.lat+","+msg.long

exports.handler = function(event, context) {
    try {
        console.log(
            'event.session.application.applicationId=' +
                event.session.application.applicationId
        );

        if (event.session.new) {
            onSessionStarted(
                {
                    requestId: event.request.requestId
                },
                event.session
            );
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request, event.session, function callback(
                sessionAttributes,
                speechletResponse
            ) {
                context.succeed(
                    buildResponse(sessionAttributes, speechletResponse)
                );
            });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request, event.session, function callback(
                sessionAttributes,
                speechletResponse
            ) {
                context.succeed(
                    buildResponse(sessionAttributes, speechletResponse)
                );
            });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail('Exception: ' + e);
    }
};

function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

// Called when the user invokes the skill without specifying what they want.
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback);
}

function onIntent(intentRequest, session, callback) {
    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;

    if (
        intentName == 'sportIntent' ||
        intentName == 'apiIntent' ||
        intentName == 'productsIntent' ||
        intentName == 'plantyIntentStart' ||
        intentName == 'plantyIntentStop' ||
        intentName == 'apiCall' ||
        intentName == 'whatToDo' ||
        intentName == 'plantImprove' ||
        intentName == 'plantFeels'
    ) {
        handleBankIntent(intent, session, callback, intentName);
    } else if (intentName == 'AMAZON.CancelIntent') {
        handleCancelIntent(intent, session, callback);
    } else if (intentName == 'AMAZON.NoIntent') {
        handleCancelIntent(intent, session, callback);
    } else {
        handleUnreckognizedIntent();
    }
}

function onSessionEnded(sessionEndedRequest, session) {}

// ------- Skill specific logic -------

function getWelcomeResponse(callback) {
    logged = true;
    wasLogged = false;

    var speechOutput = 'Hi there I am Planty!';

    var reprompt = 'Please tell me how can I help you?';

    pinDigits = generateAccessDigits();

    var shouldEndSession = false;

    var sessionAttributes = {
        speechOutput: speechOutput,
        repromptText: reprompt
    };

    callback(
        sessionAttributes,
        buildSpeechletResponse('🌱', speechOutput, reprompt, shouldEndSession)
    );

    // });
}

function handleBankIntent(intent, session, callback, call) {
    var speechOutput = 'We have an error. ';
    var infoResponses = [
        'Do you need something more?',
        'Do you need anything else?',
        'Anything else?',
        'Can I help you with something else?',
        'Any other question?'
    ];

    var response =
        infoResponses[Math.floor(Math.random() * infoResponses.length)];
    getJSON(
        function(data) {
            if (data != 'ERROR') {
                if (call == 'digitsIntent') {
                    if (!logged || wasLogged == false) {
                        if (logged) wasLogged = true;
                        var speechOutput = data;
                    } else {
                        var speechOutput =
                            "Sorry, I don't understand your request. If you don't know what I am capable for, ask me for help.";
                        data = '';
                    }
                } else {
                    if (logged) {
                        var speechOutput = data + ', '; //+ response
                    } else {
                        var speechOutput =
                            'Please authorize first by reading me four digits that I sent to your mobile app.';
                        data = '';
                    }
                }
            }
            callback(
                session.attributes,
                buildSpeechletResponse(data, speechOutput, '', false)
            );
        },
        call,
        intent
    );
}

function handleEmailIntent(intent, session, callback, call) {
    var infoResponses = [
        'Do you need something more?',
        'Do you need anything else?',
        'Anything else?',
        'Can I help you with something else?',
        'Any other question?'
    ];
    var response =
        infoResponses[Math.floor(Math.random() * infoResponses.length)];
    var speechOutput = 'Job offer sent successfuly. ' + response;
    buildSpeechletResponse(data, speechOutput, '', false);
}

function handleCancelIntent(intent, session, callback) {
    var speechOutput = 'Thanks for using Find it assistant, goodbye!';
    callback(
        session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, '', true)
    );
}

function handleUnreckognizedIntent() {
    var speechOutput =
        "Sorry, I don't understand your request. If you don't know what I am capable for, ask me for help.";
    callback(
        buildSpeechletResponseWithoutCard(
            speechOutput,
            'Please tell me what do you need.',
            false
        )
    );
}

function url() {
    return 'https://api.github.com/search/users?q=location:serbia+language:javascript&page=1&access_token=4eda570f31baaf07ccbd808338f1613b5642e974';
}

function getJSON(callback, calling, intent) {
    if (calling === 'sportIntent') {
        callback('Please repeat that. ');
    } else if (calling === 'plantyIntentStart') {
        var test = new Promise(function(resolve, reject) {
            request(
                {
                    headers: {
                        'User-Agent': 'MY IPHINE 7s'
                    },
                    url: 'https://6633a507.ngrok.io/start',
                    method: 'get'
                },
                function(err, res, body) {
                    resolve(JSON.parse(body));
                }
            );
            //});
        });

        test.then(function(res) {
            callback('Lights on!');
        });
    } else if (calling === 'plantyIntentStop') {
        var test = new Promise(function(resolve, reject) {
            request(
                {
                    headers: {
                        'User-Agent': 'MY IPHINE 7s'
                    },
                    url: 'https://6633a507.ngrok.io/stop',
                    method: 'get'
                },
                function(err, res, body) {
                    resolve(JSON.parse(body));
                }
            );
            //});
        });

        test.then(function(res) {
            callback('Lights off!');
        });
    } else if (calling === 'apiCall') {
        var test = new Promise(function(resolve, reject) {
            request(
                {
                    headers: {
                        'User-Agent': 'MY IPHINE 7s'
                    },
                    url:
                        'https://674a789d.ngrok.io/temp/59fe70c3f36d2831457fb42b',
                    method: 'get'
                },
                function(err, res, body) {
                    resolve(JSON.parse(body));
                }
            );
            //});
        });

        test.then(function(res) {
            callback(res.temp);
        });
    } else if (calling === 'whatToDo') {
        var test = new Promise(function(resolve, reject) {
            request(
                {
                    headers: {
                        'User-Agent': 'MY IPHINE 7s'
                    },
                    url:
                        'https://674a789d.ngrok.io/temp/59fe70c3f36d2831457fb42b',
                    method: 'get'
                },
                function(err, res, body) {
                    resolve(JSON.parse(body));
                }
            );
        });
        test.then(function(res) {
            var infoResponses = [
                'Do you need something more?',
                'Do you need anything else?',
                'Anything else?',
                'Can I help you with something else?',
                'Any other question?'
            ];
            var response =
                infoResponses[Math.floor(Math.random() * infoResponses.length)];
            var moisture = res.stats.moisture;
            var temp = res.stats.temperature;
            var sun = res.stats.sun;
            var name = res.name;
            var specy = res.specy;
            var output = 'Your ' + specy + ' plant, ' + name + ' ';
            if (moisture > 550) {
                output += 'is as dry as a bone. She needs a lot of water!';
            } else if (moisture > 380) {
                output += 'is thirsty. Please give her some water!';
            } else if (moisture > 250) {
                output += 'has enough water. Great job!';
            } else {
                output +=
                    'is saturated with water. If you continue, you can drown it!';
            }
            output += ' ' + response;
            callback(output);
        });
    } else if (calling === 'plantImprove') {
        console.log('eee');
        var test = new Promise(function(resolve, reject) {
            request(
                {
                    headers: {
                        'User-Agent': 'MY IPHINE 7s'
                    },
                    url:
                        'https://674a789d.ngrok.io/temp/59fe70c3f36d2831457fb42b',
                    method: 'get'
                },
                function(err, res, body) {
                    resolve(JSON.parse(body));
                }
            );
        });
        test.then(function(res) {
            var infoResponses = [
                'Do you need something more?',
                'Do you need anything else?',
                'Anything else?',
                'Can I help you with something else?',
                'Any other question?'
            ];
            var response =
                infoResponses[Math.floor(Math.random() * infoResponses.length)];
            var moisture = res.stats.moisture;
            var temp = res.stats.temperature;
            var sun = res.stats.sun;
            var name = res.name;
            var specy = res.specy;
            var output = 'Current temperature is good for ' + name;
            if (sun > 950) {
                output +=
                    " but it's not very well lit up. Move her to a place with a better light! ";
            } else {
                output += ' and this place has great light. Great job!';
            }
            output += ' ' + response;
            callback(output);
        });
    } else if (calling === 'plantFeels') {
        console.log('eee');
        var test = new Promise(function(resolve, reject) {
            request(
                {
                    headers: {
                        'User-Agent': 'MY IPHINE 7s'
                    },
                    url:
                        'https://674a789d.ngrok.io/temp/59fe70c3f36d2831457fb42b',
                    method: 'get'
                },
                function(err, res, body) {
                    resolve(JSON.parse(body));
                }
            );
        });
        test.then(function(res) {
            var infoResponses = [
                'Do you need something more?',
                'Do you need anything else?',
                'Anything else?',
                'Can I help you with something else?',
                'Any other question?'
            ];
            var response =
                infoResponses[Math.floor(Math.random() * infoResponses.length)];
            var moisture = res.stats.moisture;
            var temp = res.stats.temperature;
            var sun = res.stats.sun;
            var name = res.name;
            var specy = res.specy;
            var output = '';
            if (sun > 950) {
                output =
                    'Your plant, ' +
                    name +
                    ' does not feel very well, ask me for more info to help her to feel better!';
            } else {
                output =
                    ' Now ' +
                    name +
                    ', feels much better. She is very grateful for taking care of her. Congrats!';
            }
            output += ' ' + response;
            callback(output);
        });
    } else if (calling === 'productsIntent') {
        //var infoResponses = ["Do you need something more?", "Do you need anything else?", "Anything else?", "Can I help you with something else?", "Any other question?"]
        //var response = infoResponses[Math.floor(Math.random() * infoResponses.length)]
        var speechOutput =
            'Job offer sent successfuly. Can I help you with something else?';
        callback(speechOutput);
    } else if (calling === 'apiIntent') {
        var lang = intent.slots.lang.value;
        var country = intent.slots.country.value;
        // var lang = "javascript";
        // var country = "serbia";
        var l = intent.slots.digit.value;
        var temp = 'Ok. ';
        var test = new Promise(function(resolve, reject) {
            //authorize(function(err, res) {
            // var data = JSON.parse(res);
            // var apiKey = data["access_token"];
            // var authReq = 'Bearer ' + apiKey;
            request(
                {
                    headers: {
                        'User-Agent': 'MY IPHINE 7s'
                    },
                    url:
                        'https://api.github.com/search/users?q=location:' +
                        country +
                        '+language:' +
                        lang +
                        '&page=1&access_token=f3cf2928fb4f4646eb883b951f970a1127ab79ba',
                    method: 'get'
                },
                function(err, res, body) {
                    resolve(JSON.parse(body));
                }
            );
            //});
        });

        test.then(function(res) {
            //var l = 5;
            temp =
                'There are ' +
                res.total_count +
                ' ' +
                lang +
                ' developers from ' +
                country +
                ' and I think this ' +
                l +
                ' can fit the best. ';
            // for(var i=0; i<l; i++){
            //     if(i==l-1){
            //         temp+=res.items[i].login + ". ";
            //     } else {
            //         temp+=res.items[i].login + ", ";
            //     }
            //
            // }
            //callback(temp);
        });
        var pravo = false;
        var emails = [];
        var counter = 0;
        var result = [];
        var niz = [];
        var users = test.then(function(res) {
            for (var i = 0; i < res.items.length; i++) {
                niz.push(res.items[i]);
            }
            //console.log(niz);
            var urls = niz.map(function(user) {
                return (
                    user.url +
                    '?access_token=f3cf2928fb4f4646eb883b951f970a1127ab79ba'
                );
            });

            //console.log(urls);

            var promises = urls.map(function(url) {
                return new Promise(function(resolve, reject) {
                    request(
                        {
                            headers: {
                                'User-Agent': 'MY IPHINE 7s'
                            },
                            url: url,
                            method: 'get'
                        },
                        function(err, res, body) {
                            resolve(JSON.parse(body));
                        }
                    );
                });
            });
            //console.log(promises);

            Promise.all(promises).then(function(data) {
                data.forEach(function(user) {
                    // user=JSON.parse(user);
                    //console.log(user);
                    if (user.hireable === true && counter < l) {
                        //  var tmp={
                        //      name:user.name,
                        //      email:user.email,
                        //      image:user.avatar_url,
                        //      bio:user.bio,
                        //      link:user.html_url
                        //  };
                        //     //console.log(tmp);
                        //      result.push(tmp);
                        //     //console.log(user.login);

                        //for(var i=0; i<l; i++){
                        //    if(i==l-1){
                        switch (counter) {
                            case 0:
                                temp += ' Frist of them is ';
                                break;
                            case 1:
                                temp += ' Second is ';
                                break;
                            case 2:
                                temp += ' Third is ';
                                break;
                            case 3:
                                temp += ' Fourth is ';
                                break;
                            case 4:
                                temp += ' fifth is ';
                                break;
                        }
                        if (user.name == null) {
                            temp +=
                                user.login +
                                ' from ' +
                                user.location +
                                ' with ' +
                                user.public_repos +
                                ' public repos and ' +
                                user.followers +
                                ' followers.';
                        } else {
                            temp +=
                                user.name +
                                ' from ' +
                                user.location +
                                ' with ' +
                                user.public_repos +
                                ' public repos and ' +
                                user.followers +
                                ' followers.';
                        }

                        if (user.email != null) {
                            emails[counter] = user.email;
                        } else {
                            emails[counter] = null;
                        }
                        //emails[counter] = user
                        counter++;
                        //    } else {
                        //        temp+=user.name + ", ";
                        //    }
                    }
                });
                temp += ' I can send email job offer to ';
                for (var i = 0; i < l; i++) {
                    if (emails[i] != null) {
                        switch (i) {
                            case 0:
                                pravo = true;
                                temp += ' first ';
                                break;
                            case 1:
                                pravo = true;
                                temp += ' second ';
                                break;
                            case 2:
                                pravo = true;
                                temp += ' third ';
                                break;
                            case 3:
                                pravo = true;
                                temp += ' fourth ';
                                break;
                            case 4:
                                pravo = true;
                                temp += ' fifth ';
                                break;
                        }
                    }
                }
                if (!pravo) {
                    temp += ' first and second ';
                }
                temp += ' of them. ';
                temp += 'Do you want me to send offer to someone? ';
                callback(temp);
                //console.log(result);
            });
        });
    }
}

// ------- Helper functions to build responses for Alexa -------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output
        },
        card: {
            type: 'Simple',
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function toRadians(deg) {
    return deg * Math.PI / 180;
}

function locWrap(body) {
    var obj = {};
    // Current location
    var lat = 44.807037;
    var long = 20.455781;
    var b = JSON.parse(body);
    b.reduce(function(acc, value) {
        var R = 6371e3; // metres
        var fi1 = toRadians(value.latitude); //.toRadians();
        var fi2 = toRadians(lat);
        var deltaFi = toRadians(lat - value.latitude); //.toRadians();
        var deltaLambda = toRadians(long - value.longitude); //.toRadians();
        var a =
            Math.sin(deltaFi / 2) * Math.sin(deltaFi / 2) +
            Math.cos(fi1) *
                Math.cos(fi2) *
                Math.sin(deltaLambda / 2) *
                Math.sin(deltaLambda / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        if (acc > d) {
            obj = value;
            obj.distance = d;
            return d;
        }
        return acc;
    }, Number.MAX_VALUE);
    return obj;
}

function generateAccessDigits() {
    var digits = '';
    for (var i = 0; i < 4; i++) {
        digits += Math.floor(Math.random() * 10);
    }
    return digits;
}

function buildSpeechletResponseWithoutCard(
    output,
    repromptText,
    shouldEndSession
) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
