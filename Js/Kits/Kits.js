var Author = "KichDM";
var About = "Kits System"
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

function On_PlayerConnected (Player) {
  PermissionSystem.CreatePermissionPlayer(Player);
  PermissionSystem.AddGroupToPlayer(Player.UID, "user");
  PermissionSystem.SaveToDisk();
}

var Kits = {
    "pvp": {
        "items": [
            ["Revolver", 1],
            ["9mm Ammo", 50],
            ["Small Medkit", 3]
        ],
        "cooldown": 65000 ,// Milliseconds
        "rango": ["mod","user"] // Ranks
    },
    "indio": {
        "items": [
            ["Hunting Bow", 1],
            ["Arrow", 15]
        ],
        "cooldown": 30000 ,// Milliseconds
        "rango": ["mod","user"] // Ranks
        
    },
    "casa": {
        "items": [
            ["Wood Ceiling", 2],
            ["Wood Doorway", 2],
            ["Wood Foundation", 2],
            ["Wood Pillar", 6],
            ["Wood Wall", 5],
            ["Wooden Door", 1],
            ["Metal Door", 1],
            ["Workbench", 1],
            ["Large Wood Storage", 1],
            ["Furnace", 1]
        ],
        "cooldown": 32400000 ,// Milliseconds
        "rango": ["mod","user"] // Ranks
    },
    "madera": {
      "items": [
          ["Kevlar Boots", 4],
          ["Kevlar Helmet", 4],
          ["Kevlar Pants", 4],
          ["Kevlar Vest", 4],
          ["556 Ammo", 750],
          ["9mm Ammo", 750],
          ["Large Medkit", 20],
          ["M4", 4]
      ],
      "cooldown": 32400000 ,// Milliseconds 9h
      "rango": ["admin","vip4"] // Ranks
  },
  "madera1": {
    "items": [
        ["Holo sight", 6],
        ["P250", 6],
        ["MP5A4", 4],
        ["Bolt Action Rifle", 2],
        ["Explosive Charge", 10],
        ["Supply Signal", 2]
    ],
    "cooldown": 32400000 ,// Milliseconds
    "rango": ["admin","vip4"] // Ranks
},
  "bronce": {
    "items": [
      ["Kevlar Boots", 4],
      ["Kevlar Helmet", 4],
      ["Kevlar Pants", 4],
      ["Kevlar Vest", 4],
      ["556 Ammo", 750],
      ["9mm Ammo", 750],
      ["Large Medkit", 20],
      ["M4", 4]
    ],
    "cooldown": 32400000 ,// Milliseconds
    "rango": ["admin","vip3"] // Ranks
},
"bronce1": {
  "items": [
    ["Holo sight", 6],
    ["P250", 6],
    ["MP5A4", 4],
    ["Bolt Action Rifle", 2],
    ["Explosive Charge", 30],
    ["Supply Signal", 6]
  ],
  "cooldown": 32400000 ,// Milliseconds
  "rango": ["admin","vip3"] // Ranks
},
"bronce2": {
  "items": [
    ["Gunpowder", 1000],
    ["Explosives", 100],
    ["Low Quality Metal", 500],
    ["Wood Planks", 500],
    ["Weapon Part 1", 2],
    ["Weapon Part 2", 2],
    ["Weapon Part 3", 2],
    ["Weapon Part 4", 2],
    ["Weapon Part 5", 2],
    ["Weapon Part 6", 2],
    ["Weapon Part 7", 2]
  ],
  "cooldown": 324000000 ,// Milliseconds
  "rango": ["admin","vip3"] // Ranks
},
"hierro": {
  "items": [
    ["Kevlar Boots", 4],
    ["Kevlar Helmet", 4],
    ["Kevlar Pants", 4],
    ["Kevlar Vest", 4],
    ["556 Ammo", 750],
    ["9mm Ammo", 750],
    ["Large Medkit", 20],
    ["M4", 4]
  ],
  "cooldown": 32400000 ,// Milliseconds
  "rango": ["admin","vip2"] // Ranks
},
"hierro1": {
  "items": [
    ["Holo sight", 6],
    ["P250", 6],
    ["MP5A4", 4],
    ["Bolt Action Rifle", 2],
    ["Explosive Charge", 30],
    ["Supply Signal", 6]
  ],
  "cooldown": 32400000 ,// Milliseconds
  "rango": ["admin","vip2"] // Ranks
},
"hierro2": {
  "items": [
    ["Gunpowder", 1000],
    ["Explosives", 300],
    ["Low Quality Metal", 400],
    ["Wood Planks", 500],
    ["Weapon Part 1", 3],
    ["Weapon Part 2", 3],
    ["Weapon Part 3", 3],
    ["Weapon Part 4", 3],
    ["Weapon Part 5", 3],
    ["Weapon Part 6", 3],
    ["Weapon Part 7", 3]
  ],
  "cooldown": 32400000 ,// Milliseconds
  "rango": ["admin","vip2"] // Ranks
},
"hierro3": {
  "items": [
    ["Metal Ceiling", 30],
    ["Metal Doorway", 30],
    ["Metal Foundation", 30],
    ["Metal Pillar", 30],
    ["Metal Ramp", 30],
    ["Metal Stairs", 30],
    ["Metal Wall", 30],
    ["Metal Window", 30]
  ],
  "cooldown": 32400000 ,// Milliseconds
  "rango": ["admin","vip2"] // Ranks
},
"oro": {
  "items": [
    ["Kevlar Boots", 4],
    ["Kevlar Helmet", 4],
    ["Kevlar Pants", 4],
    ["Kevlar Vest", 4],
    ["556 Ammo", 750],
    ["9mm Ammo", 750],
    ["Large Medkit", 20],
    ["M4", 4]
  ],
  "cooldown": 21600000 ,// Milliseconds
  "rango": ["admin","vip1"] // Ranks
},
"oro1": {
  "items": [
    ["Holo sight", 6],
    ["P250", 6],
    ["MP5A4", 4],
    ["Bolt Action Rifle", 2],
    ["Explosive Charge", 30],
    ["Supply Signal", 6]
  ],
  "cooldown": 21600000 ,// Milliseconds
  "rango": ["admin","vip1"] // Ranks
},
"oro2": {
  "items": [
    ["Gunpowder", 2000],
    ["Explosives", 400],
    ["Low Quality Metal", 600],
    ["Wood Planks", 600],
    ["Weapon Part 1", 4],
    ["Weapon Part 2", 4],
    ["Weapon Part 3", 4],
    ["Weapon Part 4", 4],
    ["Weapon Part 5", 4],
    ["Weapon Part 6", 4],
    ["Weapon Part 7", 4]
  ],
  "cooldown": 21600000 ,// Milliseconds
  "rango": ["admin","vip1"] // Ranks
},
"oro3": {
  "items": [
    ["Metal Ceiling", 60],
    ["Metal Doorway", 60],
    ["Metal Foundation", 60],
    ["Metal Pillar", 60],
    ["Metal Ramp", 60],
    ["Metal Stairs", 60],
    ["Metal Wall", 60],
    ["Metal Window", 60],
    ["Explosive Charge", 30],
    ["Supply Signal", 6]
  ],
  "cooldown": 21600000 ,// Milliseconds
  "rango": ["admin","vip1"] // Ranks
},
"diamante": {
  "items": [
    ["Kevlar Boots", 4],
    ["Kevlar Helmet", 4],
    ["Kevlar Pants", 4],
    ["Kevlar Vest", 4],
    ["556 Ammo", 750],
    ["9mm Ammo", 750],
    ["Large Medkit", 20],
    ["M4", 4]
  ],
  "cooldown": 14400000 ,// Milliseconds
  "rango": ["admin","vip"] // Ranks
},
"diamante1": {
  "items": [
    ["Holo sight", 6],
    ["P250", 6],
    ["MP5A4", 4],
    ["Bolt Action Rifle", 2],
    ["Explosive Charge", 30],
    ["Supply Signal", 6]
  ],
  "cooldown": 14400000 ,// Milliseconds
  "rango": ["admin","vip"] // Ranks
},
"diamante2": {
  "items": [
    ["Gunpowder", 2000],
    ["Explosives", 400],
    ["Low Quality Metal", 600],
    ["Wood Planks", 600],
    ["Weapon Part 1", 5],
    ["Weapon Part 2", 5],
    ["Weapon Part 3", 5],
    ["Weapon Part 4", 5],
    ["Weapon Part 5", 5],
    ["Weapon Part 6", 5],
    ["Weapon Part 7", 5],
    ["M4", 7]
  ],
  "cooldown": 14400000 ,// Milliseconds
  "rango": ["admin","vip"] // Ranks
},
"diamante3": {
  "items": [
    ["Metal Ceiling", 160],
    ["Metal Doorway", 160],
    ["Metal Foundation", 160],
    ["Metal Pillar", 160],
    ["Metal Ramp", 160],
    ["Metal Stairs", 160],
    ["Metal Wall", 160],
    ["Metal Window", 160],
    ["Explosive Charge", 40],
    ["Supply Signal", 8]
  ],
  "cooldown": 14400000 ,// Milliseconds
  "rango": ["admin","vip"] // Ranks
},
    "admin": {
      "items": [
          ["Kevlar Boots", 1],
          ["Kevlar Helmet", 1],
          ["Kevlar Pants", 1],
          ["Kevlar Vest", 1],
          ["M4", 1],
          ["Large Medkit", 10],
          ["Holo sight", 1],
          ["556 Ammo", 200]

      ],
      "cooldown": 32400000 ,// Milliseconds
      "rango": ["admin"] // Ranks
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
        player.Message(yellow + "Available Kits:");
        var num = 0;
        var str = "";
  
        for (var kitName in Kits) {
          var listado = Kits[kitName].rango;
          var hasPermission = false;
  
          for (var i = 0; i < listado.length; i++) {
            if (PermissionSystem.PlayerHasGroup(player,listado[i])) {
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
          var tt = palabras.join(yellow + " | " + lightBlue);
          player.Message(lightBlue + tt);
        }
  
        player.Message(yellow + "~~~~~~~~~ Kits System by " + red + "KichDM " + yellow + "~~~~~~~~~");
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
        if (PermissionSystem.PlayerHasGroup(player,listado[i])) {
          hasPermission = true;
          break;
        }
      }
  
      if (!hasPermission) {
        player.Message("You cannot use this kit.");
        return;
      }
  
      var waittime = Kits[kitName].cooldown;
      var time = DataStore.Get(kitName, player.SteamID);
      if (time == null) {
          time = 0;
      }
      var calc = System.Environment.TickCount - time;
      if (calc >= waittime) {
          // Cuando no hay cooldown activo hace esto
          DataStore.Add(kitName, player.SteamID, System.Environment.TickCount);
          darkit(player, kitName);
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

