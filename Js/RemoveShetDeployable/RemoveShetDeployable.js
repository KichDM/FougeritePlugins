var Author = "KichDM";
var About = "Remove Shet Deployable"
var Version = "1.0.0"

var timer = 6200000;
var colors = {
    rojo: "[color#FF0000]",
    verde: "[color#00FF40]",
    azul: "[color#00BFFF]",
    amarillo: "[color#FFFF00]",
    blanco: "[color#FFFFFF]",
    gris: "[color#C0C0C0]",
    morado: "[color#B404AE]",
    naranja: "[color#FFA500]",
    turquesa: "[color#00FFC0]"
};

function On_Command(Player, cmd, args) {
    if (cmd == "basura") {
        if (PermissionSystem.PlayerHasGroup(Player, "Admin") || Player.Admin) {
            borrarbasura()
        }
        else {
            Player.Message(colors.rojo + "✘ No tienes permiso para usar este comando.");
        }
    }
}

function borrarbasura() {
    var contador = 0;
    for (var entity in World.Entities) {
        if (Util.ContainsString(entity.Name.ToLower(), "barricade" || entity.Name.ToLower(), "camp")) {
            var groundDist = World.GetGroundDist(entity.Location);
            var num2 = parseFloat(groundDist);
            if (num2 < 0.2) {
                entity.Destroy();
                contador++
            }
        }
    }
     var mensaje = colors.verde + "✔ " + colors.blanco + "Limpieza completa: " +
                  colors.amarillo + contador + colors.blanco + " objetos basura eliminados.";

    Server.Broadcast(mensaje);
}


function On_PluginInit() {
    Plugin.CreateParallelTimer("Basurero", timer, null, function (evt) {
        Server.Broadcast(colors.naranja + "⚠ " + colors.blanco + "Limpieza de objetos comenzará en " + colors.rojo + "10 segundos" + colors.blanco + ", puede haber algo de lag.");
        Plugin.CreateParallelTimer("Basurero1", 10000, null, function (evt) {
            borrarbasura()
        });
        bucle++;
    }, 0);
}