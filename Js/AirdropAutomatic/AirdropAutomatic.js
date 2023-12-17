var Author = "KichDM";
var About = "AutoSave / Airdrops Automaticos"
var Version = "1.0.0"

var verde = "[color #00FF40]";
var azulclaro = "[color #00FFF7]";
var amarillo = "[color #FCFF02]";



//Here to edit airdrop timer put in milliseconds! Default 2H
var airdroptimer = 7200000;
var lastairdrop = 0;
var ultimorestart = 0;

function On_PluginInit() {
    Plugin.KillTimer("Airdrop");
    lastairdrop = System.Environment.TickCount;
    Plugin.CreateTimer("Airdrop", airdroptimer).Start();
}

function NumeroRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function AirdropCallback() {
    Plugin.KillTimer("Airdrop");
    lastairdrop = System.Environment.TickCount;
    var players = Server.Players;
    var playerCount = players.Count;
    var randomIndex = Math.floor(Math.random() * playerCount);
    var randomPlayer = players[randomIndex];
    var Numerorandomepico = (NumeroRandom(100, 10))
    var airdropPosX = randomPlayer.X + parseFloat(Numerorandomepico);
    var airdropPosY = randomPlayer.Y;
    var airdropPosZ = randomPlayer.Z;
    var postt = Util.CreateVector(airdropPosX, airdropPosY, airdropPosZ);
    World.AirdropAt(postt, 1);
  //  Server.Broadcast("¡Un airdrop ha caído cerca de " + randomPlayer.Name + "!");
    Plugin.CreateTimer("Airdrop", airdroptimer).Start();
}

function On_Command(Player, cmd, args) {
    if (cmd == "airdrop") {
        var num = lastairdrop + airdroptimer;
        var num2 = num - System.Environment.TickCount;
        var timeSpan = System.TimeSpan.FromMilliseconds(num2);
        if (timeSpan < 0) {
            Plugin.KillTimer("Airdrop");
            lastairdrop = System.Environment.TickCount;
            Plugin.CreateTimer("Airdrop", airdroptimer).Start();
        }
        if (!Plugin.GetTimer("Airdrop")) {
            lastairdrop = System.Environment.TickCount;
            Plugin.CreateTimer("Airdrop", airdroptimer).Start();


            var text = "";
            text = text + timeSpan.Hours + " hours, ";
            text = text + timeSpan.Minutes + " minutes, and ";
            text = text + timeSpan.Seconds + " seconds";

            Player.Message(verde + "Next Airdrop in :   " + amarillo + text + verde);
        }
        else {
            var num = lastairdrop + airdroptimer;
            var num2 = num - System.Environment.TickCount;
            if (num2 < 0) {
                lastairdrop = System.Environment.TickCount;
                Plugin.KillTimer("Airdrop");
                Plugin.CreateTimer("Airdrop", airdroptimer).Start();
            }
            var text = "";
            text = text + timeSpan.Hours + " hours, ";
            text = text + timeSpan.Minutes + " minutes, and ";
            text = text + timeSpan.Seconds + " seconds";
            Player.Message(verde + "Next Airdrop in :   " + amarillo + text + verde);
        }
    }
}
