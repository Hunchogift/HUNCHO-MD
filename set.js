const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUFNcnlVTVJPek84MXpmYzB2MHE2ZFhSZFRDK3RvSitTek4xTDR6WGdIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWxZYUxuUllhMUVlclY0eGV2bSt2WlpqOFhFNWZ4Umt4Q0xYQVQ5TEJFaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQTdtczhVRGlLcm9IdE9wTXVIYlRDdzRKS2VJZzhuVkxpWEo1UXVVTEdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqajByWHBibVNzbm5hMld3NmxjelpDbC83Q20zSFNFUHlNenVNT2x0OVM0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFFcnZVb2g3NGM3NHI0Z2hObVZGN1M5ZndVQWVFaVVxakc2M216My9ZbmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik55bERDS2hEckUxSkg1YkY4bUFDdFFHbS85TUZwRWdZMWxNVUtwbEtLREU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEYreWd3S25hYlpXUDhYaHJZMUZuSUhuVVJkOGEyeHlTeXNkbzIrem9Xbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUFBZlFCRVRQYTVFR0VGa2c5cUhPems3UGJGYUhycWYvYVU0VFR3cFFVcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNqVzd1aXRlVGU4QStCM3U0WUVmd1Z1cUhWcmNndW1XaW9rYm9vNFVYOWptR3YrVkxBRE9UWXE3d3dUeG45OEQwZHZ0T3dtWkhVYll0QTdGN0VPV2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiJXSGl6ZCtqSjlEenhiT1FnVThvRVBuN3dsMmsvblB5VFdPTEttaWl6UXBBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmdUROZ0RPaVM1bTQ5OWhzbUF5b3hnIiwicGhvbmVJZCI6IjZlYzgzODVjLWViZWItNDkzYS1hMzBiLTEyNmY2NjE1NTEwMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwUDVUd0ZTZlZjc1hMekJJY3dzZStPYzRBdG89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmlnOW9pZWtWZ2hVd293S3dyTlN1S3NBeFhrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhWOUdaTTVIIiwibWUiOnsiaWQiOiIyNjM3ODE4NTg0MjM6MTNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1ArSjJmQUdFT2E5MHJJR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InlIK2ZEUHBWMnQyelZFeTFDVmJUc3Y4dWFHSW5MUFNNaWUxTTRDYXovaU09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkcwcGVPQjFnbnVzRTBVNm45M012WGxUU1VZWm4xZVdZRFkrOGYrMkpXN1pGbnlDZXJ0cGFodXZ1ZitpQ1JwT3FsYlkvUExxbW5LVlJHc0ZiejM0K0NBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJVTW13blEvaktkVEtuT3EyanhRWE1UaGJhcmpkdVpqWnFrOUdYRkE3Y1JDMFJ1VGdiMHRTb2s1SHE4KzlEb0UwanNDUHF0bUd4VklhVGc3bkdmblRndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4MTg1ODQyMzoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjaC9ud3o2VmRyZHMxUk10UWxXMDdML0xtaGlKeXowakludFRPQW1zLzRqIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE2ODIxNzQ4fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Keith Keizzah",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "263781858423",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
