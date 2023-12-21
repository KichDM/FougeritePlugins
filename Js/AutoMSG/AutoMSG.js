var Author = "KichDM";
var About = "Announcement System"
var Version = "1.0.0"

var Announcement = [
  "Server Discord: discord.gg/UKqAjyPrZG",
  "Owner/Server Creator: KichDM#0371.",
  "If you have any questions, feel free to ask in the chat.",
  "The administration team is here to assist you.",
  "Enjoy your time on the server.",
  "If you encounter any hackers, don't hesitate to report them on Discord or using the /report command.",
  "All server plugins are customized for this server ^^",
  "Feel free to share any suggestions for the server on Discord!",
  "Use the pickaxe for extra loot while farming ^^",
  "You can view the top players with the most kills using /top",
  "You can check the next server restart time with the /restart or /reinicio command",
  "You can check when the airdrop will occur with the /airdrop command",
  "If you're just starting, the /help command will show you the server commands",
  "You can view someone's stats with the /stats [player name] command",
  "You can check the server's gather type using the /farm info command"
  ];

  function On_ServerInit() {
    var loco = NumeroRandom(2,10);
    var tiempo =  minutosAMilisegundos(Number(loco).toFixed(2));
	Plugin.CreateTimer("Announcement", tiempo).Start();
}

  function AnuncioRandom() {
    var random = Math.floor(Math.random() * Announcement.length);
    var elaununciofinal = Announcement[random];
    Server.Broadcast("[color#DAA520]" + elaununciofinal);
  }

  function NumeroRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  function minutosAMilisegundos(minutos) {
    var milisegundos = minutos * 60 * 1000;
    return milisegundos;
  }

function AnnouncementCallback() {
    AnuncioRandom();
    Plugin.KillTimer("Announcement");
    var loco = NumeroRandom(2,10);
    var tiempo =  minutosAMilisegundos(Number(loco).toFixed(2));
	Plugin.CreateTimer("Announcement", tiempo).Start();
}

// Esto solo cuando se recarga este plugin
function On_PluginInit() {
    if (!Plugin.GetTimer("Announcement"))
        {
            var loco = NumeroRandom(2,10);
            var tiempo =  minutosAMilisegundos(Number(loco).toFixed(2));
            Server.Broadcast("Numero Random " + loco);
            Server.Broadcast("Tiempo " + tiempo);
            Plugin.CreateTimer("Announcement", tiempo).Start();
        }
        else {
            Plugin.KillTimer("Announcement");
            var loco = NumeroRandom(2,10);
            var tiempo =  minutosAMilisegundos(Number(loco).toFixed(2));
            //Server.Broadcast("Numero Random " + loco);
            //Server.Broadcast("Tiempo " + tiempo);
            Plugin.CreateTimer("Announcement", tiempo).Start();
        }
  }