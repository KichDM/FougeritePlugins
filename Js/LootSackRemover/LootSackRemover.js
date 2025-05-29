var Author = "KichDM";
var About = "Remove LootSack for deadbodys"
var Version = "1.0.0"

var Config = {
    Active: "null",
    Timer: 0,
    Distance: 0
};

function initt() {
    if (!Plugin.IniExists("config")) {
        var ini = Plugin.CreateIni("config");
        ini.AddSetting("Config", "Active", "True");
        ini.AddSetting("Config", "Timer", "900000");
        ini.AddSetting("Config", "Distance", "2");
        ini.Save();
    }
    var config = Plugin.GetIni("config");
    Config.Active = config.GetSetting("Config", "Active");
    Config.Timer = parseInt(config.GetSetting("Config", "Timer"));
    Config.Distance = parseFloat(config.GetSetting("Config", "Distance"));
}

function On_PluginInit() {
    initt();
}

function On_PlayerKilled(DeathEvent) {
    if (!Config.Active == "True")
        return;
    var victim = DeathEvent.Victim;
    if (victim != null && victim.UID != null) {
        FindSack(victim.Location, victim);
    }
}

function FindSack(vector3, Player) {
    var data = Plugin.CreateDict();
    var time = Util.ConvertToTime(Player.TimeOnline);
    data["Online"] = time;
    Plugin.CreateParallelTimer("mochila" + time, Config.Timer, data, function (evt) {
        var id = evt.Args["Online"];
        var obj = Util.FindClosestObject(vector3, parseFloat(Config.Distance));
        if (obj == null) {
            return;
        }
        else {
            var objName = obj.toString().ToLower();
            if (Util.ContainsString(objName, "lootsack")) {
                Util.DestroyObject(obj);

            }
            else {
                Plugin.KillParallelTimer("mochila" + id);
            }
        }
    });
}