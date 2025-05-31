var Author = "KichDM";
var About = "Systemas de Kits"
var Version = "1.0.0"

var black = "[color #000000]";
var gray = "[color #424242]";
var lightGray = "[color #D8D8D8]";
var white = "[color #FFFFFF]";
var pink = "[color #F781F3]";
var purple = "[color #6A0888]";
var red = "[color #FF0000]";
var blue = "[color #001EFF]";
var green = "[color #00FF40]";
var lightBlue = "[color #00FFF7]";
var yellow = "[color #FCFF02]";
var orange = "[color #CD8C00]";
var brown = "[color #604200]";
var turquoise = "[color #00FFC0]";

var Kits = {
  "pvp": {
    "items": [
      ["Revolver", 1],
      ["9mm Ammo", 50],
      ["Large Medkit", 20]
    ],
    "cooldown": 1000,// 300000 Milliseconds
    "maxuses": 114, // with limit uses
    "rango": ["mod", "user"] // Ranks
  },

  "autokit": {
    "items": [
      ["Hatchet", 1],
      ["Cooked Chicken Breast", 200],
      ["Large Medkit", 10]
    ],
    "cooldown": 5,// Milliseconds
    "maxuses": -1, // infinite kit 
    "rango": ["mod", "user"] // Ranks
  }


  // Añadir mas kits
};

// Funcion que da los items de los kits de la lista
function darkit(player, kitName) {
  var items = Kits[kitName].items;
  for (var i = 0; i < items.length; i++) {
    var itemName = items[i][0];
    var itemAmount = items[i][1];
    player.Inventory.AddItem(itemName, itemAmount);
  }
  player.Message(lightBlue + "You have received the KIT " + yellow + kitName);
}

function arraytienepalabra(array, palabra) {
  return array.includes(palabra);
}

function On_Command(player, cmd, args) {
  if (cmd == "kit" || cmd == "kits") {
    if (args.Length == 0) {
      player.Message("[color #CD8C00]━━━━━━━━━━━━━━━━━━━━[color #00FFC0]◤[color #FFFFFF]KITS[color #00FFC0]◥[color #CD8C00]━━━━━━━━━━━━━━━━━━━━");
      var num = 0;
      var str = "";

      for (var kitName in Kits) {
        var listado = Kits[kitName].rango;
        var hasPermission = false;

        for (var i = 0; i < listado.length; i++) {
          if (PermissionSystem.PlayerHasGroup(player, listado[i])) {
            hasPermission = true;
            break;
          }
        }

        if (hasPermission) {
          if (str == "") {
            str = kitName + " ";
          } else {
            str = str + kitName + " ";
          }
          if (num == 4) {
            num = 0;
            var palabras = str.split(" ");
            var tt = palabras.join(yellow + " | " + lightBlue);
            player.Message(lightBlue + tt);
            str = "";
          } else {
            num++;
          }
        }
      }

      if (num != 0) {
        var palabras = str.split(" ");
        var lastIdx = palabras.length - 1;
        var tt = palabras.slice(0, lastIdx).join("[color #FCFF02] | [color #00FFF7]");
        tt += " " + palabras[lastIdx];
        player.Message("[color #00FFF7]" + tt);
      }
      player.Message("[color #CD8C00]━━━━━━━━━━━━━━━━━━━[color #00FFC0]◣[color #FFFFFF]KICHDM[color #00FFC0]◢[color #CD8C00]━━━━━━━━━━━━━━━━━━━");
      return;
    }

    var kitName = args[0];
    if (Kits[kitName] == null) {
      player.Message("That kit does not exist.")
      return;
    }
    var listado = Kits[kitName].rango;
    var hasPermission = false;
    for (var i = 0; i < listado.length; i++) {
      if (PermissionSystem.PlayerHasGroup(player, listado[i])) {
        hasPermission = true;
        break;
      }
    }

    if (!hasPermission) {
      player.Message("You cannot use this kit.");
      return;
    }
    var usosActuales = DataStore.Get(player.SteamID, kitName);
    var maxUsos = Kits[kitName].maxuses;
    if (usosActuales == null) {
      usosActuales = 0;
    }

    var waittime = Kits[kitName].cooldown;
    var time = DataStore.Get(kitName, player.SteamID);
    if (time == null) {
      time = 0;
    }
    var calc = System.Environment.TickCount - time;
    if (calc >= waittime) {
      DataStore.Add(kitName, player.SteamID, System.Environment.TickCount);
      if (maxUsos < 0) {
        darkit(player, kitName);
        return;
      }
      if (usosActuales >= maxUsos) {
        player.Message(lightBlue+"You have already reached the maximum number of uses for this kit. " + red +usosActuales + white + "/" +yellow + maxUsos);
        return;
      }
      usosActuales += 1;
      player.Message( lightBlue + "Kit  " + pink + kitName + lightBlue +" remaining: " + yellow + " [" + red +  (maxUsos - usosActuales) + yellow + "]");
      darkit(player, kitName);
      DataStore.Add(player.SteamID, kitName, usosActuales);
    }
    else {
      // Por si ocurre algún bug con la datastore y alguien tiene el tiempo en negativo
      if (time == undefined || time == null || calc < 0) {
        DataStore.Remove(kitName, player.SteamID);
        player.Message("[color#00FFFF]You had negative bugged time[color#FF8000]" + " use the command again!");
      }
      var remainingTime = (waittime - calc);
      var remainingSeconds = Math.ceil(remainingTime / 1000);
      player.Message("[color#00FFFF]You can use the kit again in [color#FF8000] " + remainingSeconds + " [color#00FFFF]seconds!");
    }
  }
}

function On_PluginInit() {
  getIni();
}

function getIni() {
  if (!Plugin.IniExists("RespawnKits")) {
    var test = Plugin.CreateIni("RespawnKits");
    test.AddSetting("config", "showrespawn", "true");
    test.AddSetting("config", "respawn", "Respawn Kit Recibido");
    test.AddSetting("kit", "item_name0", "Hunting Bow");
    // 30 - 35 Belt, 36 - 39 Armor (36 head), 0 - 29 Inventory
    test.AddSetting("kit", "item_amount0", 1);
    test.AddSetting("kit", "item_slot0", 30);
    test.AddSetting("kit", "item_name1", "Arrow");
    test.AddSetting("kit", "item_amount1", 5);
    test.AddSetting("kit", "item_slot1", 31);
    test.Save();
    return Plugin.GetIni("RespawnKits");
  }
}

// Default Kit when entering for the first time
function On_PlayerSpawned(Player, evt) {
  var ini = Plugin.GetIni("RespawnKits");
  Player.Inventory.RemoveItemAll("Rock");
  Player.Inventory.RemoveItemAll("Torch");
  Player.Inventory.RemoveItemAll("Bandage");
  if (Player.Inventory.FreeSlots >= 33) {
    if (ini.GetSetting("config", "showrespawn") == "true") {
      Player.Message(ini.GetSetting("config", "respawn"));
    }
    var itens = getItens();
    var count = 0;
    while (itens['item_name' + count] != null || itens['item_name' + count] != undefined) {
      if (!Player.Inventory.HasItem(itens['item_name' + count])) {
        Player.Inventory.AddItemTo(itens['item_name' + count], itens['item_slot' + count], itens['item_amount' + count]);
        count++
      }
      else {
        count++
      }
    }
  }
}

function On_PlayerConnected (Player) {
  PermissionSystem.CreatePermissionPlayer(Player);
  PermissionSystem.AddGroupToPlayer(Player.UID, "user");
  PermissionSystem.SaveToDisk();
}

function getItens() {
  var ini = Plugin.GetIni("RespawnKits");
  var items = [];
  var countItem = 0;
  while (ini.GetSetting("kit", "item_name" + countItem) != null) {
    items['item_name' + countItem] = ini.GetSetting("kit", "item_name" + countItem);
    items['item_amount' + countItem] = ini.GetSetting("kit", "item_amount" + countItem);
    items['item_slot' + countItem] = ini.GetSetting("kit", "item_slot" + countItem);
    countItem++;
  }
  return items;
}
