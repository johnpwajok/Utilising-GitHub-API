/*jshint esversion: 8 */
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", getRepos);

async function getRepos() {
  let userName = document.getElementById("searchBox").value;
  console.log(userName);
  let searchedUser = "";

  const apiURL = "https://api.github.com/users";
  //////////////////////////////////////////////////
  //      CODE TO GET ALL USER INFO IN SAMPLE SET
  // const response = await fetch(apiURL);
  // const info = await response.json();
  // //all user information
  // const fullList = info;

  // //get the url of the profile the user searched for
  // for (let i = 0; i < fullList.length; i++) {
  //   let result = fullList[i];
  //   if (result.login == userName) {
  //     //profile url = the api url + / + username
  //     //searchedUserURL = apiURL.concat("/" + userName);
  //   }
  //   console.log(result);
  // }
  /////////////////////////////////////////////////

  let userExists = true;
  let errorMessage = document.getElementById("searchError");

  //function to handle errors in retrieving the users information
  function handleErrors(response) {
    if (!response.ok) {
      //throw Error(response.statusText);
      userExists = false;
      console.log("user doesn't exist!");

      //show error message
      errorMessage.innerHTML = "user doesn't exist!";
    } else {
      //hide error message and proceed
      errorMessage.innerHTML = "";
      console.log("user exists!");
    }
    return response;
  }
  let searchedUserURL = apiURL.concat("/" + userName);

  //check if user exists
  let searchedUserResponseChecker = await fetch(searchedUserURL)
    .then(handleErrors)
    .then((response) => console.log("ok"))
    .catch((error) => console.log(error));

  //information of the profile that the user searched for
  let searchedUserResponse = await fetch(searchedUserURL);
  let currentUserInfo = await searchedUserResponse.json();
  let currentUser = currentUserInfo;

  console.log("user " + searchedUser + " exists!");

  if (userExists) {
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

    //console.log(info);
    console.log(searchedUser);

    document.getElementById("profilePicture").src = currentUser.avatar_url;
    document.getElementById("name").innerHTML = currentUser.name;
    document.getElementById("userName").innerHTML = currentUser.login;
    document.getElementById("email").innerHTML = currentUser.email;
    document.getElementById("location").innerHTML = currentUser.location;
    document.getElementById("gists").innerHTML = currentUser.public_gists;

    document.getElementById("searchBox").value = "";
  }
}
