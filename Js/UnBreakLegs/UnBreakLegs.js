var Author = "KichDM";
var About = "Curar piernas system";
var Version = "1.0.0";

// Tiempo en milisegundos para curar piernas
var activar = 10000;

var colores = {
    info: "[color#00C3FF]",
    advertencia: "[color#FFD700]",
    exito: "[color#00FF40]",
    error: "[color#FF4040]",
    blanco: "[color#FFFFFF]",
    gris: "[color#C0C0C0]"
};

function On_Command(Player, cmd, args) {
    if (cmd == "curar") {
        var tipo = Player.PlayerClient.rootControllable.GetComponent("FallDamage");
        var rotas = tipo.GetLegInjury();

        if (rotas > 0) {
            Player.Message(colores.advertencia + "⚠ Tus piernas serán curadas en " + colores.blanco + (activar / 1000) + colores.advertencia + " segundos...");
            
            var data = Plugin.CreateDict();
            data["PlayerID"] = Player.SteamID;

            Plugin.CreateParallelTimer("CurarPiernas", activar, data, function (evt) {
                var id = evt.Args["PlayerID"];
                var pl = Server.FindPlayer(id);
                if (pl != null) {
                    var tipo = pl.PlayerClient.rootControllable.GetComponent("FallDamage");
                    tipo.ClearInjury();
                    pl.Message(colores.exito + "✅ Tus piernas han sido completamente curadas. ¡Ten cuidado la próxima vez!");
                }
            });
        } else {
            Player.Message(colores.info + "💡 Tus piernas están en perfecto estado.");
        }
    }
}