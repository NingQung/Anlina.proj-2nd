const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const Discord = require('discord.js');
const mongoose = require("mongoose");
require("dotenv").config;

const ERstart = require('./er_plsch.js');
const ERplde = require('./er_plfd.js');

function delay(n){return new Promise(function(resolve){setTimeout(resolve,n*1000);});}

module.exports = async function(client,message,insta){
    const ERplayer = await ERplde(message.author.id);
    switch(insta[0]){
        case 'start':
            ERstart({
                _id: message.author.id,
                pl_name : insta[1],
                pl_money : 100,
                pl_mv : 0,
                so_weight : 10,
                so_crysoal : 'A1',
                weapon_a : 'D1',
                weapon_b : null,
                so_bag : null,
                weapon_bag : null,
            },{versionKey : false}).save();
            console.log('re4?');
            break;
        case 'addmoney':
            await ERplayer(
                {_id: message.author.id},
                {pl_money : ERplayer.pl_money + 200},
                null,null
            );
            break;
        default:
            message.react('❌');
            break;
    }
}