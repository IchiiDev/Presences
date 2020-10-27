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
    // Front page
    if (document.location.pathname == "/") {
      presenceData.details = "Regarde la page d'accueil";
      presenceData.state = "Blog Minecraft-France";
    }
    // All news page
    else if (document.location.pathname == "/actualites/") {
      presenceData.details = "Regarde les actualités";
      presenceData.state = "Blog Minecraft-France";
    }
    // Theses pages may change in the future, the presence will be updated if the categories changes 
    else if (document.location.pathname == "/minecraft-1-17/") {
      presenceData.details = "Regarde les actualités";
      presenceData.state = "Minecraft 1.17";
    }
    else if (document.location.pathname == "/minecraft-dungeons/") {
      presenceData.details = "Regarde les actualités";
      presenceData.state = "Minecraft Dungeons";
    }
    else if (document.location.pathname == "/minecraft-earth/") {
      presenceData.details = "Regarde les actualités";
      presenceData.state = "Minecraft Earth";
    }
    // Tutorials page
    else if (document.location.pathname == "/tutoriels-minecraft/") {
      presenceData.details = "Regarde les tutoriels";
      presenceData.state = "Blog Minecraft-France";
    }
    // Mods categories
    else if (document.location.pathname.includes("/mods/")) {
      let mods_type = document.querySelector("h1.page-title").textContent; // Checks for the mods category
      presenceData.details = "Regarde la liste des mods";
      presenceData.state = (mods_type != "Mods") ? mods_type : "Blog Minecraft-France"; // If the mods category is default, display "Blog Minecraft-France". If not, displays the category name.
    }
    // Maps categories
    else if (document.location.pathname == "/maps/") {
      presenceData.details = "Regarde la liste des maps";
      presenceData.state = "Blog Minecraft-France";
    }
    else if (document.location.pathname == "/maps-aventure/") {
      presenceData.details = "Regarde la liste des maps";
      presenceData.state = "Maps Aventure";
    }
    else if (document.location.pathname == "/map-de-constructions/") {
      presenceData.details = "Regarde la liste des maps";
      presenceData.state = "Maps de constructions";
    }
    else if (document.location.pathname == "/maps-mini-jeux/") {
      presenceData.details = "Regarde la liste des maps";
      presenceData.state = "Maps Mini-Jeux";
    }
    else if (document.location.pathname == "/map-pvp/") {
      presenceData.details = "Regarde la liste des maps";
      presenceData.state = "Maps PvP";
    } 
    else if (document.location.pathname == "/maps-multijoueurs/") {
      presenceData.details = "Regarde la liste des maps";
      presenceData.state = "Maps Multi-Joueurs";
    }
    else if (document.location.pathname == "/maps-solo/") {
      presenceData.details = "Regarde la liste des maps";
      presenceData.state = "Maps Solo";
    }
    // Shaders page
    else if (document.location.pathname == "/shaders-minecraft/") {
      presenceData.details = "Regarde les shaders";
      presenceData.state = "Blog Minecraft-France";
    }
    // Datapacks page
    else if (document.location.pathname == "/datapacks/") {
      presenceData.details = "Regarde les datapacks";
      presenceData.state = "Blog Minecraft-France";
    }
    // Resources packs categories
    else if (document.location.pathname.includes("/resources-pack/")) {
      let resource_type = document.querySelector("h1.page-title").textContent; // Checks for the resource pack category
      presenceData.details = "Regarde les resources packs";
      presenceData.state = (resource_type != "Resource Packs") ? resource_type : "Blog Minecraft-France"; // If the resources packs category is default, display "Blog Minecraft-France". If not, displays the category name.
    }
    // Minecraft Bedrock edition categories
    else if (document.location.pathname.includes("/minecraft-bedrock-edition/")) {
      let bedrock_type = document.querySelector("h1.page-title").textContent; // Checks for the resource pack category
      presenceData.details = "Regarde Minecraft Bedrock";
      presenceData.state = (bedrock_type != "Minecraft: Bedrock Edition") ? bedrock_type : "Blog Minecraft-France"; // If the resources packs category is default, display "Blog Minecraft-France". If not, displays the category name.
    }
    // Hints & tips page
    else if (document.location.pathname == "/astuces/") {
      presenceData.details = "Regarde les astuces";
      presenceData.state = "Blog Minecraft-France";
    } 
    else if (document.location.pathname == "/page-partenaires/") {
      presenceData.details = "Regarde les partenaires";
      presenceData.state = "Blog Minecraft-France";
    }
    // Else if blog article
    else {
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
