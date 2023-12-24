var Author = "KichDM";
var About = "Easy Warps";
var Version = "1.0.0";

var white = "[color #FFFFFF]";
var red = "[color #FF0000]";
var blue = "[color #001EFF]";
var green = "[color #00FF40]";
var lightBlue = "[color #00FFF7]";
var yellow = "[color #FCFF02]";
var orange = "[color #CD8C00]";

function On_PluginInit() {
    Config();
}

function Config() {
    if (!Plugin.IniExists("Warps")) {
        var WARPS = Plugin.CreateIni("Warps");
        WARPS.Save();
    }
    return Plugin.GetIni("Warps");
}

function On_Command(Player, cmd, args) {
    cmd = Data.ToLower(cmd);
    klk = Config();
    var klktt = klk.Sections;
    var epicZones = [];
    if (Player.Admin || PermissionSystem.PlayerHasPermission(Player, "admin"));
    {
    if (cmd == "createw") {
        if (args.Length == 0) {
            Player.Message("Syntax /createw - Name - Meters (Default 200m)");
            return;
        }

        if (args.Length <= 1) {
            klk.AddSetting(args[0].toString(), "Zone", Player.Location.toString());
            klk.AddSetting(args[0].toString(), "Meters", 200);
            Player.Message("You have created the warp " + args[0] + " with default 200 meters.");
            klk.Save();
        } else {
            klk.AddSetting(args[0], "Zone", Player.Location.toString());
            klk.AddSetting(args[0], "Meters", args[1].toString());
            Player.Message("You have created the warp " + args[0].toString() + " with " + args[1].toString() + " meters.");
            klk.Save();
        }
    }

    if (cmd == "deletew") {
        if (args.Length == 0) {
            Player.Message("Syntax /deletew - name");
            return;
        }

        klk.DeleteSetting(args[0].toString(), "Zone");
        klk.DeleteSetting(args[0], "Meters");
        klk.Save();
        Player.Message(args[0].toString() + " Deleted!");
    }
}

    if (cmd == "t" || cmd == "warps" || cmd == "w" || cmd == "warp") {
        if (args.Length == 0) {
            Player.Message("━━━━━━━━━━━━━━━━━━━[color #00FFFF]◤[/color]" + "[color #FFFFFF]" + Server.server_message_name + " Warps [color #00FFFF]◥[/color]━━━━━━━━━━━━━━━━━━");
            for (var a in klktt) {
                epicZones.push(a);
            }
            Player.Message("[color #00FFF7]"+epicZones.join("[color #FFFFFF],[color #00FFF7] "));
            Player.Message("━━━━━━━━━━━━━━━━━━━[color #800080]◣[/color]" + "[color #FFFFFF] Warps By[color #FFD700] KichDM [/color][color #800080]◢[/color]━━━━━━━━━━━━━━━━━━");
            if (Player.Admin)
            {
            Player.Message("[color #00FF40] Syntax /createw - Name - Meters (Default 200m). To create new zone");
            Player.Message("[color #FF0000] Syntax /deletew - Name. To delete zone" );
            }
            return;
        }
    }

    for (var a in klktt) {
        if (cmd == a) {
            var time = DataStore.Get("WARPS1", Player.SteamID);
            var calc = System.Environment.TickCount - time;
            var remainingTime = 120000 - calc;
            if (calc >= 120000) {
                var comando = cmd;
                Player.Message("[color#00FFFF]You will be teleported in [color#FF8000]10s.");
                var aaa1 = Plugin.CreateDict();
                aaa1["PlayerID"] = Player.SteamID;
                Plugin.CreateParallelTimer("Warps", 10000, aaa1).Start();
                DataStore.Add(Player.SteamID, "Zone", comando);
                DataStore.Add("WARPS1", Player.SteamID, System.Environment.TickCount);
            } else {
                if (calc < 0) {
                    DataStore.Remove('WARPS1', Player.SteamID);
                    Player.Message("[color#00FFFF]You had negative time bug, use the command again!");
                    return;
                }
                var remainingSeconds = Math.ceil(remainingTime / 1000);
                Player.Message("[color #FCFF02] You must wait [color #CD8C00]" + remainingSeconds + " [color #FCFF02] seconds to use the [color #00FFF7] /" + cmd + " [color #FCFF02]  command.");
                return;
            }
            break;
        }
    }
}

function WarpsCallback(abc) {
    abc.Kill();
    var data = abc.Args;
    var playerID = data["PlayerID"];
    var Player = Server.FindPlayer(playerID);
    if (Player != null) {
        var zone = DataStore.Get(playerID, "Zone");
        var SpawnsINI = Config();
        var SpawnP = SpawnsINI.GetSetting(zone.toString(), "Zone");
        var vector = Util.ConvertStringToVector3(SpawnP);
        var M = SpawnsINI.GetSetting(zone.toString(), "Meters");
        var ir = RandomVector3(vector, parseFloat(M));
        Player.SafeTeleportTo(ir, true, true);
        Server.Broadcast("[COLOR#FF8000]" + Player.Name + "[COLOR#00FFFF]" + " went to " + zone + " using" + "[COLOR#ff0000] /" + zone);
        DataStore.Remove(playerID, "Zone");
    }
}

function RandomVector3(vector3, maxDistance) {
    var range = parseFloat(maxDistance);
    var offsetX = UnityEngine.Random.Range(-range, range);
    var offsetZ = UnityEngine.Random.Range(-range, range);
    vector3.x += offsetX;
    vector3.z += offsetZ;
    vector3.y += 5;
    return vector3;
}