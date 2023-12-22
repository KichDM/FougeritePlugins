var Author = "KichDM";
var About = "Zone Restriction";
var Version = "1.0.0";

function initt() {
    if (!Plugin.IniExists("bloqueos")) {
        Plugin.CreateIni("bloqueos");
    }
    return Plugin.GetIni("bloqueos");
}
function On_Command(Player, cmd, args) {
    cmd = Data.ToLower(cmd);
    var ini = initt();
    if (Player.Admin || PermissionSystem.PlayerHasPermission(Player, "admin")) {
        switch (cmd) {
            case "zone":
                if (args.Length <= 0) {
                    Player.Message("[color#FF8000]/zone create [zone] [meters]");
                    Player.Message("[color#FF8000]/zone delete [zone]");
                    Player.Message("[color#FF8000]/zone list");
                    return;
                }

                switch (args[0]) {
                    case "list":
                        var tt = ini.Sections;
                        for (var seciones in tt) {
                            var loc = ini.GetSetting(seciones, "Loc");
                            var metros = ini.GetSetting(seciones, "Metros");
                            Player.Message("[color#FF8000]Zone:[color#FF0040] " + seciones.toString() + " [color#FF8000]| Location:[color#FF0040] " + loc + " [color#FF8000]| Meters:[color#FF0040] " + parseInt(metros).toString());
                        }
                        break;

                    case "delete":
                        if (args.Length < 1) {
                            Player.Message("[color#FF8000]/zone delete [zone]");
                            return;
                        }

                        var loc = ini.DeleteSetting(args[1].toString(), "Loc");
                        var metros = ini.DeleteSetting(args[1].toString(), "Metros");
                        Player.Message("[color#FF8000]" + args[1] + "[color#FF0040] Zone deleted");
                        ini.Save();
                        break;

                    case "create":
                        if (args.Length < 2) {
                            Player.Message("[color#FF8000]/zone create [zone] [meters]");
                            return;
                        }

                        var zona = args[1].toString();
                        var metros = args.Length > 2 ? parseInt(args[2]) : 200;
                        ini.AddSetting(zona, "Loc", Player.Location.toString());
                        ini.AddSetting(zona, "Metros", metros);
                        ini.Save();
                        Player.Message("[color#00FF00]Zone Created[color#FF8000] " + zona + " [color#FF8000]with [color#FF0040]" + metros + "[color#FF8000] M Radius");
                        break;

                    default:
                        Player.Message("[color#FF8000]/zone create [zone] [meters]");
                        return;
                }
                break;
        }
    } else {
        Player.Message("You don't have the necessary permissions to use this command.");
    }
}

function On_EntityDeployed(Player, Entity) {
    var item = Entity.Name;
    var playerloc = Player.Location;

    if (Player != null && Entity != null) {
        var ini = initt();
        var tt = ini.Sections;
        var zonaNotificada = false;
        for (var seciones in tt) {
            var zonaloc = ini.GetSetting(seciones, "Loc");
            var radio = ini.GetSetting(seciones, "Metros");
            var zonavector = Util.ConvertStringToVector3(zonaloc);
            var Dist = Util.GetVectorsDistance(playerloc, zonavector);
            var alejarse = parseInt(radio) - Dist;

            if (Dist <= parseInt(radio) && !zonaNotificada) {
                Player.Message("[color#FF8000]You are in the area of [color#FF0040]" + seciones.toString() + "[color#FF8000]. You cannot build here. Move away [color#FF0040]" + alejarse.toFixed(0) + "[color#FF8000] meters.");
                Entity.Destroy();
                Player.InventoryNotice("+1 " + StringFix(item));
                Player.Inventory.AddItem(StringFix(item), 1);
                zonaNotificada = true;
            }
        }
    }
}

var fix = [["Campfire", "Camp Fire"], ["Barricade_Fence_Deployable", "Wood Barricade"], ["Large Wood Spike Wall", "Large Spike Wall"], ["Wood Box", "Wood Storage Box"], ["Wood Box Large", "Large Wood Storage"], ["Wood_Shelter", "Wood Shelter"], ["Metal Bars Window", "Metal Window Bars"], ["Wood Door Frame", "Wood Doorway"], ["Metal Door Frame", "Metal Doorway"], ["Wood Spike Wall", "Spike Wall"], ["Wood Window Frame", "Wood Window"], ["Metal Window Frame", "Metal Window"]];

function StringFix(str) {
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    for (var i = 1; i < fix.length; i++) {
        if (str == fix[0]) {
            return fix[1];
        }
        return str;
    }
}