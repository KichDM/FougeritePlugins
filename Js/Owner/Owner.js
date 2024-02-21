var Author = "KichDM";
var About = "Owner / Who System";
var Version = "2.0.0";
var lightBlue = "[color #00FFF7]";

function On_Command(Player, cmd, args) {
    cmd = Data.ToLower(cmd);
    if (cmd == "dono" || cmd == "owner" || cmd == "who") {
        var object = Util.GetLookObject(Player.PlayerClient.controllable.character.eyesRay, 400, -1);
        if (object != null) {
            var structureComponent = object.GetComponent("StructureMaster");
            if (structureComponent != null) {
                var entity = Util.FindClosestEntity(structureComponent.transform.position, 2);
                var ownerId = entity.CreatorID;
                var owner = Server.FindPlayer(ownerId);
                if (owner != null) {
                    Player.Message(lightBlue + "Entity: [color #6A0888]" + entity.Name + lightBlue + " Owner: [color #FCFF02]" + owner.Name + lightBlue + " Online: " + (owner.IsOnline ? "[color #FF0000]Yes" : "[color #00FF40]No"));
                    return;
                } else {
                    Player.Message(lightBlue + "Entity: [color #6A0888]" + entity.Name + lightBlue + " Owner: [color #FCFF02]" + entity.CreatorName + lightBlue + " Online: " + (entity.Creator.IsOnline ? "[color #FF0000]Yes" : "[color #00FF40]No"));
                    return;
                }
            }
            structureComponent = object.GetComponent("StructureComponent");
            if (structureComponent != null) {
                var entity = Util.FindClosestEntity(structureComponent.transform.position, 2);
                var ownerId = entity.CreatorID;
                var owner = Server.FindPlayer(ownerId);
                if (owner != null) {
                    Player.Message(lightBlue + "Entity: [color #6A0888]" + entity.Name + lightBlue + " Owner: [color #FCFF02]" + owner.Name + lightBlue + " Online: " + (owner.IsOnline ? "[color #FF0000]Yes" : "[color #00FF40]No"));
                    return;
                } else {
                    Player.Message(lightBlue + "Entity: [color #6A0888]" + entity.Name + lightBlue + " Owner: [color #FCFF02]" + entity.CreatorName + lightBlue + " Online: " + (entity.Creator.IsOnline ? "[color #FF0000]Yes" : "[color #00FF40]No"));
                    return;
                }
            } else {
                var structureComponent = object.GetComponent("DeployableObject");
                if (structureComponent != null) {
                    var entity = Util.FindClosestEntity(structureComponent.transform.position, 2);
                    var ownerId = entity.CreatorID;
                    var owner = Server.FindPlayer(ownerId);
                    if (owner != null) {
                        Player.Message(lightBlue + "Entity: [color #6A0888]" + entity.Name + lightBlue + " Owner: [color #FCFF02]" + owner.Name + lightBlue + " Online: " + (owner.IsOnline ? "[color #FF0000]Yes" : "[color #00FF40]No"));
                        return;
                    } else {
                        Player.Message(lightBlue + "Entity: [color #6A0888]" + entity.Name + lightBlue + " Owner: [color #FCFF02]" + entity.CreatorName + lightBlue + " Online: " + (entity.Creator.IsOnline ? "[color #FF0000]Yes" : "[color #00FF40]No"));
                        return;
                    }
                } else {
                    Player.Message("[color #FF0000]Not a valid structure.");
                    return;
                }
            }
        } else {
            Player.Message("[color #FF0000]Nothing is selected or it's not an object.");
        }
    }
}