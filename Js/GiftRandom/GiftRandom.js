var Author = "KichDM";
var About = "Random Gifts";
var Version = "1.0.0";

var gifttimer = 3600000;

var ItemSets = [
    [
        { weapon: "P250", cant: 1 },
        { weapon: "Rock", cant: 1 },
        { weapon: "Torch", cant: 1 }
    ],
    [
        { weapon: "MP5", cant: 1 },
        { weapon: "Wood", cant: 1 },
        { weapon: "Stone", cant: 1 }
    ]
];

function aletoryarray() {
    var selectedSet = ItemSets[Math.floor(Math.random() * ItemSets.length)];
    return selectedSet;
}

function On_PluginInit() {
    Plugin.CreateTimer("Regalos", gifttimer).Start();
}

function RegalosCallback() {
        Plugin.KillTimer("Regalos");
        var players = Server.Players;
        var playerCount = players.Count;
        if (playerCount == 0) {
            Plugin.CreateTimer("Regalos", gifttimer).Start();
            return;
        }
        var randomIndex = Math.floor(Math.random() * playerCount);
        var randomPlayer = players[randomIndex];
        var itemsToGive = aletoryarray();
        for (var i = 0; i < itemsToGive.length; i++) {
            randomPlayer.Inventory.AddItem(itemsToGive[i].weapon, itemsToGive[i].cant);
        }
        var broadcastMessage = "[color #CD8C00]" + randomPlayer.Name + "[color #00FFF7] Has received the random gifts ^^ " + "!";
        for (var i = 0; i < itemsToGive.length; i++) {
            broadcastMessage += "[color #FFFFFF] , " + "[color #FCFF02][" + itemsToGive[i].cant + "] [color #00FF40]" + itemsToGive[i].weapon;
        }
        Server.Broadcast(broadcastMessage);
        Plugin.CreateTimer("Regalos", gifttimer).Start();
}