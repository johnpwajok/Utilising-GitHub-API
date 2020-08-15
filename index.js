/*jshint esversion: 8 */
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", getRepos);

async function getRepos() {
  let userName = document.getElementById("searchBox").value;
  console.log(userName);
  let searchedUser = "";

  const apiURL = "https://api.github.com/users";
  const response = await fetch(apiURL);
  const info = await response.json();
  //all user information
  const fullList = info;

  //get the url of the profile the user searched for
  for (let i = 0; i < fullList.length; i++) {
    let result = fullList[i];
    if (result.login == userName) {
      //profile url = the api url + / + username
      //searchedUserURL = apiURL.concat("/" + userName);
    }
    console.log(result);
  }

  let searchedUserURL = apiURL.concat("/" + userName);
  let searchedUserResponse = await fetch(searchedUserURL);
  let currentUserInfo = await searchedUserResponse.json();
  //information of the profile that the user searched for
  currentUser = currentUserInfo;

  //clear all previous repo info
  let myNode = document.getElementById("repoSection");
  let fc = myNode.firstChild;

  while (fc) {
    myNode.removeChild(fc);
    fc = myNode.firstChild;
  }

  //getting repo Information
  let repoURL = searchedUserURL.concat("/repos");
  let repoResponse = await fetch(repoURL);
  let repoJson = await repoResponse.json();
  repoInfo = repoJson;
  //create a new div that will store the name and desctiption of each repo
  for (let j = 0; j < repoInfo.length; j++) {
    let newRepo = document.createElement("div");
    newRepo.className += "repos";
    newRepo.id = j;

    //add repo info to div
    if (repoInfo[j].description != null) {
      //link to repo
      let repoLink = repoInfo[j].html_url;
      newRepo.innerHTML =
        "<h4>" +
        repoInfo[j].name +
        "</h4>" +
        "<p class='repoHeadings'>Project Description</p>" +
        repoInfo[j].description +
        "<br><br>" +
        '<a href= "' +
        repoLink +
        '"> View project on Github</a>';
    } else {
      //no description exists
      let repoLink = repoInfo[j].html_url;
      newRepo.innerHTML =
        "<h4>" +
        repoInfo[j].name +
        "</h4>" +
        "<p class='repoHeadings'>Project Description</p>" +
        "<p>No description</p>" +
        '<a href= "' +
        repoLink +
        '"> View project on Github</a>';
    }
    document.getElementById("repoSection").appendChild(newRepo);
  }

  console.log(info);
  console.log(searchedUser);

  document.getElementById("profilePicture").src = currentUser.avatar_url;
  document.getElementById("name").innerHTML = currentUser.name;
  document.getElementById("userName").innerHTML = currentUser.login;
  document.getElementById("email").innerHTML = currentUser.email;
  document.getElementById("location").innerHTML = currentUser.location;
  document.getElementById("gists").innerHTML = currentUser.public_gists;

  document.getElementById("searchBox").value = "";
}
