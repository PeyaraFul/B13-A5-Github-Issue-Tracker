const allIssue = document.getElementById("all-issue");
const openIssue = document.getElementById("open-issue");
const closedIssue = document.getElementById("closed-issue");

// console.log(document.getElementsByClassName('tab'))

let elementOfNumberOfAllIssue = document.getElementById("number-of-all-issue");
let numberOfAllIssue = elementOfNumberOfAllIssue.innerText;

const searchBtn = document.getElementById("search-btn");
// console.log(searchBtn) ;

let countAllIssue = 0;
let countOpenIssue = 0;
let countClosedIssue = 0;
let searchData = '' ;
let searchValue = '' ;

const manageSpinner =(condition)=>{
  if(condition === true){
    document.querySelectorAll('.spinner').forEach(spin =>{spin.classList.remove('hidden')});
    allIssue.classList.add('hidden') ;
    closedIssue.classList.add('hidden') ;
    openIssue.classList.add('hidden') ;
  }
  else{
    allIssue.classList.remove('hidden') ;
    openIssue.classList.remove('hidden') ;
    closedIssue.classList.remove('hidden') ;

    document.querySelectorAll('.spinner').forEach(spin =>{spin.classList.add('hidden')});

  }
}













searchBtn.addEventListener("click", function () {
  searchValue = document.getElementById("search-value").value.trim().toLowerCase();

  loadAllApi();
  console.log(searchData);
});
console.log(searchValue);


  


async function loadAllApi() {
  manageSpinner(true) ;
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();

  const searchUrl =
    "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";

  const searchResponse = await fetch(searchUrl + searchValue);
  searchData = await searchResponse.json();
  // console.log(searchData) ;

//   // set number of all issue
//   let dataLength = data.data.length;
//   elementOfNumberOfAllIssue.innerText = dataLength;
  const issues = searchValue ? searchData.data  : data.data

  function divDataSet() {
    allIssue.innerHTML = "";
    openIssue.innerHTML = "";
    closedIssue.innerHTML = ``;
    
    countAllIssue = 0 ;
    countOpenIssue = 0 ;
    countClosedIssue = 0 ;
    issues.forEach((element) => {
      

      const dataTitle = element.title;
      const dataDescription = element.description;
      const dataStatus = element.status;
      const dataAuthor = element.author;
      const dataPriority = element.priority;
      const dataLabels = element.labels;
      const dataLabels0 = element.labels[0];
      const dataCreatedAt = element.createdAt;
      const dataAssignee = element.assignee;

      function gettingDataLabels1() {
        if (dataLabels.length === 2) {
          return element.labels[1];
        }
      }
      gettingDataLabels1();
     
      const div = document.createElement("div");
      div.className = `card bg-base-100 min-h-[500px] shadow-sm p-4 m-auto border ${dataStatus === "open" ? "border-green-500" : "border-purple-500"} border-t-[6px]`;
      div.setAttribute("onclick", `my_modal_1.showModal()`);

      div.innerHTML = `            
                <div class="flex justify-between">
                    <img class="w-5" src="./assets/Open-Status.png" alt="">
                    <div class="badge badge-warning text-[#F59E0B] font-semibold bg-[#FFF6D1] "> ${dataPriority} </div>
                </div>
                <div class="card-body">
                    <h2 class="card-title"> ${dataTitle} </h2>
                    <p> ${dataDescription} </p>
                    <div class="card-actions flex justify-start gap-5">
                        <div class="badge badge-secondary font-semibold text-orange-500 bg-[#FECACA] "> ${dataLabels0.toUpperCase()} </div>
                        <div class="badge badge-warning font-semibold text-yellow-700 bg-[#FDE68A] ${gettingDataLabels1() === undefined ? "hidden" : ""} "> ${gettingDataLabels1()} </div>
                    </div>

                    <div class="divider"></div>
                    <p> ${dataAuthor} </p>
                    <p> ${dataCreatedAt} </p>
                </div>            
            `;
      const divCopy1 = div.cloneNode(true);
      const divCopy2 = div.cloneNode(true);

      
      allIssue.appendChild(div);
      countAllIssue = allIssue.children.length ;
      if (dataStatus === "open") {
        openIssue.appendChild(divCopy1);
        countOpenIssue = openIssue.children.length;
      }
      if (dataStatus === "closed") {
        closedIssue.appendChild(divCopy2);
        countClosedIssue = closedIssue.children.length;
      }


      div.addEventListener("click", function () {
        const modalAuthor = document.getElementById("modal-author");
        const modalTitle = document.getElementById("modal-title");
        const modalStatus = document.getElementById("modal-status");
        const modalLabels0 = document.getElementById("modal-labels0");
        const modalLabels1 = document.getElementById("modal-labels1");
        const modalDescription = document.getElementById("modal-description");
        const modalAssignee = document.getElementById("modal-assignee");
        const modalPriority = document.getElementById("modal-priority");

        // console.log(modalTitle)
        modalAuthor.innerText = dataAuthor;
        modalTitle.innerText = dataTitle;
        modalStatus.innerText = dataStatus;
        modalLabels0.innerText = dataLabels0.toUpperCase();
        modalLabels1.innerText = gettingDataLabels1().toUpperCase();
        modalDescription.innerText = dataDescription;
        modalAssignee.innerText = dataAssignee;
        modalPriority.innerText = dataPriority;
      });
    });

    window.countIssue = function (id) {
      if (id === "all-tab") {
        elementOfNumberOfAllIssue.innerText = countAllIssue;
      }

      if (id === "open-tab") {
        elementOfNumberOfAllIssue.innerText = countOpenIssue;
      }
      if (id === "closed-tab") {
        elementOfNumberOfAllIssue.innerText = countClosedIssue;
      }
    };
    window.countIssue('all-tab', 'open-tab', 'closed-tab') ;
    
    console.log(countClosedIssue) ;
  }
  divDataSet();
  manageSpinner(false) ;
}
loadAllApi();





