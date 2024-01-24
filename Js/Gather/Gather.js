var Author = "KichDM";
var About = "UP the gather system"
var Version = "1.0.0"

function On_PlayerGathering(Player, GatherEvent) {
        var MULTIPLICADOR = (GatherEvent.Quantity * (1));
        var typo = GatherEvent.Type.toString();
        var ini = Plugin.GetIni("Gather");
        if (typo == "Rock1")
        {
          var mineral = ini.GetSetting("Types", "Minerals")
          var MULTIPLICADOR = (GatherEvent.Quantity * (parseInt(mineral)));
          MULTIPLICADOR = Math.ceil(MULTIPLICADOR);
          Player.Inventory.AddItem(GatherEvent.Item, MULTIPLICADOR);
          Player.InventoryNotice(MULTIPLICADOR + " x " + GatherEvent.Item);
          return;
        }
        else {
          var mineral = ini.GetSetting("Types", typo)
          var MULTIPLICADOR = (GatherEvent.Quantity * (parseInt(mineral)));
          MULTIPLICADOR = Math.ceil(MULTIPLICADOR);
          Player.Inventory.AddItem(GatherEvent.Item, MULTIPLICADOR);
          Player.InventoryNotice(MULTIPLICADOR + " x " + GatherEvent.Item);
        }
    }

    function ini1() {
        if (!Plugin.IniExists("Gather")) {
            var ini = Plugin.CreateIni("Gather");
            ini.AddSetting("Types", "Animal", 1);
            ini.AddSetting("Types", "Tree", 1);
            ini.AddSetting("Types", "Minerals", 1);
            ini.AddSetting("Types", "WoodPile", 1);
            ini.Save();
        }
        return Plugin.GetIni("Gather");
    }

    function On_PluginInit() {
        ini1();
    }
