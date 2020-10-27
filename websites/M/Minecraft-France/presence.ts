let presence = new Presence({
  clientId: "769624741250072619" //The client ID of the Application created at https://discordapp.com/developers/applications
}),

strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
  //You can use this to get translated strings
});

let timestamp = Math.floor(Date.now() / 1000);

let presenceData: PresenceData = {
  largeImageKey: "placeholder",
  details: "Actualisation...",
  state: "Minecraft-France",
  startTimestamp: timestamp
};

function updatePresenceData(){
  
  if (document.location.hostname == "www.minecraft-france.fr") {
    switch (document.location.pathname) {
      case "/":
        presenceData.details = "Regarde la page d'accueil";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/actualites/":
        presenceData.details = "Regarde les actualités";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/tutoriels-minecraft/":
        presenceData.details = "Regarde les tutoriels";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/mods/":
        presenceData.details = "Regarde la liste des mods";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/maps/":
        presenceData.details = "Regarde la liste des maps";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/shaders-minecraft/":
        presenceData.details = "Regarde les shaders";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/datapacks/":
        presenceData.details = "Regarde les datapacks";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/resources-packs/":
        presenceData.details = "Regarde les resources packs";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/minecraft-bedrock-edition/":
        presenceData.details = "Regarde les actualités Bedrock";
        presenceData.state = "Blog Minecraft-France";
        break;
      case "/astuces/":
        presenceData.details = "Regarde les astuces";
        presenceData.state = "Blog Minecraft-France";
        break;
      default:
        presenceData.details = "Lit un article";
        presenceData.state = document.querySelector("h1.post-title").textContent; // Look for the blog post title and displays it on Discord
    }

  }

  else if (document.location.hostname == "forum.minecraft-france.fr") {
    if (document.location.pathname == "/") {
      presenceData.details = "Regarde la page d'accueil";
      presenceData.state = "Forum Minecraft-France";
    }
    else if (document.location.pathname.includes("/forums/")) {
      presenceData.details = "Regarde une catégorie";
      presenceData.state = document.querySelector("h1").textContent;
    }
    else if (document.location.pathname.includes("/threads/")) {
      presenceData.details = "Consulte un thread";
      let title = document.querySelector("h1").textContent.split(" ");
      title.shift()
      presenceData.state = title.join(" ");
    }
    else if (document.location.pathname == "/hashtags/") {
      presenceData.details = "Regarde les Hashtags";
      presenceData.state = "Forum Minecraft-France";
    }
    else if (document.location.pathname.includes("/hashtags/")) {
      presenceData.details = "Regarde un Hashtag";
      presenceData.state = document.querySelector("dl.heading").textContent;
    }
    else if (document.location.pathname == "/members/") {
      presenceData.details = "Regarde les membres";
      presenceData.state = "Forum Minecraft-France";
    }
    else if (document.location.pathname.includes("/members/")) {
      presenceData.details = "Regarde un profil";
      presenceData.state = document.querySelector("h1.username").textContent;
    }
    else if (document.location.pathname.includes("/badges/")) {
      presenceData.details = "Regarde les trophées";
      presenceData.state = "Forum Minecraft-France";
    }
    else if (document.location.pathname.includes("/search/")) {
      presenceData.details = "Recherche ...";
      presenceData.state = "Forum Minecraft-France";
    }
    else {
      presenceData.details = "Se ballade";
      presenceData.state = "Forum Minecraft-France";
    }

  }

}

updatePresenceData(); // Updates the data once
setInterval(updatePresenceData, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up


presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

  It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

  if (presenceData.details == null) {
      //This will fire if the presence details are not set
      presence.setTrayTitle(); //Clears the tray title for mac users
      presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
      //This will fire when the presence details are set
      presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});