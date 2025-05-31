//* By KichDM 
var Author = "KichDM";
var About = "Sistema TOP/ KD"
var Version = "3.0.0"

var negro = "[color #000000]";
var gris = "[color #424242]";
var grisclaro = "[color #D8D8D8]";
var blanco = "[color #FFFFFF]";
var rosa = "[color #F781F3]";
var morado = "[color #6A0888]";
var rojo = "[color #FF0000]";
var azul = "[color #001EFF]";
var verde = "[color #00FF40]";
var azulclaro = "[color #00FFF7]";
var amarillo = "[color #FCFF02]";
var naranja = "[color #CD8C00]";
var marron = "[color #604200]";
var turquesa = "[color #00FFC0]";
var naranjab = "[color #FF6600]";
var Dorado = "[color #DAA520]";

function On_PlayerConnected(Player) {
    var PlayerINI = Plugin.GetIni("NVKD_Players");
    var steamID = Player.SteamID;
    PlayerINI.AddSetting(steamID, "Name", Player.Name);
    if (PlayerINI.GetSetting(steamID, "Kills") === null) {
        PlayerINI.AddSetting(steamID, "ID", Player.UID);
        var numericKeys = ["Kills", "Muertes", "Head", "Suicidios", "Recursos", "Animales", "Tiempo"];
        for (var i = 0; i < numericKeys.length; i++) {
            PlayerINI.AddSetting(steamID, numericKeys[i], 0);
        }
    }
    PlayerINI.Save();
}

function On_PlayerDisconnected(Player) {
    var getinifile = Plugin.GetIni("NVKD_Players");
    var guardado = getinifile.GetSetting(Player.SteamID, "Tiempo");
    var online = Player.TimeOnline;
    var sum = parseInt(guardado) + parseInt(online);
    getinifile.AddSetting(Player.SteamID, "Tiempo", sum);
    getinifile.Save();

}

function On_PluginInit() {
    if (!Plugin.IniExists("NVKD_Players")) {
        Plugin.CreateIni("NVKD_Players");
    }
}

function BD(bodyp) {
    var ini = Bodies();
    var name = ini.GetSetting("bodyparts", bodyp);
    return name;
}

function Bodies() {
    if (!Plugin.IniExists("bodyparts"))
        Plugin.CreateIni("bodyparts");
    return Plugin.GetIni("bodyparts");
}

function On_Command(Player, cmd, args) {
    cmd = Data.ToLower(cmd);
    if (cmd == "rank" || cmd == "ranks") {
        Player.Message(naranjab + "--------- KichDM - KD - Comandos --------");
        Player.Message(naranjab + "Use " + blanco + "/rank" + naranjab + " to see the top 10");
        Player.Message(naranjab + "Use " + blanco + "/stats" + naranjab + " to view your stats");
        Player.Message(naranjab + "Use " + blanco + "/stats {player}" + naranjab + " (view the stats of a player)");
        Player.Message(naranjab + "Use " + blanco + "/kills" + naranjab + " for your kills");
        Player.Message(naranjab + "Use " + blanco + "/deaths" + naranjab + " for your deaths");
        Player.Message(naranjab + "Use " + blanco + "/kd" + naranjab + " to see your KD");
        return;
    }
    if (cmd == "kills" || cmd == "baja" || cmd == "bajas") {
        KDkill(Player);
        return;
    }
    if (cmd == "muertes" || cmd == "muerte" || cmd == "deaths" || cmd == "death") {
        KDMuertes(Player);
        return;
    }
    if (cmd == "kd") {
        KDtt(Player);
        return;
    }
    if (cmd == "stats") {
        if (args.Length == 0) {
            showStats(Player, Player);
            return;
        }
        if (args[0] != null) {
            var jugador = Player.Find(args[0]);
            Player.Message("[COLOR#ff5b3a] " + jugador.Name + " Player Found.!");
            showStats(Player, jugador);
            return;
        }
    }
    if (cmd == "rank" || cmd == "top") {
        Ranking(Player);
        return;
    }
    return;
}

function IsAnimal(killer) {
    switch (killer) {
        case 'Wolf':
        case 'Bear':
        case 'MutantWolf':
        case 'MutantBear':
            return true;
        default:
            return false;
    }
}

function On_PlayerKilled(DeathEvent) {
    if (!IsAnimal(DeathEvent.Attacker.Name)) {
        var ini = Plugin.GetIni("NVKD_Players");
        var killer = DeathEvent.Attacker.Name;
        var victim = DeathEvent.Victim.Name;
        var weapon = DeathEvent.WeaponName;
        var distance = Util.GetVectorsDistance(DeathEvent.Attacker.Location, DeathEvent.Victim.Location);
        var number = Number(distance).toFixed(2);
        var bodyPart = BD(DeathEvent.DamageEvent.bodyPart);
        function safeNum(val) {
            val = parseFloat(val);
            if (isNaN(val) || !isFinite(val)) {
                return 0;
            }
            return val;
        }
        function calculateKD(kills, deaths) {
            kills = safeNum(kills);
            deaths = safeNum(deaths);
            if (deaths == 0) {
                return kills.toFixed(2);
            }
            var kd = kills / deaths;
            if (!isFinite(kd) || kd <= 0) {
                return kills.toFixed(2);
            }
            return kd.toFixed(2);
        }
        var VicMuerte = ini.GetSetting(DeathEvent.Victim.SteamID, "Muertes");
        var Vickill = ini.GetSetting(DeathEvent.Victim.SteamID, "Kills");
        var Vickd = calculateKD(Vickill, VicMuerte);
        var AtcMuerte = ini.GetSetting(DeathEvent.Attacker.SteamID, "Muertes");
        var Atckill = ini.GetSetting(DeathEvent.Attacker.SteamID, "Kills");
        var Atckd = calculateKD(Atckill, AtcMuerte);
        var headParts = ["Head", "Scalp", "Nostrils", "Jaw", "TongueRear", "TongueFront", "Brain"];
        var isHeadshot = false;
        for (var i = 0; i < headParts.length; i++) {
            if (bodyPart == headParts[i]) {
                isHeadshot = true;
                break;
            }
        }
        if (isHeadshot) {
            var cabeza = ini.GetSetting(DeathEvent.Attacker.SteamID, "Head");
            cabeza = safeNum(cabeza);
            ini.AddSetting(DeathEvent.Attacker.SteamID, "Head", cabeza + 1);
            ini.Save();
        }
        var zona = this.FindLocationName(DeathEvent.Victim);
        if (victim != killer) {
            Server.Broadcast(
                amarillo + "[" + Atckd + "]" + azulclaro + killer + blanco + " killed " +
                amarillo + "[" + Vickd + "]" + azulclaro + victim + blanco + " | " +
                azulclaro + weapon + blanco + " with " +
                azulclaro + number + blanco + " meters " +
                rojo + bodyPart + blanco + " [" + Dorado + zona + blanco + "]"
            );
        } else {
            Server.Broadcast(
                amarillo + "[" + Vickd + "]" + azulclaro + victim + rojo + " has committed suicide"
            );
        }
        if (DeathEvent.Attacker.SteamID !== undefined) {
            killBoard(DeathEvent.Attacker, DeathEvent.Victim);
        }
    }
}

function killBoard(Attacker, Victim) {
    var NVKDpl = Plugin.GetIni("NVKD_Players");
    function getStat(steamID, key) {
        return parseInt(NVKDpl.GetSetting(steamID, key)) || 0;
    }
    if (Victim.SteamID === Attacker.SteamID) {
        var suicides = getStat(Victim.SteamID, "Suicidios") + 1;
        var deaths = getStat(Victim.SteamID, "Muertes") + 1;
        NVKDpl.SetSetting(Victim.SteamID, "Suicidios", suicides);
        NVKDpl.SetSetting(Victim.SteamID, "Muertes", deaths);

    } else {
        var kills = getStat(Attacker.SteamID, "Kills") + 1;
        var deaths = getStat(Victim.SteamID, "Muertes") + 1;
        NVKDpl.SetSetting(Attacker.SteamID, "Kills", kills);
        NVKDpl.SetSetting(Victim.SteamID, "Muertes", deaths);
    }
    NVKDpl.Save();
}

function Ranking(Player) {
    Player.Message(amarillo + "━━━━━━━━━━━━━━━━━━━" + morado + "◤" + blanco + "TOP PVP" + morado + "◥" + amarillo + "━━━━━━━━━━━━━━━━━━━");
    var ini = Plugin.GetIni("NVKD_Players");
    var killsA = [];
    var sections = ini.Sections;
    for (var section in sections) {
        var killsStr = ini.GetSetting(section, "Kills");
        var kills = parseInt(killsStr, 10) || 0;
        killsA.push([section, kills]);
    }
    killsA.sort(function (a, b) {
        return b[1] - a[1];
    });
    var listado = 1;
    for (var i = 0; i < killsA.length && listado <= 10; i++) {
        var steamID = killsA[i][0];
        var kills = killsA[i][1];
        if (kills <= 0) continue;
        var name = ini.GetSetting(steamID, "Name") || "Unknown";
        var deathsStr = ini.GetSetting(steamID, "Muertes");
        var deaths = parseInt(deathsStr, 10) || 0;
        var KD = deaths > 0 ? (kills / deaths) : kills;
        KD = isNaN(KD) || !isFinite(KD) ? kills : KD;
        KD = KD.toFixed(2);
        var nameColor = naranjab;
        if (i === 0) nameColor = morado;
        else if (i === 1 || i === 2) nameColor = Dorado;
        var targetPlayer = Server.FindPlayer(steamID);
        if (targetPlayer !== null) {
            var uid = targetPlayer.UID;
            if (i === 0) {
                if (!PermissionSystem.PlayerHasGroup(uid, "mito")) {
                    PermissionSystem.AddGroupToPlayer(uid, "mito");
                }
                PermissionSystem.RemoveGroupFromPlayer(uid, "top");
            } else if (i === 1 || i === 2) {
                if (PermissionSystem.PlayerHasGroup(uid, "mito")) {
                    PermissionSystem.RemoveGroupFromPlayer(uid, "mito");
                }
                PermissionSystem.AddGroupToPlayer(uid, "top");
            } else {
                PermissionSystem.RemoveGroupFromPlayer(uid, "mito");
                PermissionSystem.RemoveGroupFromPlayer(uid, "top");
            }
        }
        Player.Message(
            azulclaro + "#" + listado + blanco + " | " +
            nameColor + name + blanco + " | " +
            verde + kills + blanco + " Kill(s) | " +
            rojo + deaths + blanco + " Death(s) | " +
            amarillo + KD + blanco + " KD"
        );
        listado++;
    }
    Player.Message(amarillo + "━━━━━━━━━━━━━━━━━━━" + morado + "◣" + blanco + "TOP PVP" + morado + "◢" + amarillo + "━━━━━━━━━━━━━━━━━━━");
}


function KDkill(Player) {
    var NVKDpl = Plugin.GetIni("NVKD_Players");
    var kills = parseInt(NVKDpl.GetSetting(Player.SteamID, "Kills")) || 0;
    Player.Message(rojo + "➤" + blanco + "[color #FF6600]Kills: " + verde + kills);
}

function KDMuertes(Player) {
    var NVKDpl = Plugin.GetIni("NVKD_Players");
    var deaths = parseInt(NVKDpl.GetSetting(Player.SteamID, "Muertes")) || 0;
    Player.Message(rojo + "➤" + blanco + "[color #FF6600]Deaths: " + rojo + deaths);
}

function KDtt(Player) {
    var NVKDpl = Plugin.GetIni("NVKD_Players");
    var kills = parseInt(NVKDpl.GetSetting(Player.SteamID, "Kills")) || 0;
    var deaths = parseInt(NVKDpl.GetSetting(Player.SteamID, "Muertes")) || 0;
    var kd = deaths > 0 ? (kills / deaths).toFixed(2) : kills;
    if (kd === "Infinity" || kd <= 0 || isNaN(kd)) {
        kd = kills;
    }
    Player.Message(rojo + "➤" + blanco + "You have a KD of " + "[color #FF6600]" + kd + blanco + ".");
}

function showStats(viewer, target) {
    var NVKDpl = Plugin.GetIni("NVKD_Players");
    function getStat(key) {
        var val = NVKDpl.GetSetting(target.SteamID, key);
        return val == undefined || val == null ? 0 : parseInt(val);
    }
    var kills = getStat("Kills");
    var deaths = getStat("Muertes");
    var suicides = getStat("Suicidios");
    var heads = getStat("Head");
    var totalTime = getStat("Tiempo");
    var kd = deaths > 0 ? (kills / deaths).toFixed(2) : kills;
    if (kd === "Infinity" || kd <= 0 || isNaN(kd)) kd = kills;
    var porcentajeHS = kills > 0 ? (heads / kills) * 100 : 0;
    var segsOnline = ((target.TimeOnline / 1000) % 60).toFixed();
    var minsOnline = ((target.TimeOnline / 60000) % 60).toFixed();
    var hoursOnline = (target.TimeOnline / 3600000).toFixed();
    var tiempoTotal = convertirMilisegundos(parseInt(totalTime) + parseInt(target.TimeOnline));
    viewer.Message(amarillo + "━━━━━━━━━━━━━━━━━━━" + morado + "◤" + blanco + " STATS" + morado + "◥" + amarillo + "━━━━━━━━━━━━━━━━━━━");
    if (viewer.SteamID == target.SteamID) {
        viewer.Message(morado + "➤ " + blanco + "HEALTH: " + verde + target.Health + grisclaro + " | IP ADDRESS: " + amarillo + target.IP);
        viewer.Message(morado + "➤ " + blanco + "NAME: " + naranjab + target.Name + grisclaro + " | PING: " + azulclaro + target.Ping + grisclaro + " | UID: " + rosa + target.SteamID);
        viewer.Message(morado + "➤ " + blanco + "CURRENT LOCATION: " + turquesa + "X: " + Math.round(target.X) + ", Y: " + Math.round(target.Y) + ", Z: " + turquesa + Math.round(target.Z));
    } else {
        viewer.Message(morado + "➤ " + blanco + "NAME: " + naranjab + target.Name);
        viewer.Message(morado + "➤ " + blanco + "PING: " + azulclaro + target.Ping);
    }
    viewer.Message(morado + "➤ " + blanco + "TIME ONLINE: " + azulclaro + hoursOnline + " hours, " + verde + minsOnline + " minutes, " + amarillo + segsOnline + " seconds");
    viewer.Message(morado + "➤ " + blanco + "TOTAL TIME: " +
        azulclaro + tiempoTotal.horas + " hours, " +
        verde + tiempoTotal.minutos + " minutes, " +
        amarillo + tiempoTotal.segundos + " seconds");
    viewer.Message(morado + "➤ " + blanco + "Kills: " + verde + kills + grisclaro + " | KD: " + amarillo + kd + blanco + " | HS : " + Dorado + heads + " (" + porcentajeHS.toFixed(2) + "%)");
    viewer.Message(morado + "➤ " + blanco + "Deaths: " + rojo + deaths + grisclaro + " | Suicides: " + rosa + suicides);
    viewer.Message(amarillo + "━━━━━━━━━━━━━━━━━━━" + morado + "◣" + blanco + " STATS" + morado + "◢" + amarillo + "━━━━━━━━━━━━━━━━━━━");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertirMilisegundos(ms) {
    var segundos = Math.floor(ms / 1000);
    var minutos = Math.floor(segundos / 60);
    var horas = Math.floor(minutos / 60);
    segundos = segundos % 60;
    minutos = minutos % 60;
    var resultado = {
        horas: horas,
        minutos: minutos,
        segundos: segundos
    };
    return resultado;
}

function FindLocationName(player) {
    var locationsList = GetLocList();
    var vector = Util.CreateVector2(player.X, player.Z);
    var closestLocation = null;
    var closestDistance = 9999999;
    for (var loc in locationsList) {
        var locVector = loc.split(',');
        var locX = parseFloat(locVector[0]);
        var locZ = parseFloat(locVector[1]);
        var distance = Util.GetVector2sDistance(vector, Util.CreateVector2(locX, locZ));

        if (distance < closestDistance) {
            closestDistance = distance;
            closestLocation = locationsList[loc];
        }
    }
    if (closestLocation == null) {
        return "No nearby location found.";
    }
    return closestLocation;
}

function GetLocList() {
    return {
        '5907,-1848': 'Hacker Valley South',
        '5268,-1961': 'Hacker Mountain South',
        '5268,-2700': 'Hacker Valley Middle',
        '4529,-2274': 'Hacker Mountain North',
        '4416,-2813': 'Hacker Valley North',
        '3208,-4191': 'Wasteland North',
        '6433,-2374': 'Wasteland South',
        '4942,-2061': 'Wasteland East',
        '3827,-5682': 'Wasteland West',
        '3677,-4617': 'Sweden',
        '5005,-3226': 'Everust Mountain',
        '4316,-3439': 'North Everust Mountain',
        '5907,-2700': 'South Everust Mountain',
        '6825,-3038': 'Metal Valley',
        '7185,-3339': 'Metal Mountain',
        '5055,-5256': 'Metal Hill',
        '5268,-3665': 'Resource Mountain',
        '5531,-3552': 'Resource Valley',
        '6942,-3502': 'Resource Hole',
        '6659,-3527': 'Resource Road',
        '5494,-5770': 'Beach',
        '5108,-5875': 'Beach Mountain',
        '5501,-5286': 'Coast Valley',
        '5750,-4677': 'Coast Mountain',
        '6120,-4930': 'Coast Resource',
        '6709,-4730': 'Secret Mountain',
        '7085,-4617': 'Secret Valley',
        '6446,-4667': 'Factory Radtown',
        '6120,-3452': 'Small Radtown',
        '5218,-4800': 'Big Radtown',
        '6809,-4304': 'Hangar',
        '6859,-3865': 'Tanks',
        '6659,-4028': 'Civilian Forest',
        '6346,-4028': 'Civilian Mountain',
        '6120,-4404': 'Civilian Road',
        '4316,-5682': 'Ballzack Mountain',
        '4720,-5660': 'Ballzack Valley',
        '4742,-5143': 'Spain Valley',
        '4203,-4570': 'Portugal Mountain',
        '4579,-4637': 'Portugal',
        '4842,-4354': 'Lone Tree Mountain',
        '5368,-4434': 'Forest',
        '5907,-3400': 'Rad-Town Valley',
        '4955,-3900': 'Next Valley',
        '5674,-4048': 'Silk Valley',
        '5995,-3978': 'French Valley',
        '7085,-3815': 'Ecko Valley',
        '7348,-4100': 'Ecko Mountain',
        '6396,-3428': 'Zombie Hill',
        '6600,-1400': 'Bandit Valley',
        '3800,-2600': 'Base Camp Ridge',
        '4250,-3850': 'North Valley',
        '0,0': 'Middle of Nowhere',
        '-2650,5200': 'Yosemite Valley',
        '-5825,-165': 'Crater Valley'
    };
}