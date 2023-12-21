var Author = "KichDM";
var About = "Drop Loot Animals"
var Version = "1.0.0"

function On_NPCKilled(DeathEvent) {
    var vic = DeathEvent.Victim;
    var ini = Plugin.GetIni("Loot");
    if (ini.GetSetting("Loot", vic.Name.toString())) {
        var groundPosition = GetGround(vic.Location);
        var vector = Util.CreateVector(vic.X, groundPosition, vic.Z);
        World.Spawn(";drop_lootsack_zombie", vector);
    }
}

function GetGround(vector)
{
    vector = Util.CreateVector(vector.x, parseFloat(2000), vector.z);
    raycastHit =  UnityEngine.Physics.RaycastAll(vector,  UnityEngine.Vector3.down, parseFloat(2000))[0];
    return raycastHit.point.y;
}

function ini1() {
    if (!Plugin.IniExists("Loot")) {
        var ini = Plugin.CreateIni("Loot");
        ini.AddSetting("Loot", "Wolf", true);
        ini.AddSetting("Loot", "Bear", true);
        ini.AddSetting("Loot", "Boar", true);
        ini.AddSetting("Loot", "Chicken", true);
        ini.AddSetting("Loot", "Stag", true);
        ini.AddSetting("Loot", "Rabbit", true);
        ini.Save();
    }
    return Plugin.GetIni("Loot");
}

function On_PluginInit() {
    ini1();
}