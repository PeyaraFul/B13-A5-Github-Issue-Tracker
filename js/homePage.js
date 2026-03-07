
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },
const allIssue = document.getElementById('all-issue') ;
let elementOfNumberOfAllIssue = document.getElementById('number-of-all-issue')
 let numberOfAllIssue = elementOfNumberOfAllIssue.innerText ;



async function loadAllApi() {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();

    // set number of all issue
    let dataLength = data.data.length ;
    elementOfNumberOfAllIssue.innerText = dataLength ;


    function allIssueDataSet(){
        allIssue.innerHTML= '' ;
        data.data.forEach(element => {

            

            const dataTitle = element.title ;
            const dataDescription = element.description ; 
            const dataStatus = element.status ; 
            const dataAuthor = element.author ; 
            const dataPriority = element.priority ; 
            const dataLabels = element.labels ; 
            const dataLabels0 = element.labels[0] ; 
            const dataCreatedAt = element.createdAt ;
            const dataAssignee = element.assignee ; 

            function gettingDataLabels1(){
                if(dataLabels.length ===2){
                return element.labels[1] ;

                }
            }
            gettingDataLabels1() ;

            // console.log(dataLabels2)
            // console.log(dataLabels.length)



            // Title
            // Description
            // Status
            // Category
            // Author
            // Priority
            // Label
            // CreatedAt

            const div = document.createElement('div') ;
            div.className = `card bg-base-100 w-96 shadow-sm p-4 m-auto border ${dataStatus === 'open' ? 'border-green-500' : 'border-purple-500' } border-t-[6px]` ;
            div.setAttribute('onclick', `my_modal_1.showModal()`);
            
            div.innerHTML= `            
                <div class="flex justify-between">
                    <img class="w-5" src="./assets/Open-Status.png" alt="">
                    <div class="badge badge-warning text-[#F59E0B] font-semibold bg-[#FFF6D1] "> ${dataPriority} </div>
                </div>
                <div class="card-body">
                    <h2 class="card-title"> ${dataTitle} </h2>
                    <p> ${dataDescription} </p>
                    <div class="card-actions flex justify-start gap-5">
                        <div class="badge badge-secondary font-semibold text-orange-500 bg-[#FECACA] "> ${dataLabels0.toUpperCase()} </div>
                        <div class="badge badge-warning font-semibold text-yellow-700 bg-[#FDE68A] ${gettingDataLabels1() === undefined? 'hidden' : ''} "> ${gettingDataLabels1()} </div>
                    </div>

                    <div class="divider"></div>
                    <p> ${dataAuthor} </p>
                    <p> ${dataCreatedAt} </p>
                </div>

        
            
            `       

            allIssue.appendChild(div) ;


            div.addEventListener('click', function(){
                const modalTitle = document.getElementById('modal-title');
                const modalStatus = document.getElementById('modal-status');
                const modalLabels0 = document.getElementById('modal-labels0');
                const modalLabels1 = document.getElementById('modal-labels1');
                const modalDescription = document.getElementById('modal-description');
                const modalAssignee = document.getElementById('modal-assignee');
                const modalPriority = document.getElementById('modal-priority');
               

                // console.log(modalTitle)
                modalTitle.innerText = dataTitle ;
                modalStatus.innerText = dataStatus;
                modalLabels0.innerText = dataLabels0.toUpperCase() ;
                modalLabels1.innerText = gettingDataLabels1().toUpperCase() ;
                modalDescription.innerText = dataDescription ;
                modalAssignee.innerText = dataAssignee ;
                modalPriority.innerText = dataPriority ;

            })

        });
        


    }
    allIssueDataSet() ;






  
   }        
   loadAllApi() ;




           

