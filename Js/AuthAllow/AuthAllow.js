var Author = "KichDM";
var About = "Bypass Cracked Clients"
var Version = "1.0.0"

function On_SteamDeny (sde)
{
    if (sde.ClientConnection != null && sde.ClientConnection.UserID == 76561197960266962)
    {
        return;
    }
    if (sde.ErrorNumber == 150)
    {
        sde.ForceAllow = true;
    }
}