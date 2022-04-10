const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const Discord = require('discord.js');
const mongoose = require("mongoose");
require("dotenv").config;
function delay(n){return new Promise(function(resolve){setTimeout(resolve,n*1000);});}

module.exports = async function(client,message,insta){
    const {channel} = message;
    const {send,messages} = channel;
    switch(insta[0]){
        case 'pin':
            var pinC = 0;
            if(message.reference != null){
                messages.fetch(message.reference.messageId).then(message =>{
                    if(message.pinned){
                        send("抱歉，此訊息已經被釘選了喔!");
                    }else{
                        if(message.pinnable){
                            pinC = 1;
                            message.pin();
                        }else{
                            send("無法釘選，在這個伺服器我似乎不是管理員......");
                        }
                    }
                });
                if(pinC == 1)message.react('✅');

            }else{
                send('沒有指定訊息\n回覆即可');
            }
            break;
        case 'unpin':
            if(message.reference != null){
                messages.fetch(message.reference.messageId).then(message =>{
                    if(message.pinned){
                        if(message.pinnable){
                            message.unpin();
                        }else{
                            send('沒有權限啊......');
                        }
                    }else{
                        send("沒有定選要如何解定啊?"); 
                    }
                });
                if(pinC == 1)message.react('✅');
            }else{
                send('沒有指定訊息\n回覆即可');
            }
            break;
        case 'ocdlt':
            client.channels.cache.get(insta[2]).send(insta[1]);
            break;
        case 'logl':
            console.log('---------------------------------------')
            break;

        default:
            message.react('❌');
            break;
    }

}