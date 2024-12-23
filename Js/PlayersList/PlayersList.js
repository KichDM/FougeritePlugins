var Author = "KichDM";
var About = "List of Players on the server"
var Version = "1.0.0"

function On_Command(Player, cmd, args) {
    if (cmd == "players") {
        var players = Server.Players;
        var playerCount = players.Count;
        Player.Message(playerCount + "/100 players online:");
        var message = "";
        for (var i = 0; i < playerCount; i++) {
            var player = players[i];
            var playerName = "[color#00FF40]" + player.Name + "[color#001EFF]";
            if (i % 5 === 0 && i !== 0) {
                Player.Message(message);
                message = "";
            }
            message += (i % 5 === 0 ? "" : " [color#00FF40] ") + playerName;
            if (i % 5 !== 4 && i !== playerCount - 1) {
                message += " | ";
            }
        }
        if (message !== "") {
            Player.Message(message);
        }
    }
}
