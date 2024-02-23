var Author = "KichDM";
var About = "Remove Mods System";
var Version = "1.0.0";

var white = "[color #FFFFFF]";
var red = "[color #FF0000]";
var blue = "[color #001EFF]";
var green = "[color #00FF40]";
var lightBlue = "[color #00FFF7]";
var yellow = "[color #FCFF02]";
var orange = "[color #CD8C00]";

function On_Command(Player, cmd, args) {
    if (cmd == "mod") {
        var item = Player.Inventory.ActiveItem;
        if (item != null) {
            var imods;
            imods = item.RInventoryItem.itemMods;
            var occupiedSlots = getEmptySlot(Player, 30, Player.Inventory.ActiveItem.Slot);
            var name = null;
            var inv = Player.PlayerClient.rootControllable.idMain.GetComponent("Inventory");
            var Name = Player.Inventory.ActiveItem.Name;
            var RemainingUses = Player.Inventory.ActiveItem.RInventoryItem.condition;
            var Slot = Player.Inventory.ActiveItem.Slot;
            var Ammo = Player.Inventory.ActiveItem.UsesLeft;
            var Weapon;
            var item2;
            if (inv.GetItem(Player.Inventory.ActiveItem.Slot, item2)) {
                Slot = item2.slot
                if (typeof item2 == "object" && "SetTotalModSlotCount" in item2 && "totalModSlots" in item2) {
                    Weapon = item2.totalModSlots
                }
            }
            var weaponInfo = lightBlue + "[" + item.Name + "]" + white + " Mods : " + yellow;
            for (var j = 0; j < imods.Length; j++) {
                if (imods[j].name != null) {
                    weaponInfo += imods[j].name + ", ";
                    Player.Inventory.AddItem(imods[j].name);
                }
                if (name == null)
                    name = imods[j].name;
            }
            weaponInfo = weaponInfo.slice(0, -2);
            Player.Message(weaponInfo);
            if (name == null) {
                Player.Message("Your weapon " + Name + " has no Mods");
                return;
            }
            Player.Inventory.RemoveItem(Slot);          
            Player.Inventory.AddItemTo(Name, occupiedSlots);
            var klk;
            if (inv.GetItem(occupiedSlots, klk)) {
                    klk.SetCondition(parseFloat(RemainingUses));
                    klk.SetUses(Ammo);
                    if (typeof klk == "object" && "SetTotalModSlotCount" in klk && "totalModSlots" in klk) {
                        klk.SetTotalModSlotCount(Weapon);
                    }
                }
                Player.Inventory.MoveItem(occupiedSlots, Slot);
            }
        }     
    }

    function getEmptySlot(Player, startSlot, endSlot) {
        var inv = Player.PlayerClient.rootControllable.idMain.GetComponent("Inventory");
        for (var i = startSlot; i <= endSlot; i++) {
            var item;
            if (!inv.GetItem(i, item)) {
                return (i);
            }
        }
        return endSlot;
    }