let p1_name = "john";
let p2_name = "Alice";
async function getPokemon() {
  const detail = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const res = await detail.json();
  const result = res.results;
  let x = Math.floor(Math.random() * 20);
  return result[x];
}
function displayPlayer1(response) {
  document.getElementById("p1_name").innerHTML = p1_name;
  document.getElementById("p1_score").textContent = `Score: ${score1}`;
  const card1 = document.querySelector("#card1");
  card1.querySelector("#name").textContent = response.name;
  const imgc = document.createElement("img");
  imgc.setAttribute("src", response.sprites.other.dream_world.front_default);
  imgc.style.height = "300px";
  imgc.style.width = "300px";
  card1.querySelector("#img").innerHTML = "";
  card1.querySelector("#img").append(imgc);
  const lst = card1.querySelector("#abilities");
  lst.innerHTML = "";
  const abilities = response.abilities;
  for (let i of abilities) {
    const li = document.createElement("li");
    li.textContent = i.ability.name;
    lst.append(li);
  }
  const exp = card1.querySelector("#experience");
  exp.textContent = response.base_experience;
}
function displayPlayer2(response) {
  document.getElementById("p2_name").textContent = p2_name;
  document.getElementById("p2_score").textContent = `Score: ${score2}`;
  const card2 = document.querySelector("#card2");
  card2.querySelector("#name").textContent = response.name;
  const imgc = document.createElement("img");
  imgc.setAttribute("src", response.sprites.other.dream_world.front_default);
  imgc.style.height = "300px";
  imgc.style.width = "300px";
  card2.querySelector("#img").innerHTML = "";
  card2.querySelector("#img").append(imgc);
  const lst = card2.querySelector("#abilities");
  lst.innerHTML = "";
  const abilities = response.abilities;
  for (let i of abilities) {
    const li = document.createElement("li");
    li.textContent = i.ability.name;
    lst.append(li);
  }
  card2.querySelector("#experience").textContent = response.base_experience;
}
async function initiate() {
  const poke1 = await getPokemon();
  let res = await fetch(poke1.url);
  let result = await res.json();
  displayPlayer1(result);
  const poke2 = await getPokemon();
  let res2 = await fetch(poke2.url);
  let result2 = await res2.json();
  displayPlayer2(result2);
}
let score1 = 0;
let score2 = 0;
const btn = document.getElementById("fight");
btn.addEventListener("click", async () => {
  initiate();
  setTimeout(() => {
    let crd1 = document.getElementById("card1");
    let scr1 = crd1.querySelector("#experience").textContent;
    // console.log(typeof(scr1));
    let crd2 = document.querySelector("#card2");
    let src2 = crd2.querySelector("#experience").textContent;
    // console.log(src2);
    scr1 = Number(scr1);
    src2 = Number(src2);
    console.log(scr1, src2);
    // console.log(scr1);
    if (scr1 > src2) {
      score1 = score1 + 1;
      document.querySelector("#p1_score").textContent = `Score: ${score1}`;
    } else if (scr1 < src2) {
      score2 = score2 + 1;
      document.querySelector("#p2_score").textContent = `Score: ${score2}`;
    }
  }, 1000);
});




