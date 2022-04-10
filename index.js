//#region 資源引入&初始化函式
const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const mongoose= require('mongoose');
const aliceraid = require('./AliceRaid.json');
const aliceshell = require('./AliceShell.json');
const prefix = require('./prefix.json');
require("dotenv").config();

const AnFdmain = require('./anfield.js');
const ErFdmain = require('./erfield.js');

//分支：客戶監聽初始
const client = new Discord.Client({
    intents:[
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
    ],
    partials:['MESSAGE','CHANNEL','REACTION']
});
//#endregion

//#region 登入系統&命令建立
client.once("ready", async () => {
    await mongoose.connect(process.env.MONGOOSELINK,{keepAlive : true})

    console.log(`以 ${client.user.username} 登入中......`);
    client.user.setPresence({ activities:[{name:'安麗娜系統'}] });
    const guildID = process.env.ANLINASERVER;
    const guild = client.guilds.cache.get(guildID);
    let commands;
    if(guild){
        commands = guild.commands;
    }else{
        return;
    };

    //#region 命令區域
    /*raid
    commands?.create({
        name : 'raid',
        description : '死亡愛麗絲討伐查詢指令',
        options :[{
            name : 'raidname',
            description : '普通討伐',
            require : true,
            type :3,
            choices : [
                {name : "水蛇",value : "0",},
                {name : "火龍",value : "1",},
                {name : "食人魔",value : "2",},
                {name : "芬里厄",value : "3",},
                {name : "悲嘆蜘蛛",value : "4",},
                {name : "飛空獸",value : "5",},
                {name : "妖花",value : "6",},
                {name : "火巨",value : "7",},
                {name : "水晶幽魂",value : "8",},
                {name : "貝利亞爾",value : "10",},
                {name : "希爾",value : "11",},
                {name : "水鳥",value : "12",},
                {name : "石柱",value : "13",},
                {name : "妖魂",value : "14",},
                {name : "巴爾",value : "15",},
                {name : "刻耳柏洛斯",value : "16",},
                {name : "黑翼",value : "17",},
                {name : "蛇尾雞",value : "18",},
            ]
        }]
    });*/
    /*shellarmors
    commands?.create({
        name : 'shellarmors',
        description : '死亡愛麗絲殼武查詢',
        options :[{
            name : 'weaponame',
            description : '武器名稱',
            require : true,
            type :3,
            choices : [
                {name : "書",value : "0",},
                {name : "琴",value : "1",},
                {name : "杖",value : "2",},
                {name : "球",value : "3",},
                {name : "劍",value : "4",},
                {name : "槌",value : "5",},
                {name : "弓",value : "6",},
                {name : "柄",value : "7",},
                {name : "禍書",value : "8",},
                {name : "禍琴",value : "9",},
                {name : "禍杖",value : "10",},
                {name : "禍球",value : "11",},
                {name : "禍劍",value : "12",},
                {name : "禍槌",value : "13",},
                {name : "禍弓",value : "14",},
                {name : "禍柄",value : "15",},
            ]
        }]
    });*/
    commands?.create({
        name : 'core',
        description : 'Core-玩家數據生成',
        options :[
            {
                name : 'level',
                description : '玩家等級',
                type : 4,
                required : true,
                max_value : 100,
            },{
                name :'phyack',
                description : '物理武器倍率',
                type : 4,
                required : true,
            },{
                name :'phydef',
                description : '物理防具倍率',
                type : 4,
                required : true,
            },{
                name : 'magack',
                description : '魔法倍率',
                type : 4,
                required : true,
            },{
                name : '0rnament',
                description : '幸運飾品',
                type : 4,
                required : true,
            }
        ]
    });
    //#endregion
});
client.login(process.env.TOKEN5);
//#endregion


//#region 感知訊息更動
client.on("messageUpdate" , async (message) =>{
    let sendsw = 0;
    let notdetect = ['811923840225640498','904733596240216105'];
    function msgupdsend(){
        const MsgUpdateEmbed = new Discord.MessageEmbed()
            .setColor('00ea44')
            .setAuthor({name:message.author.tag +"、感知訊息更動"})
            .addField("來源頻道：",message.channel.name + ` in ${message.guild.name}`)
            .addField("原訊息內容：",message.content)
            .addField("新訊息內容：",message.reactions.message.content)
            .addField("訊息ID：",message.id)
            .setTimestamp();
        client.channels.fetch('812542606721941534').then(message =>{
            message.send({embeds:[MsgUpdateEmbed]})
            .catch(console.error);
        });
    }
    notdetect.forEach(nda =>{
        if(message.guildId !== nda){
            sendsw++;
        };
    });
    if(sendsw ==0)msgupdsend();
    
    //console.log(message);
})
//#endregion

//#region 反應收集系統
//分支：收到反應
client.on("messageReactionAdd", async (reaction,user) => {
    if(reaction.message.id != '952478391213367316')return;
    if(reaction.message.partial){
        try{
            await reaction.message.fetch();
        } catch(error){
            console.log('Error Hassei:',error);
        }
    };
    //console.log(`${user.username} reacted ${reaction.emoji.name}`)
    //身分組
    if(reaction.emoji.name == "✅"){
        reaction.message.guild.members.cache.get(user.id).roles.add('953095500750532608');
    };
    
})

//分支：消除反應
client.on("messageReactionRemove", async (reaction,user) =>{
    if(reaction.message.id != '952478391213367316') return;
    if(reaction.message.partial){
        try{
            await reaction.message.fetch();
        }catch{
            console.log('Error Hassei',error);
        }
    };
    //console.log(`${user.username} disreacted ${reaction.emoji.name}`);
    //身分組
    if(reaction.emoji.name == "✅"){
        reaction.message.guild.members.cache.get(user.id).roles.remove('953095500750532608')
    };
})
//#endregion

//#region 偵測訊息發送
client.on("messageCreate" , (message) =>{
    
    if(message.member.user.bot)return;
    
    try{
        let tempPrefix = '-1';
        Object.keys(prefix).forEach(prelet =>{
            if(message.content.substring(0,3) === prefix[prelet].Value){
                tempPrefix = prelet;
            }
        });
        const insta = message.content.substring(3).split(/\s+/);
        switch(tempPrefix){
            case '0':
                AnFdmain(client,message,insta);
                break;
            case '1':
                ErFdmain(client,message,insta);
                break;
            default:
                //console.log('pre = -1')
                break;
        }
    }catch{
        console.log(error);
    }
    
});
//#endregion

//#region 斜線指令使用
client.on("interactionCreate",async (interaction) =>{
    if(!interaction.isCommand()) return;
    //console.log(interaction.options);
    const { commandName , options} = interaction;
    switch(commandName){
        case "raid":
            const raidvalue = options.getString('raidname')
            const RaidEmbed = new Discord.MessageEmbed()
                .setColor('#071def')
                .setThumbnail(aliceraid[raidvalue].picurl)
                .setTitle(aliceraid[raidvalue].title)
                .setFooter({text :"|資料整理&筆記提供：" ,iconURL : 'https://i.imgur.com/r4dwGoU.png'})
                .addFields([
                    {name:"│角色：",value:aliceraid[raidvalue].area},
                    {name:"│特效防具：",value:aliceraid[raidvalue].arms},
                    {name:"│攻略筆記：",value:aliceraid[raidvalue].details},
                    {name:"│關卡資源：",value:aliceraid[raidvalue].useage},
                    {name:"│夢魘技能：",value:aliceraid[raidvalue].skills},
                ]);
            const RaidButton = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel('Database')
                        .setStyle('LINK')
                        .setURL(aliceraid[raidvalue].buttonurl),
                );
            interaction.reply({
                embeds :[RaidEmbed],
                components:[RaidButton],
                ephemeral: true,
            });
            break;
        case 'shellarmors':
            const shellvalue = options.getString('weaponame');
            const ShellEmbed = new Discord.MessageEmbed()
                .setColor('#071def')
                .setThumbnail(aliceshell[shellvalue].picurl)
                .setTitle(aliceshell[shellvalue].title)
                .setFooter({text :"|資料整理&程式設計：凝洸" ,iconURL : 'https://i.imgur.com/r4dwGoU.png'})
                .addFields([
                    {name:">武器來源：",value:aliceshell[shellvalue].origin},
                    {name:">進化素材：",value:aliceshell[shellvalue].evolution +"各五顆"},
                    {name:">洗技能素材：",value:aliceshell[shellvalue].refresh},
                ]);
                const ShellButton = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel('Database')
                        .setStyle('LINK')
                        .setURL(aliceshell[shellvalue].detailurl),
                );
            interaction.reply({
                embeds :[ShellEmbed],
                components:[ShellButton],
                ephemeral: true,
            });
            break;
        case 'core':
            const {floor,pow} = Math;
            const LLV = options.getInteger('level');
            const PTA = options.getInteger('phyack');
            const PAD = options.getInteger('phydef');
            const MTA = options.getInteger('magack');
            const OOL = options.getInteger('0rnament');
            var HEA,STR,PAV,SOR,MAV,VIT,PDE,PUR,INT,MDE,LUC,VEL;
            var lvd1 = LLV/10;
            var lvdi = floor(lvd1);
            var tma = lvd1 - lvdi;

            function Heahandler(a){
                var b = (a <=10) ? 100 + a : floor(0.5 * lvdi *(20 * pow(tma,4) + 10 * lvdi + floor(a))) + 100;
                return b ;
            };

            HEA = Heahandler(LLV);
            STR = 40 + 2*LLV;
            PAV = STR * PTA/4;
            SOR = 20 + 1*LLV;
            MAV = (10 + SOR*0.75) * MTA/4;
            VIT = 10;
            PDE = VIT * PAD;
            PUR = (0.5 - pow(VIT/100,2))*100;
            INT = 5;
            MDE = 1 - INT * 0.01;
            LUC = floor(50*OOL / (INT +10));
            VEL = 0;
            
            const CoreEmbed = new Discord.MessageEmbed()
                .setAuthor({name :"Core 測試",iconURL:process.env.ANLINA5AVATER})
                .setTitle(`LV等級:${LLV}、PA物理武器:${PTA}、PD物理防具:${PAD}、MD魔法防具:${MTA}、LUC幸運飾品:${OOL}`)
                .setDescription(`血量：${HEA}`)
                .setColor('GREEN')
                .addFields(
                    {name:'物理類：',value:`力量STR ⋮ ${STR}\n體力VIT ⋮ ${VIT}\n物攻PAV ⋮ ${PAV}\n物防PDE ⋮ ${PDE}`},
                    {name:'魔法類：',value:`魔力SOR ⋮ ${SOR}\n聰敏INT ⋮ ${INT}\n魔攻MAV ⋮ ${MAV}\n魔防MDE ⋮ ${MDE}`},
                    {name:'附加類：',value:`藥效PUR ⋮ +${PUR}%\n幸運LUC ⋮ ${LUC}%\n閃避VEL ⋮ ${VEL}`},
                )
                .setFooter({text : 'testing by AnlinaSys'});
                interaction.reply({embeds : [CoreEmbed]});
                //console.log(LLV,HEA,STR,SOR,VIT,INT,VEL,PDE,MDE,LUC,PUR);
            break;
        /*default:
            break;*/
    }
})
//#endregion