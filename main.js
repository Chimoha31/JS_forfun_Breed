console.log("Start");

const fetchDogBreeds = async () => {
  const response = await fetch("https://api.thedogapi.com/v1/breeds");
  const dogbreed = await response.json();

  populateDogSelect(dogbreed);
};

const populateDogSelect = (breeds) => {
  const select = document.querySelector(".breed-select");
  const breedOptions = breeds.map((breed) => {
    const option = document.createElement("option");
    option.text = breed.name;
    option.value = breed.id;
    return option;
  })
  breedOptions.forEach((breedOption) => {
    select.appendChild(breedOption);
  })

  // optionの高さを制御
  select.addEventListener("focus", function(elm){
      if(elm.currentTarget.options.length >= 11){
          elm.currentTarget.size = "20";
      }
  }, false);
  
  select.addEventListener("blur", function(elm){
      elm.currentTarget.size = "1";
  }, false);
  
  select.addEventListener("change", function(elm){
      elm.currentTarget.blur();
  }, false);
}

const changeDogs = () => {
  console.log(event.target.value);
}

fetchDogBreeds();


















// const fetchDogBreeds = async () => {
//   const data = await fetch("https://api.thedogapi.com/v1/breeds");
//   const dogs = await data.json();
//   console.log(dogs);

//   dogs.map((dog) => {
//     const h1 = document.createElement("h1");
//     h1.textContent = `${dog.name}`;
//     console.log(h1);
//   });
// };

// fetchDogBreeds();
