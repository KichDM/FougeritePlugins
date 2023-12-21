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
    if (Player.Admin || PermissionSystem.PlayerHasPermission(Player, "admin"));
    {
    if (cmd == "cc") {
        if (args.Length <= 0) {
            Player.Message("[color#FF8000]/cc zone meters[color#FF0040]");
            Player.Message("[color#FF8000]/cc delete zone[color#FF0040]");
            Player.Message("[color#FF8000]/cc list[color#FF0040]");
            return;
        }
        if (args[0] == "list") {
                var tt = ini.Sections
                for (var seciones in tt) {
                    var loc = ini.GetSetting(seciones, "Loc" );
                    var metros = ini.GetSetting(seciones, "Metros");
                    Player.Message(seciones.toString() + " loc " + loc + " Meters " + parseInt(metros).toString());

                }
            }
        }
        if (args.Length < 1) {
            Player.Message("Add the meters");
            return;
        }
        var zona = args[0].toString();
        var metros = parseInt(args[1]);
        ini.AddSetting(zona, "Loc", Player.Location.toString());
        ini.AddSetting(zona, "Metros" ,metros);
        ini.Save();
        Player.Message("Zone Created " + zona + " with " + metros + " reach");
        return;
    }
}

function On_EntityDeployed(Player, Entity) {
   var item = Entity.Name;
   var playerloc = Player.Location;
    if (Player != null && Entity != null) {
        var ini = initt();
        var tt = ini.Sections
        for (var seciones in tt) {
            var zonaloc =  ini.GetSetting(seciones, "Loc");
            var radio =  ini.GetSetting(seciones, "Metros");
            var zonavector = Util.ConvertStringToVector3(zonaloc);
            var Dist = Util.GetVectorsDistance(playerloc, zonavector);
            var alejarse = (parseInt(radio) - Dist)
            if (Dist <= parseInt(radio))
            {
                Player.Message("[color#FF8000]You are in the area of [color#FF0040]" + seciones.toString() + "[color#FF8000]. You cannot build here. Move away [color#FF0040]" + alejarse.toFixed(0) + "[color#FF8000] meters.");
                Entity.Destroy();
                Player.Inventory.AddItem(item);
                Player.InventoryNotice("+1 " + StringFix(item));
                Player.Inventory.AddItem(StringFix(item),1);
            }
        }
    }
}

var fix = [["Campfire", "Camp Fire"], ["Barricade_Fence_Deployable", "Wood Barricade"], ["Large Wood Spike Wall", "Large Spike Wall"], ["Wood Box", "Wood Storage Box"], ["Wood Box Large", "Large Wood Storage"], ["Wood_Shelter", "Wood Shelter"], ["Metal Bars Window", "Metal Window Bars"], ["Wood Door Frame", "Wood Doorway"], ["Metal Door Frame", "Metal Doorway"], ["Wood Spike Wall", "Spike Wall"], ["Wood Window Frame", "Wood Window"], ["Metal Window Frame", "Metal Window"]];

function StringFix(str) {
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    for(var i=1; i < fix.length; i++){
        if(str==fix[0]){
            return fix[1];
		}
    	return str;
    }
}