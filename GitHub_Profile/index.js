const searchForm = document.getElementById("search-form")
const userInput = document.getElementById("user-input")
const searchBtn = document.getElementById("search-button")
const profileCard = document.getElementById("profile-container")
const API_URL = 'https://api.github.com/users/'

async function fetchUser(username){
  try{
    const response = await fetch(API_URL + username);

    if(!response.ok){
      throw new Error('User not found')
    } 

    const data = await response.json();
    displayUser(data);

  } catch(error) {
    displayError(error.message)
  }
}

searchForm.addEventListener('submit', (e)=>{
  e.preventDefault(); //stop submission and reload

  const username = userInput.value.trim(); //rm whitespace

  if(username){
    fetchUser(username);
  }
})

function displayUser(user){
  const card = `
  <div class="w-xsl h-100 bg-indigo-950 px-6 rounded-lg flex flex-col justify-center items-center gap-6 shadow-md text-center relative">
      <img src="${user.avatar_url}" alt="${user.name ?? user.login}"
      class="w-24 h-24 rounded-full border-4 border-indigo-600"
      >
      <div>
        <h2 class="text-2xl text-slate-200 font-bold"">${user.name ?? user.login}</h2>
        <p class="text-slate-400">@${user.login}</p>
        <div class="h-20 overflow-scroll">
          <p class="mt-4 text-wrap">${user.bio ?? 'This user has no bio.'}</p>
        </div>
        <hr class="opacity-30 border-indigo-400" >
        <div class="px-12 mt-4 flex justify-center gap-4 text-center ">
          <div class="w-16 flex flex-col justify-center items-center">
            <p class="font-bold text-xl">${user.followers}</p>
            <p class="text-slate-400 text-sm">Followers</p>
          </div>
          <div class="w-16 flex flex-col justify-center items-center">
            <p class="font-bold text-xl" >${user.following}</p>
            <p class="text-slate-400 text-sm" >Following</p>
          </div>
          <div class="w-16 flex flex-col justify-center items-center">
            <p class="font-bold text-xl" >${user.public_repos}</p>
            <p class="text-slate-400 text-sm" >Repos</p>
          </div>
        </div>
      </div>
    </div>
  `
  profileCard.innerHTML = card
}

function displayError(message) {
  const error = `
  <div class="text-center p-4">
    <p class="text-pink-500 font-bold">${message}!</p>
  </div>
  `
  profileCard.innerHTML= error
}




