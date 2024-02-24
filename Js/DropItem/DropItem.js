
var Author = "KichDM";
var About = "Drop Loot For Destroyed Box";
var Version = "1.0.0";

var white = "[color #FFFFFF]";
var red = "[color #FF0000]";
var blue = "[color #001EFF]";
var green = "[color #00FF40]";
var lightBlue = "[color #00FFF7]";
var yellow = "[color #FCFF02]";
var orange = "[color #CD8C00]";

function On_EntityDestroyed(HurtEvent) {
    if (HurtEvent.Entity.Name == "WoodBox" || HurtEvent.Entity.Name == "WoodBoxLarge") { 
        var contar = (HurtEvent.Entity.Inventory.SlotCount - HurtEvent.Entity.Inventory.FreeSlots);
        var limite = HurtEvent.Entity.Inventory.FreeSlots;
        var cantidad = 0;
        for (var klk in HurtEvent.Entity.Inventory.Items)
        {
            cantidad += klk.Quantity;
            klk.Drop();
        }
        var total = (cantidad + limite);
        HurtEvent.Attacker.Message(yellow + "Items Dropped : " + lightBlue + contar.toString() + yellow + " Total quantity : " + lightBlue+  total.toString());
    }
}