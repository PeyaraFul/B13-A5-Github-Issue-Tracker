
// login part
const userName = document.getElementById('username');
const loginPassword = document.getElementById('password');

function goHomePage(p){
if(userName.value === 'admin' && loginPassword.value === 'admin123'){
       
        // window.location.assign('./homePage.html') ;
         alert('login successfully') ;
    }
    else{
        alert('login unsuccessful')
    }
     
}
console.log('kjdklfjdjfedj')