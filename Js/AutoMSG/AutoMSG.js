var Author = "KichDM";
var About = "Announcement System"
var Version = "1.0.0"

// et in minutes, and it will perform a random calculation to choose a minute at random among them to create a timer.
var mintime = 1;
var maxtime = 2;

// The list of announcements, it's easy, you just need to put the announcements you want here, and the timer will randomly choose one from this list
var Announcement = [
  "Server Discord: discord.gg/UKqAjyPrZG",
  "Owner/Server Creator: KichDM#0371.",
  "If you have any questions, feel free to ask in the chat.",
  "The administration team is here to assist you.",
  "Enjoy your time on the server.",
  "Test.",
  "Test.",
  "Test.",
  "Test."
];

function On_ServerInit() {
  var finaltime = NumeroRandom(mintime, maxtime);
  var tiempo = minutosAMilisegundos(Number(finaltime).toFixed(2));
  var bucle = 0;
  var activar = tiempo;

  Plugin.CreateParallelTimer("AutoAnuncios", activar, null, function (evt) {
    AnuncioRandom();
    bucle++;
  }, 0);
}

function AnuncioRandom() {
  var random = Math.floor(Math.random() * Announcement.length);
  var elaununciofinal = Announcement[random];
  Server.Broadcast("[color#DAA520]" + elaununciofinal);
}

function NumeroRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function minutosAMilisegundos(minutos) {
  var milisegundos = minutos * 60 * 1000;
  return milisegundos;
}