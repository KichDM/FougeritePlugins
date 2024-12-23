var Author = "KichDM";
var About = "Recycle Items to Materials";
var Version = "1.0.0";

var red = "[color #FF0000]";
var blue = "[color #001EFF]";
var lightBlue = "[color #00FFF7]";
var yellow = "[color #FCFF02]";

function On_Command(Player, cmd, args) {
    if (cmd == "recycle" || cmd == "reciclar") {
        if (args.Length == 0)
            return Player.Message("Item = ? ")
        var itemName = processArgs(args, 0).text ? processArgs(args, 0).text.toString().toLowerCase() : "";
        var cantidaditems = processArgs(args, 0).number != null ? processArgs(args, 0).number : 1;
        for (var i = 0; i <= cantidaditems; i++) {
            if (i == cantidaditems) {
                break;
            }

            var itemss = [];
            for (var barItem in Player.Inventory.BarItems) {
                if (barItem && barItem.Name) {
                    itemss.push({ Name: barItem.Name.toString(), Slot: barItem.Slot.toString() });
                }
            }
            for (var item in Player.Inventory.Items) {
                if (item && item.Name) {
                    itemss.push({ Name: item.Name.toString(), Slot: item.Slot.toString() });
                }
            }
            var slotEncontrado = buscaritems(itemss, itemName);
            if (slotEncontrado == null) {
                Player.Message(red + "The item with the name was not found: " + yellow + itemName);
                return;
            }

            var a = Player.PlayerClient.rootControllable.idMain.GetComponent("Inventory");
            var item2;
            var listaing = []
            if (a.GetItem(slotEncontrado.slot, item2)) {
                var tiene = Player.Inventory.HasItem(slotEncontrado.item.Name,cantidaditems);
                if (!tiene)
                {
                    Player.Message("You do not have enough in your inventory");
                    return;
                }
                
                var gg = Util.BlueprintOfItem(item2.datablock);
                var condition = item2.condition;
                var entry;

                if (gg == undefined)
                return Player.Message("This item is not allowed")
                for (entry in gg.ingredients) {
                    var cantidad = entry.amount;
                    cantidad *= condition;
                    cantidad = Math.round(cantidad * 100) / 100;
                    listaing.push({ Ingrediente: entry.Ingredient.name, Cant: cantidad });
                }
                if ('calories' in item2.datablock || 'damageMax' in item2.datablock || 'aimSway' in item2.datablock) {
                    Player.Inventory.RemoveItem(slotEncontrado.slot);
                    Player.Message(lightBlue + "The items " + yellow + item2.datablock.name + lightBlue + " was [color #DAA520]" + calcularPorcentaje(item2.condition).toFixed(2) + "%" + lightBlue + " of condition")
                    var mensajeFinal = " [color #F781F3] You Recived: ";
                    for (var j = 0; j < listaing.length; j++) {
                        var ingrediente = listaing[j];
                        mensajeFinal += "[color #CD8C00]" + ingrediente.Ingrediente + "[color #00FF40]{" + parseInt(ingrediente.Cant) + "}";
                        Player.Inventory.AddItem(ingrediente.Ingrediente, parseInt(ingrediente.Cant));
                        if (j < listaing.length - 1) {
                            mensajeFinal += ",";
                        }
                    }
                    Player.Message(mensajeFinal);
                }
                else {
                    Player.Inventory.RemoveItem(slotEncontrado.name, cantidaditems);
                    Player.Message(lightBlue + "The items " + yellow + item2.datablock.name + lightBlue + " was [color #DAA520]" + calcularPorcentaje(item2.condition).toFixed(2) + "%" + lightBlue + " of condition")
                    var mensajeFinal = " [color #F781F3] You Recived: ";
                    for (var j = 0; j < listaing.length; j++) {
                        var ingrediente = listaing[j];
                        mensajeFinal += "[color #CD8C00]" + ingrediente.Ingrediente + "[color #00FF40]{" + parseInt(ingrediente.Cant * cantidaditems) + "}";
                        Player.Inventory.AddItem(ingrediente.Ingrediente, parseInt(ingrediente.Cant * cantidaditems));
                        if (j < listaing.length - 1) {
                            mensajeFinal += ",";
                        }
                    }
                    Player.Message(mensajeFinal);
                    break;
                }
            }
        }
    }
}


function buscaritems(array, busqueda) {
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item.Name.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1) {
            var resultado = {
                name: item.Name,
                slot: item.Slot,
                item: item
            };
            return resultado;
        }
    }
    return null;
}

function processArgs(args, inicio) {
    var result = {
        text: "",
        number: null
    };
    for (var l = inicio; l < args.Length; l++) {
        if (!isNaN(args[l])) {
            if (result.number == null) {
                result.number = 0;
            }
            result.number += parseInt(args[l]);
        } else {
            if (result.text != "") {
                result.text += " ";
            }
            result.text += args[l];
        }
    }
    return result;
}

function calcularPorcentaje(valor) {
    valor = Math.max(0, Math.min(1, valor));
    var porcentaje = valor * 100;
    return porcentaje;
}
