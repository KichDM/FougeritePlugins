var Author = "KichDM";
var About = "Building Limit";
var Version = "1.0.0";

// Max house height
var alturamax = 8;
//how long by width 8x8
var foundatiosmax = 8;

function On_EntityDeployed(Player, Entity) {
    try
    {
    // Suelos
    if (Entity.Name.Contains("Foundation")) {
        var max = (foundatiosmax * 10);
        var numero = parseFloat(0);
        for (var Entity3 in Entity.GetLinkedStructs()) {
            var flag10 = !Entity3.Name.Contains("Foundation");
            if (!flag10) {
                numero += parseFloat(1);
            }
            var flag11 = numero >= max;
            if (flag11) {
                var flag12 = !Entity.IsDestroyed;
                if (flag12) {
                    Entity.Destroy();
                }
                var refund2 = true;
                if (refund2) {
                    Player.Inventory.AddItem(Entity.Name.Replace("Foundation", " Foundation"));
                    Player.InventoryNotice("1 x " + Entity.Name.Replace("Foundation", " Foundation"));
                    return;
                }
                Player.Notice("You have reached the maximum building height!");
                return;
            }
        }
    }
    // Altura
    if (Entity.Name.Contains("Pillar")) {
        var max = alturamax;
        var numero = parseFloat(0);
        for (var Entity3 in Entity.GetLinkedStructs()) {
            var flag10 = !Entity3.Name.Contains("Foundation");
            if (!flag10) {
                var flag7 = (Entity.Y - Entity3.Y) / parseFloat(4) > max;
            }
            if (flag7) {
                var flag12 = !Entity.IsDestroyed;
                if (flag12) {
                    Entity.Destroy();
                }
                var refund2 = true;
                if (refund2) {
                    Player.Inventory.AddItem(Entity.Name.Replace("Pillar", " Pillar"));
                    Player.InventoryNotice("1 x " + Entity.Name.Replace("Pillar", " Pillar"));
                    return;
                }
                Player.Notice("You have reached the maximum foundations!");
                return;
            }
        }
    }
}catch (a){}
}
