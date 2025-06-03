var Author = "KichDM";
var About = "BettetDrop++";
var Version = "1.0.0";


var logs = true;

function On_TablesLoaded(Tables) {
	
	if (Data.GetConfigValue("BetterDrop++", "Settings", "enabled") == "false") {

		Util.Log("BetterDrop++ is disabled, loading canceled.");
	}
	else {
		Util.Log("BetterDrop++ Sytem Logs " + (logs ? "ACTIVE" : "OFFLINE"));
		if (Plugin.CreateDir("Tables")) {
			Util.Log("BetterDrop++ : Loading Is Active.");
			ExtractTables(Tables);
		}
	}
}

function LoadTables(Tables, name) {
    Util.Log("Cargando INI: " + name);
    var table = Plugin.GetIni("Tables\\" + name);
    var realTable = Tables[name];
    
    realTable.minPackagesToSpawn = table.GetSetting('TableSettings', 'MinToSpawn');
    realTable.maxPackagesToSpawn = table.GetSetting('TableSettings', 'MaxToSpawn');
    realTable.spawnOneOfEach = table.GetSetting('TableSettings', 'OneOfEach');
    realTable.noDuplicates = table.GetSetting('TableSettings', 'DuplicatesAllowed');
    realTable.noDuplicates = !realTable.noDuplicates;

    function readEntries(ini) {
        var entries = [];
        var maxEntries = 1000;
        for (var i = 1; i <= maxEntries; i++) {
            var entryName = 'Entry' + i;
            var objName = ini.GetSetting(entryName, 'Name');
            if (!objName) break;
            entries.push({
                name: objName,
                weight: ini.GetSetting(entryName, 'Weight'),
                amountMin: ini.GetSetting(entryName, 'Min'),
                amountMax: ini.GetSetting(entryName, 'Max')
            });
        }
        return entries;
    }

    var packs = [];
    var entries = readEntries(table);

    for (var k = 0; k < entries.length; k++) {
        var e = entries[k];
        var pack = {
            weight: e.weight,
            amountMin: e.amountMin,
            amountMax: e.amountMax
        };
        if (Tables.ContainsKey(e.name)) {
            pack.obj = Tables[e.name];
            Util.Log("  - Entry" + (k+1) + " -> " + e.name);
        } else {
            var refTable = Plugin.GetIni("Tables\\" + e.name);
            if (refTable && refTable.Count() > 0) {
                pack.obj = { entries: readEntries(refTable) };
                Util.Log("  - Entry" + (k+1) + " -> [Referencia] " + e.name + ": " + pack.obj.entries.length + " entries");
            } else {
                // Buscar item directamente
                pack.obj = Server.Items.Find(e.name);
                Util.Log("  - Entry" + (k+1) + " -> " + e.name);
            }
        }
        packs.push(pack);
    }

    Util.Log("Total entries cargadas desde INI '" + name + "': " + packs.length);
}

function ExtractTables(tbls) {
	for (var name in tbls.Keys) {
		if (Plugin.IniExists("Tables\\" + name)) {
			Util.Log("Table " + name + " already exists, skipping extraction.");
			LoadTables(tbls,name);
		}
		else {
			Util.Log("Extracting table: " + name);
			var table = Plugin.CreateIni("Tables\\" + name);
			table.AddSetting('TableSettings', 'MinToSpawn', tbls[name].minPackagesToSpawn);
			table.AddSetting('TableSettings', 'MaxToSpawn', tbls[name].maxPackagesToSpawn);
			table.AddSetting('TableSettings', 'DuplicatesAllowed', !tbls[name].noDuplicates);
			table.AddSetting('TableSettings', 'OneOfEach', tbls[name].spawnOneOfEach);

			var cpt = 1;
			for (var entry in tbls[name].LootPackages) {
				var n = "Entry" + cpt;
				if (entry.obj != null) {
					table.AddSetting(n, 'Name', entry.obj.name);
					table.AddSetting(n, 'Weight', entry.weight);
					table.AddSetting(n, 'Min', entry.amountMin);
					table.AddSetting(n, 'Max', entry.amountMax);

					cpt++;
				}
			}
			table.Save();
		}

	}
}
