var Author = "KichDM";
var About = "Airdrop Alert";
var Version = "1.0.0";
var verde = "[color#00FF40]";
var amarillo = "[color#FCFF02]";
var naranja = "[color#CD8C00]";
var blanco = "[color#FFFFFF]";
var azulclaro = "[color #00FFF7]";


function On_Airdrop(v) {
    for (var pl in Server.Players) {
        var loc = pl.Location;
        var Dist = Util.GetVectorsDistance(loc, v);
        var zona = this.FindLocationName(v);
        var direction = this.GetDirection(v, loc);
        pl.Message("The " + verde + "Airdrop" + blanco + " has landed in " + naranja + zona + blanco + " at " + amarillo + Dist.toFixed(0) + blanco + " meters from you in the direction of " + azulclaro + direction);
    }
}

function GetDirection(targetPosition, playerPosition) {
    var directions = ['East', 'Northeast', 'North', 'Northwest', 'West', 'Southwest', 'South', 'Southeast'];
    var diffX = targetPosition.x - playerPosition.x;
    var diffZ = targetPosition.z - playerPosition.z;
    var angle = Math.atan2(diffZ, diffX) * (180 / Math.PI);
    if (angle < 0) {
        angle += 360;
    }
    var index = Math.round(angle / 45) % 8;
    return directions[index];
}

function FindLocationName(vector3) {
    var locationsList = GetLocList();
    var vector = Util.CreateVector2(vector3.x, vector3.z)
    var closestLocation = null;
    var closestDistance = 9999999;
    for (var loc in locationsList) {
        var locVector = loc.split(',');
        var locX = parseFloat(locVector[0]);
        var locZ = parseFloat(locVector[1]);
        var distance = Util.GetVector2sDistance(vector, Util.CreateVector2(locX, locZ));
        if (distance < closestDistance) {
            closestDistance = distance;
            closestLocation = locationsList[loc];
        }
    }
    if (closestLocation == null) {
        return "No nearby location found.";
    }
    return closestLocation;
}

function GetLocList() {
    return {
        '5907,-1848': 'Hacker Valley South',
        '5268,-1961': 'Hacker Mountain South',
        '5268,-2700': 'Hacker Valley Middle',
        '4529,-2274': 'Hacker Mountain North',
        '4416,-2813': 'Hacker Valley North',
        '3208,-4191': 'Wasteland North',
        '6433,-2374': 'Wasteland South',
        '4942,-2061': 'Wasteland East',
        '3827,-5682': 'Wasteland West',
        '3677,-4617': 'Sweden',
        '5005,-3226': 'Everust Mountain',
        '4316,-3439': 'North Everust Mountain',
        '5907,-2700': 'South Everust Mountain',
        '6825,-3038': 'Metal Valley',
        '7185,-3339': 'Metal Mountain',
        '5055,-5256': 'Metal Hill',
        '5268,-3665': 'Resource Mountain',
        '5531,-3552': 'Resource Valley',
        '6942,-3502': 'Resource Hole',
        '6659,-3527': 'Resource Road',
        '5494,-5770': 'Beach',
        '5108,-5875': 'Beach Mountain',
        '5501,-5286': 'Coast Valley',
        '5750,-4677': 'Coast Mountain',
        '6120,-4930': 'Coast Resource',
        '6709,-4730': 'Secret Mountain',
        '7085,-4617': 'Secret Valley',
        '6446,-4667': 'Factory Radtown',
        '6120,-3452': 'Small Radtown',
        '5218,-4800': 'Big Radtown',
        '6809,-4304': 'Hangar',
        '6859,-3865': 'Tanks',
        '6659,-4028': 'Civilian Forest',
        '6346,-4028': 'Civilian Mountain',
        '6120,-4404': 'Civilian Road',
        '4316,-5682': 'Ballzack Mountain',
        '4720,-5660': 'Ballzack Valley',
        '4742,-5143': 'Spain Valley',
        '4203,-4570': 'Portugal Mountain',
        '4579,-4637': 'Portugal',
        '4842,-4354': 'Lone Tree Mountain',
        '5368,-4434': 'Forest',
        '5907,-3400': 'Rad-Town Valley',
        '4955,-3900': 'Next Valley',
        '5674,-4048': 'Silk Valley',
        '5995,-3978': 'French Valley',
        '7085,-3815': 'Ecko Valley',
        '7348,-4100': 'Ecko Mountain',
        '6396,-3428': 'Zombie Hill',
        '6600,-1400': 'Bandit Valley',
        '3800,-2600': 'Base Camp Ridge',
        '4250,-3850': 'North Valley',
        '0,0': 'Middle of Nowhere',
        '-2650,5200': 'Yosemite Valley',
        '-5825,-165': 'Crater Valley'
    };
}