var Author = "KichDM";
var About = "AntiVPN"
var Version = "1.0.0"

var ini = Plugin.GetIni("ByPassVPN");
var key = "";
function On_PlayerConnected(Player) {
    if (Player.IP == "127.0.0.1")
    {
        return;
    }
    var ini = Plugin.GetIni("ByPassVPN");
    var bypass = ini.GetSetting(BypassVPN, Player.SteamID);
    if (bypass) {
        return;
    }
    var url = "https://vpnapi.io/api/" + Player.IP + "?key=" + key;
    var JSONData = Web.GET(url);
    var jsonResponse = JSON.DeSerializeJsonToObject(JSONData);
    var ip = jsonResponse["ip"].ToString();
    var security = jsonResponse["security"];
    var vpn = security["vpn"];
    var proxy = security["proxy"];
    var tor = security["tor"];
    var relay = security["relay"];
    var location = jsonResponse["location"];
    var city = location["city"].ToString();
    var region = location["region"].ToString();
    var country = location["country"].ToString();
    var continent = location["continent"].ToString();
    var regionCode = location["region_code"].ToString();
    var countryCode = location["country_code"].ToString();
    var continentCode = location["continent_code"].ToString();
    var latitude = location["latitude"].ToString();
    var longitude = location["longitude"].ToString();
    var timeZone = location["time_zone"].ToString();
    var localeCode = location["locale_code"].ToString();
    var metroCode = location["metro_code"].ToString();
    var isInEuropeanUnion = location["is_in_european_union"].ToString();
    var network = jsonResponse["network"];
    var networkAddress = network["network"].ToString();
    var autonomousSystemNumber = network["autonomous_system_number"].ToString();
    var autonomousSystemOrganization = network["autonomous_system_organization"].ToString();
    if (proxy == true || vpn == true) {
        Server.Broadcast("Player Kicked " + Player.Name + " Maybe use VPN or Proxy");
        Player.Disconnect();
        }
}

function On_Command(player, cmd, args) {
    switch (cmd) {
        case "allowvpn":
            if ((player.Admin || PermissionSystem.PlayerHasPermission(player, "admin")) && args.Length >= 1) {
                var steamid = args[0].toString();
                ini.AddSetting("BypassVPN", steamid, true);
                player.Message(steamid + " Added to allowvpn list");
                ini.Save();
            } else {
                player.Message("[color#FF8000]allowvpn [steamid]");
            }
            break;

        case "removevpn":
            if ((player.Admin || PermissionSystem.PlayerHasPermission(player, "admin")) && args.Length >= 1) {
                var steamid = args[0].toString();
                ini.DeleteSetting("BypassVPN", steamid);
                ini.Save();
                player.Message(steamid + " removed from vpn whitelist");
            } else {
                player.Message("[color#FF8000]removevpn [steamid]");
            }
            break;

            case "vpnlist":
                if (player.Admin || PermissionSystem.PlayerHasPermission(player, "admin")) {
                    var klk = ini.EnumSection("BypassVPN");
                    var message = " ";
                    var count = 0;
            
                    for (var gente in klk) {
                        var lista = ini.GetSetting("BypassVPN", gente);
                        message += "[color #00FFF7]" + gente.ToString() + " == " + "[color #00FF40]" + lista + "[color #FFFFFF]";
                        if (count < klk.Length - 1) {
                            message += "[color #DAA520] | [color #FFFFFF]";
                        }           
                        count++;
                    }
                    player.MessageFrom("VPN Whitelist",message);
                }
                break;
    }
}

function ini1() {
    if (!Plugin.IniExists("ByPassVPN")) {
        var ini = Plugin.CreateIni("ByPassVPN");
        ini.Save();
    }
    return Plugin.GetIni("ByPassVPN");
}

function On_PluginInit() {
    ini1();
}