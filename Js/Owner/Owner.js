var Author = "KichDM";
var About = "Sistema de sabes dueño estructuras"
var Version = "1.0.0"

var lightBlue = "[color#00b7eb]";
var yellow = "[color#FCFF02]";
var orange = "[color#CD8C00]";
var green = "[color#00FF40]";

function On_Command(Player, cmd, args) {
    cmd = Data.ToLower(cmd);
    if (cmd == "owner" || cmd == "owner" || cmd == "who") {
        var owner = DataStore.Get("OwnersON", Player.SteamID);
        if (owner != null || owner != undefined || owner) {
            DataStore.Remove("OwnersON", Player.SteamID);
            Player.Message(" Deactivated !");
        } else {
            Player.Message(lightBlue + "Activated! Hit the structure you want to know the owner of!");
            DataStore.Add("OwnersON", Player.SteamID, true);
        }
    }
}

function On_PlayerConnected(Player) {
    DataStore.Remove("OwnersON", Player.SteamID);
}

function On_EntityHurt(e) {
    var owner = DataStore.Get("OwnersON", e.Attacker.SteamID);
    if (e.Attacker != null && e.Entity != null) {
        if (e.Entity.IsStructure() || e.Entity.IsDeployableObject()) {
            if (owner) {
                var Owner = e.Entity.OwnerName;
                var player = e.Entity.Creator;
                var active = player.IsOnline;
                e.Attacker.Message(lightBlue + e.Entity.Name + green + " STRUCTURE CREATOR: " + yellow + Owner);
                if (active) {
                    e.Attacker.Message(lightBlue + green + "Is the house owner online? " + yellow + " [" + red + "YES, BE CAREFUL" + yellow + "]");
                } else {
                    e.Attacker.Message(lightBlue + green + "Is the house owner online? " + yellow + " [" + orange + "NO, TAKE ADVANTAGE" + yellow + "]");
                }
                DataStore.Remove("OwnersON", e.Attacker.SteamID);
            }
        }
    }
}