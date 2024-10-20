const adoptContainer = document.getElementById("adopt-container");
let isLoading = true;

const init = () => {
  fetchData(
    "https://openapi.programming-hero.com/api/peddy/categories",
    "categories",
    displayCategories
  );
  showSpinner(true);
  setTimeout(() => {
    showSpinner(false);
    fetchData(
      "https://openapi.programming-hero.com/api/peddy/pets",
      "pets",
      displayData
    );
  }, 2000);
};

const showSpinner = (prev = true) => {
  const spinner = document.getElementById("spinner");
  adoptContainer.innerHTML = "";
  isLoading = prev;
  if (isLoading) {
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.remove("flex");
    spinner.classList.add("hidden");
  }
};

// Common function for all the fetching

const fetchData = async (url, params = "", callback) => {
  const res = await fetch(url);
  const data = await res.json();
  if (callback) {
    callback(data[`${params ? params : ""}`]);
  } else {
    return data;
  }
};

// function for displaying categories

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach(({ category, category_icon }) => {
    const div = document.createElement("button");
    div.innerHTML = `
             <img class="w-8 h-8" src=${category_icon} alt="" />
             <h4 class="font-inter font-bold text-lg">${category}</h4>
        `;
    div.classList = "w-full btn bg-transparent border-black/10 h-[56px]";
    div.onclick = (e) => {
      showSpinner(true);
      const btns = document.querySelectorAll(".active");
      for (btn of btns) {
        if (btn.classList.contains("active")) {
          btn.classList.remove("active");
        }
      }
      setTimeout(() => {
        showSpinner(false);
        fetchData(
          `https://openapi.programming-hero.com/api/peddy/category/${category}`,
          "data",
          displayData
        );
      }, 2000);
    };
    categoriesContainer.appendChild(div);
  });
};

const btnContainer = document.getElementById("categories-container");
btnContainer.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON") {
    e.target.classList.add("active");
  }
  if (e.target.nodeName === "H4" || e.target.nodeName === "IMG") {
    e.target.parentElement.classList.add("active");
  }
});

// store data outside array to sorting

let data2 = [];

const sortBtn = document.getElementById("sort-by-price");
sortBtn.addEventListener("click", () => {
  data2.sort((a, b) => b.price - a.price);
  displayData(data2);
});

const properties = [
  "petId",
  "breed",
  "category",
  "date_of_birth",
  "price",
  "image",
  "gender",
  "pet_details",
  "vaccinated_status",
  "pet_name",
];

const displayData = (data) => {
  data2 = [...data];
  // Loop for checking wheather data is available or not
  for (const arr of data) {
    for (const property of properties) {
      if (!arr[property]) {
        arr[property] = "N/A";
      }
    }
  }
  adoptContainer.innerHTML = "";
  if (data.length === 0) {
    adoptContainer.innerHTML = `
    <div class='text-center flex flex-col justify-center items-center gap-4 py-10'>
      <div class='mt-4'><img class='w-full h-full' src='./images/not-found.png'/></div>
      <h1 class='font-bold text-3xl'>No Information Available</h1>
      <p class='w-2/3 mx-auto'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
      its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    adoptContainer.classList.add(
      "bg-[#f8f8f8]",
      "flex",
      "justify-center",
      "items-center",
      "rounded-md"
    );
    adoptContainer.classList.remove("grid");
  } else {
    adoptContainer.classList.add("grid");
    adoptContainer.classList.remove("bg-[#f8f8f8]");
  }
  data.forEach(
    ({ petId, breed, date_of_birth, price, image, gender, pet_name }) => {
      const div = document.createElement("div");
      div.innerHTML = `
                  <div class="w-full h-2/3 md:h-36">
                    <img
                      class="w-full h-full object-cover rounded-md"
                      src=${image}
                      alt=""
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <h4 class="font-bold text-xl font-inter">${pet_name}</h4>
                    <p class="flex items-center gap-2 text-[#363636]">
                      <i class="fa-solid fa-paw"></i>
                      <span>Breed: ${breed}</span>
                    </p>
                    <p class="flex items-center gap-2 text-[#363636]">
                      <i class="fa-solid fa-calendar"></i
                      ><span>Birth: ${date_of_birth}</span>
                    </p>
                    <p class="flex items-center gap-2 text-[#363636]">
                      <i class="fa-solid fa-mercury"></i>
                      <span>Gender: ${gender}</span>
                    </p>
                    <p class="flex items-center gap-2 text-[#363636]">
                      <i class="fa-solid fa-dollar-sign"></i>
                      <span>Price : ${
                        !isNaN(price) ? price + "$" : price
                      }</span>
                    </p>
                  </div>
                  <!-- Likes -->
                  <div class="border-t">
                    <div class="grid grid-cols-3 gap-3 mt-3">
                      <button
                        class="btn bg-transparent border-black/20 rounded-md h-9 min-h-9 hover:bg-blue-800 hover:text-white" onclick="fetchData('https://openapi.programming-hero.com/api/peddy/pet/${petId}','petData',updateGallery)"
                      >
                        <i class="fa-regular fa-thumbs-up text-xl"></i>
                      </button>
                      <button
                        class="btn bg-transparent text-primary border-black/20 h-9 min-h-9 hover:bg-primary hover:text-white"
                        onclick="adoptModal(this)"
                      >
                        Adopt
                      </button>
                      <button
                        class="btn bg-transparent text-primary border-black/20 h-9 min-h-9 hover:bg-primary hover:text-white"
                        onclick="fetchData('https://openapi.programming-hero.com/api/peddy/pet/${petId}','petData',updateModal)"
                      >
                        Details
                      </button>
                    </div>
                  </div>
        `;
      div.classList = "max-h-[520px] p-4 border rounded-md flex flex-col gap-6";
      adoptContainer.classList.remove("bg-[#f8f8f8]");
      adoptContainer.appendChild(div);
    }
  );
};

const storage = JSON.parse(localStorage.getItem("likedItem")) || [];
const updateLocaleStorage = (arr = []) => {
  if (arr.length !== 0) storage.push(arr);
  console.log(storage);
  localStorage.setItem("likedItem", JSON.stringify(storage));
};

const updateLocaleGallery = () => {
  const images = JSON.parse(localStorage.getItem("likedItem"));
  const galleryContainer = document.getElementById("gallery-container");
  for (const image of images) {
    console.log(image);
    const div = document.createElement("div");
    div.innerHTML = `
  <img
     class="rounded-md w-full h-full object-cover object-left-top"
     src=${image}
     alt="" />
  `;
    div.classList = "lg:h-32";
    div.onclick = function () {
      deleteGallery(this);
    };
    galleryContainer.appendChild(div);
  }
};

const deleteGallery = (e) => {
  e.remove();
  const imgTag = e.children[0];
  const src = imgTag.getAttribute("src");
  console.log(src);
  const itemIndex = storage.indexOf(src);
  storage.splice(itemIndex, 1);
  updateLocaleStorage();
};

window.addEventListener("DOMContentLoaded", () => {
  updateLocaleGallery();
});

const updateGallery = (pet) => {
  updateLocaleStorage(pet.image);
  const galleryContainer = document.getElementById("gallery-container");
  const div = document.createElement("div");
  div.innerHTML = `
  <img
     class="rounded-md w-full h-full object-cover object-left-top"
     src=${pet.image}
     alt="" />
  `;
  div.classList = "lg:h-32";
  // div.setAttribute("onclick", "deleteGallery(this)");
  div.onclick = function () {
    deleteGallery(this);
  };
  galleryContainer.appendChild(div);
};

const updateModal = (data) => {
  // Checking wheather data available or not
  for (const property of properties) {
    if (!data[property]) {
      data[property] = "N/A";
    }
  }
  // Extract will be after loop otherwise checking won't work bcz you u store data before it changed to n/a
  const {
    petId,
    date_of_birth,
    price,
    image,
    pet_details,
    pet_name,
    vaccinated_status,
    breed,
    gender,
  } = data;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
          <div class="w-full">
            <img
              class="w-full h-2/3 object-cover rounded-md"
              src=${image}
              alt=""
            />
          </div>
          <div class="flex justify-start items-start">
            <h2 class="text-left font-bold text-xl font-inter">${pet_name}</h2>
          </div>
          <div class="flex items-center gap-10">
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-2 text-[#363636]">
                <i class="fa-solid fa-calendar"></i><span>Birth: ${date_of_birth}</span>
              </p>
              <p class="flex items-center gap-2 text-[#363636]">
                <i class="fa-solid fa-paw"></i>
                <span>Breed: ${breed}</span>
              </p>
              <p class="flex items-center gap-2 text-[#363636]">
                <i class="fa-solid fa-mercury"></i>
                <span>Vaccinated status: ${vaccinated_status}</span>
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-2 text-[#363636]">
                <i class="fa-solid fa-mercury"></i>
                <span>Gender: ${gender}</span>
              </p>
              <p class="flex items-center gap-2 text-[#363636]">
                <i class="fa-solid fa-dollar-sign"></i>
                <span>Price : ${price}$</span>
              </p>
            </div>
          </div>
          <div class="w-full border border-dashed my-1"></div>
          <div>
            <p>
              ${pet_details}
            </p>
          </div>
  `;
  div.classList = "flex flex-col gap-5 justify-start w-full";
  modalContainer.appendChild(div);
  detailsModal.showModal();
};

const adoptModal = (self) => {
  const modalContainer = document.getElementById("modal2-container");
  const closeBtn = document.getElementById("adopt2-close");
  modalContainer.innerHTML = "";
  const adoptModal = document.getElementById("adoptModal");
  const div = document.createElement("div");
  let count = 3;
  div.innerHTML = `
  <div class='flex flex-col gap-6 justify-center items-center'>
  <div><img class='w-2/3 mx-auto' src='https://img.icons8.com/?size=96&id=q6BlPrJZmxHV&format=png' /></div>
  <h2 class='font-black text-3xl'>Congrates</h2>
  <h1 class='font-bold text-xl text-center'>Adoption is Start For your Pet</h1>
  <span id='counter' class='font-extrabold text-4xl'>${count}</span>
  </div>
  `;
  modalContainer.appendChild(div);
  const intervalId = setInterval(() => {
    --count;
    document.getElementById("counter").innerText = count;
    if (count <= 0) {
      count = 0;
    }
  }, 1000);
  setTimeout(() => {
    closeBtn.click();
    clearInterval(intervalId);
    self.setAttribute("disabled", true);
    self.innerText = "Adopted";
    document.body.focus();
    self.classList.add("disabled");
  }, 3000);
  adoptModal.showModal();
};

let isMenuOpen = false;
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menuIcon");
const openMenu = () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    mobileMenu.classList.add("translate-y-0");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
    menuIcon.classList.add("-rotate-180");
  } else {
    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-xmark");
    mobileMenu.classList.remove("translate-y-0");
    menuIcon.classList.add("rotate-180");
  }
  if (!isMenuOpen) {
    if (
      menuIcon.classList.contains("rotate-180") ||
      menuIcon.classList.contains("-rotate-180")
    ) {
      menuIcon.classList.remove("rotate-180");
      menuIcon.classList.remove("-rotate-180");
    }
  }
};

init();
