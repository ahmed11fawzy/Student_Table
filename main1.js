let nameAlert = document.querySelector(".danger");
let ageAlert = document.querySelectorAll(".danger")[1];
let emailAlert = document.querySelectorAll(".danger")[2];
let passwordAlert = document.querySelectorAll(".danger")[3];
let inputFields = document.querySelectorAll(".inputControl");
let studentCount=1;
let arrayOfStudents=[];
let tableBody ;
let tableRow  ;
let isValid =true;
let updatingBtn;
let formUpdateBtn=document.querySelector('#update');
let deletingBtn;
let studentIndex;




function validateForm(inputFields) {
    isValid = true;
    for(let i = 0; i < inputFields.length; i++) {
        if(inputFields[i].value == "" && inputFields[i].required) {
            inputFields[i].classList.add("error");
            nameAlert.style.display = "block";
            ageAlert.style.display = "block";
            emailAlert.style.display = "block";
            passwordAlert.style.display = "block";
            isValid = false;
        } else {

            if(nameValidation()&& ageValidation()&& emailValidation()&& passwordValidation()){
                inputFields[i].classList.remove("error");
                isValid = true;
            }
        }

    }
    return isValid ;
}

document.querySelector("#add").addEventListener("click", function(e) { 

    e.preventDefault();

    validateForm(inputFields);
    if(validateForm(inputFields)) {


        

        getStudentData(inputFields[0].value, inputFields[1].value, inputFields[2].value, inputFields[3].value);
        addingStudentToTable(arrayOfStudents);
        
        
        clearInputs(inputFields);
    }
    
    

});


function nameValidation(){
    
        if(inputFields[0].value.length < 3 ) {
            nameAlert.style.display = "block";
            isValid=false;
        }else {
            isValid=true;
            nameAlert.style.display = "none";
        }

        return isValid;
    
}

function ageValidation(){  
    if(inputFields[1].value < 18) {
        ageAlert.style.display = "block";
        isValid=false;
    } else {
        ageAlert.style.display = "none";
        isValid=true;
    }
    return isValid;
}

function alertRemover(inputFields){
    for(let i = 0; i < inputFields.length; i++) {
        
        inputFields[i].addEventListener("focus", function() {
            
                inputFields[i].classList.remove("error");
                inputFields[i].nextElementSibling.style.display = "none";
                
            
        })
    }

}
alertRemover(inputFields);

function emailValidation(){
    if(inputFields[2].value.includes("@") && inputFields[2].value.includes(".")) {
        emailAlert.style.display = "none";
        isValid=true;
    } else {
        emailAlert.style.display = "block";
        isValid=false;
    }
    return isValid;
}
function passwordValidation(){
    if(inputFields[3].value.length < 8) {
        passwordAlert.style.display = "block";
        isValid=false;
    } else {
        passwordAlert.style.display = "none";
        isValid=true;
    }
    return isValid;
}

function getStudentData(stName,stAge,stEmail,stPassword){
    let studentData = {
        id:studentCount ,
        name:stName,
        age:stAge,
        email:stEmail,
        password:stPassword
    }
        console.log(arrayOfStudents);
    return studentData;
} 

function createTableRow(arrayOfStudents){
    
    for(let student in arrayOfStudents){
                
    
        tableRow.innerHTML = `
        <td>${arrayOfStudents[student].id}</td>
        <td>${arrayOfStudents[student].name}</td>
        <td>${arrayOfStudents[student].age}</td>
        <td>${arrayOfStudents[student].email}</td>
        
        <td><button class="btn btn-info">Update</button></td>
        <td><button class="btn btn-danger">Delete</button></td>
        `
    }
    
            tableBody.appendChild(tableRow);
            updatingBtn=document.querySelectorAll(".btn-info");
            deletingBtn=document.querySelectorAll(".btn-danger");
            studentCount++;
}
function addingStudentToTable(arrayOfStudents){
    tableBody = document.querySelector("tbody");
    tableRow = document.createElement("tr");
    if(preventDuplication(getStudentData(inputFields[0].value, inputFields[1].value, inputFields[2].value, inputFields[3].value))){
        

        arrayOfStudents.push(getStudentData(inputFields[0].value, inputFields[1].value, inputFields[2].value, inputFields[3].value))
        
        
        if(arrayOfStudents.length>0){

            
            createTableRow(arrayOfStudents)
            updatingStudentData(arrayOfStudents);
            removeStudentData(arrayOfStudents);
        }
        else{
            tableBody.innerHTML="";
        }
    }
}
function clearInputs(inputFields){
    for(let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
}


function updatingStudentData(arrayOfStudents){
    

    for(let i=0;i<arrayOfStudents.length;i++){
        updatingBtn[i].addEventListener("click",function(e){
            studentIndex=i;
            inputFields[0].value=arrayOfStudents[i].name;
            inputFields[1].value=arrayOfStudents[i].age;
            inputFields[2].value=arrayOfStudents[i].email;
            inputFields[3].value=arrayOfStudents[i].password;
            
            formUpdateBtn.style.display='block';
            document.querySelector('#add').setAttribute('disabled',true);
            deletingBtn[i].setAttribute('disabled',true);
            
        })
    }
}
function removeStudentData() {
   
    
    deletingBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            studentIndex = Array.from(deletingBtn).indexOf(btn);
            deleteStudentFromTable(studentIndex);
        });
    });
}




function preventDuplication(studentData){
    arrayOfStudents.forEach(element => {
        if(element.name===studentData.name && element.email===studentData.email){
            alert("name already exist");
            alert("email already exist");
            isValid=false
        }
        else{
            
            isValid=true;
        }
    })

    return isValid;
}


function updateStudentData(studentIndex){
    studentCount--;
    if(preventDuplication(getStudentData(inputFields[0].value, inputFields[1].value, inputFields[2].value, inputFields[3].value))){
        for(let i =0;i<arrayOfStudents.length;i++){
            if(i===studentIndex){
                arrayOfStudents[i]=getStudentData(inputFields[0].value, inputFields[1].value, inputFields[2].value, inputFields[3].value);
                deletingBtn[i].removeAttribute('disabled');
            }
        }
        createTableRow(arrayOfStudents);
        
        clearInputs(inputFields);
        document.querySelector('#add').removeAttribute('disabled');
        
        formUpdateBtn.style.display='none';
        alert('student updated !! ')
        updatingStudentData(arrayOfStudents)
        removeStudentData(arrayOfStudents)
    }
    else{
        alert('No changes detected !')
    }


}


formUpdateBtn.addEventListener('click',function(e){ 
    updateStudentData(studentIndex);
})


function deleteStudentFromTable(studentIndex){
    studentCount=studentCount-1;
    console.log(studentIndex);
    arrayOfStudents.splice(studentIndex,1);
    console.log(arrayOfStudents)
    tableRow.innerHTML = `` ;
    createTableRow(arrayOfStudents);
    alert('student deleted !! ')
    
    
}