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
  });
  breedOptions.forEach((breedOption) => {
    select.appendChild(breedOption);
  });

  // optionの高さを制御
  select.addEventListener(
    "focus",
    function (elm) {
      if (elm.currentTarget.options.length >= 11) {
        elm.currentTarget.size = "20";
      }
    },
    false
  );

  select.addEventListener(
    "blur",
    function (elm) {
      elm.currentTarget.size = "1";
    },
    false
  );

  select.addEventListener(
    "change",
    function (elm) {
      elm.currentTarget.blur();
    },
    false
  );
};

// dropdownから犬種を選択し、情報を表示
const putDogsImage = (imageUrl) => {
  document.querySelector("#dogs-image").setAttribute("src", imageUrl);
};

const createDescriptionEntry = ({ label, value }) => {
  const descriptionTerm = document.createElement("dt");
  descriptionTerm.textContent = label;
  const descriptionValue = document.createElement("dd");
  descriptionValue.textContent = value;
  const parentElement = document.querySelector("#dogs-description");
  parentElement.appendChild(descriptionTerm);
  parentElement.appendChild(descriptionValue);
  console.log(parentElement);
};

// 1つ前の犬の情報を削除
const clearDogsDescription = () => {
  const descriptionElement = document.querySelector("#dogs-description");

  while (descriptionElement.firstChild) {
    descriptionElement.removeChild(descriptionElement.firstChild);
  }
};

const putDogsDescription = ({
  bred_for: bredFor,
  breed_group: bredGroup,
  name,
  temperament,
  life_span: lifeSpan,
  origin,
  height,
  weight,
}) => {
  clearDogsDescription();
  createDescriptionEntry({
    label: "【Name】",
    value: name,
  });
  createDescriptionEntry({
    label: "【Bred for】",
    value: bredFor,
  });
  createDescriptionEntry({
    label: "【Bred group】",
    value: bredGroup,
  });
  createDescriptionEntry({
    label: "【Temperament】",
    value: temperament,
  });
  createDescriptionEntry({
    label: "【Life span】",
    value: lifeSpan,
  });
  createDescriptionEntry({
    label: "【Origin】",
    value: origin,
  });
  createDescriptionEntry({
    label: "【Height [cm]】",
    value: height.metric,
  });
  createDescriptionEntry({
    label: "【Weight[kg]】",
    value: weight.metric,
  });
};

const getDogByBreed = async (breedId) => {
  const loadingElement = document.querySelector(".loading");
  loadingElement.classList.add("show-loading");

  const data = await fetch(
    `https://api.TheDogAPI.com/v1/images/search?include_breed=1&breed_id=` +
      breedId
  );
  const [breed] = await data.json();
  console.log(breed);

  putDogsImage(breed.url);
  putDogsDescription(breed.breeds[0]);

  loadingElement.classList.remove("show-loading");
};

const changeDogs = () => {
  console.log(event.target.value);
  getDogByBreed(event.target.value);
};

fetchDogBreeds();

