var Author = "KichDM";
var About = "Staff Chat";
var Version = "1.0.0";


var C = {
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
// No tocar la var activocolor
var activocolor = {}

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

function On_Command(player, cmd, args) {
    cmd = Data.ToLower(cmd);
    var steamID = player.SteamID;
    if (cmd == "ac" && PermissionSystem.PlayerHasGroup(player, "Admin") || player.Admin) {
        var activo = DataStore.Get("AdminChat", steamID);
        if (args.Length == 0) {
            var nuevoEstado = !activo;
            DataStore.Add("AdminChat", steamID, nuevoEstado);
            player.MessageFrom("AdminChat", "AdminChat 2.0");
            player.MessageFrom("AdminChat", "---------- Estado: " + (nuevoEstado ? "ON" : "OFF") + " ----------");
            player.MessageFrom("AdminChat", "Usa '/ac texto' para chatear con los admins.");
            player.MessageFrom("AdminChat", "Usa '/ac' para alternar entre ON y OFF.");
            player.MessageFrom("AdminChat", "Usa '/ac color' para cambiar el color del chat (hex o nombre).");
            return;
        }
        if (args[0] == "color") {
            if (args.Length == 1) {
                player.MessageFrom("AdminChat", "Colores disponibles:");
                for (var key in C) {
                    var color = C[key];
                    player.Message(color + key);
                }
                player.MessageFrom("AdminChat", "Usa: /ac color <nombre> para elegir.");
            } else {
                var nombre = args[1].toLowerCase();
                if (C.hasOwnProperty(nombre)) {
                    if (activocolor.hasOwnProperty(steamID)) {
                        delete activocolor[steamID];
                    }
                    activocolor[steamID] = C[nombre];
                    player.MessageFrom("AdminChat", C[nombre] + "Color del adminchat cambiado a: " + nombre);
                } else {
                    player.MessageFrom("AdminChat", C.rojo + "Color no válido. Usa '/ac color' para ver la lista.");
                }
            }
        }
        else {
            sendAdminText(player.Name, argsToText(args, 0))
        }
    }
}

function sendAdminText(name, text) {
    for (var pl in Server.Players) {
        if (pl.Admin) {
        var col = activocolor[pl.SteamID];
        if (!col)
        col = "[color#FF0000]";
        pl.MessageFrom("[AdminChat] " + name, col + text);
        }
    }
}

function On_Chat(pla, chat) {
    var activo = DataStore.Get("AdminChat", pla.SteamID);
    if (activo) {
        var a = chat.OriginalMessage;
        var b = a.replace(/[^a-zA-Z0-9 :,._\-\/!$%()=?ñÑáéíóúÁÉÍÓÚüÜ¡¿àÀèÈìÌòÒùÙäÄëËïÏöÖÿŸâÂêÊîÎôÔûÛãÃõÕçÇ<>]/g, '');
        var sysname = pla.Name;
        Text = b;
        pla.NewText = "    ";
        Text = Text.replace('""', '')
        sendAdminText(sysname, Text);
        chat.NewText = "    ";
    }
}