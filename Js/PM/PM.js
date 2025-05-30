var Author = "KichDM";
var About = "Sistema PM / Mensaje Privados";
var Version = "1.1.0";

var colors = {
    negro: "[color#000000]",
    gris: "[color#424242]",
    grisclaro: "[color#D8D8D8]",
    blanco: "[color#FFFFFF]",
    rosa: "[color#F781F3]",
    morado: "[color#6A0888]",
    rojo: "[color#FF0000]",
    azul: "[color#001EFF]",
    verde: "[color#00FF40]",
    azulclaro: "[color#00FFF7]",
    amarillo: "[color#FCFF02]",
    naranja: "[color#CD8C00]",
    marron: "[color#604200]",
    turquesa: "[color#00FFC0]"
};

function On_Command(Player, cmd, args) {
    switch (cmd) {
        case "pm":
            if (args.Length == 0) {
                Player.Message("\"/pm [PlayerName]\" jugador al que quieres enviarle un mensaje.");
                Player.Message("\"/r\" para responder al último mensaje recibido.");
                return;
            }
            var targetPlayer =  Player.Find(args[0]);
            if (targetPlayer == null || !targetPlayer.IsOnline) {
                Player.Notice("No hay jugadores en línea con ese nombre.");
                return;
            }
            if (targetPlayer == Player)
            {
                Player.Notice("No puedes enviarte un pm a ti mismo");
                return;
                
            }
            DataStore.Add("PM", Player.SteamID, targetPlayer.SteamID);
            SendMessage(Player, targetPlayer, argsToText(args,1));
            break;
        case "r":
            var lastTargetSteamID = DataStore.Get("PM", Player.SteamID);
            var lastTargetPlayer = Player.Find(lastTargetSteamID.toString());

            if (lastTargetPlayer == null || !lastTargetPlayer.IsOnline) {
                Player.Notice("El último jugador con el que hablaste está desconectado.");
                return;
            }
            DataStore.Add("PM", Player.SteamID, lastTargetPlayer.SteamID);
            SendMessage(Player, lastTargetPlayer, argsToText(args,0));
            break;
    }
}

function SendMessage(sender, receiver, message) {
    var senderName = sender.Name;
    receiver.MessageFrom("PM for " + senderName, colors.rosa + message);
    sender.MessageFrom("PM to " + receiver.Name , colors.amarillo + message);
}

function argsToText(args, inicio) {
    var text = "";
    if (args.Length == 1) {
        text = args[0];
    } else {
        for (var l = inicio; l < args.Length; l++) {
            if (l == args.Length - 1) {
                text += args[l];
            } else {
                text += args[l] + " ";
            }
        }
    }
    return text;
}