import axios from "axios";
import { Telegraf } from "telegraf";
import { config } from "./config.js";

const bot = new Telegraf(config.telegramToken, {});
bot.start((ctx) => ctx.reply('Welcome'));
bot.on ('message', async (ctx) => {
    if('ctx.message.location'){
        const weatherAPIUrl = `${config.weatherURL} + ${ctx.message.location.latitude},${ctx.message.location.longitude}
        `;
        const response = await axios.get(weatherAPIUrl);
        ctx.reply(`${response.data.location.name}, температура: ${response.data.current.temp_c}°C`);
    }
  } );
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));