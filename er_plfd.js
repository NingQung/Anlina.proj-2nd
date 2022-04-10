const mongoose = require('mongoose');
const ERplayer = require('./er_plsch.js');

module.exports = async function (plid){
    const erpl = await ERplayer.findById(
        {_id : plid},
    );
    return erpl;
}