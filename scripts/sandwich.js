//create an object to hold information about the sandwich 
let sandwich = {
    toasted: false,
    //store the protein and veggies as arrays inside the object
    protein: [],
    veggies: [],
    //store information about the bread as an object within this object
    bread: {
        kind: "", //an empty string
        glutenFree: false
    }
}

//add an event listener to the "toasted" checkbox
//because this is a very simple function, we don't need to store the element in a variable 
//we can also use an anonymouse function (unnamed) which exists only as part of the
//event listener
document.querySelector("#toasted").addEventListener("change", function(){
    //use a shorthand if statement to ask the question 
    //figure out whether the checkbox is checked or unchecked
    sandwich.toasted = (this.checked) ? true : false;
    //console.log(sandwich);
});

document.querySelector("#gluten").addEventListener("change", function(){
    //use a shorthand if statement to ask the question 
    //figure out whether the checkbox is checked or unchecked
    sandwich.bread.glutenFree = (this.checked) ? true : false;
    //console.log(sandwich);
});

//check the type of bread and add it to the object
//use a classic for loop to add event listeners to all the radio buttons
const breadTypes = document.querySelectorAll('input[name="bread"]');
for(let i=0;i<breadTypes.length; i++){
    breadTypes[i].addEventListener("change", addBread);
}

//the function for adding a bread type to the object
function addBread(){
    //when we're adding the text content, use trim() to remove any
    //space from the beginning or the end of the text
    sandwich.bread.kind = this.parentNode.textContent.trim();}

//add the protein to the array inside fo the object
//users can check and uncheck options, so we have to able to add and remove from the array
const allProtein = document.querySelectorAll(".protein input");
//use a for ... of loop, which doesn't require you to know the length of the array
for(const eachProtein of allProtein){
    console.log(eachProtein);
    //"eachProtein" will temprarily store each of the objects from the array allProtein
    eachProtein.addEventListener("change", addProtein);
}

function addProtein(){
    //get the value of the label and store it in a variable
    const proteinName = this.parentNode.textContent.trim();
    //check to see if the checkbox is checked or unchecked
    if(this.checked){
        //if checked, add this object to the protein array
        sandwich.protein.push(this.parentNode.textContent.trim());
    }else{
        //if unchecked, remove this object from the array
        //first, we have to figure out if the thinig is in the array
        //and if it is, what position it's at 
        const proteinPos = sandwich.protein.indexOf(proteinName);
        //if the object not in the array, indexOf will return -1
        if(proteinPos > -1){
            sandwich.protein.splice(proteinPos, 1);
            //if the position (index) is greater than -1, then the thing is in the array
            //use splice to remove it - splice(position, number of things to remove)
        }
    }
    console.log(sandwich);
}




function addVeggies(){
    //when we're adding the text content, use trim() to remove any
    //space from the beginning or the end of the text
    const veggiesName = this.parentNode.textContent.trim();}

//add the protein to the array inside fo the object
//users can check and uncheck options, so we have to able to add and remove from the array
const allVeggies = document.querySelectorAll(".veggies input");
//use a for ... of loop, which doesn't require you to know the length of the array
for(const eachVeggies of allVeggies){
    console.log(eachVeggies);
    //"eachProtein" will temprarily store each of the objects from the array allProtein
    eachVeggies.addEventListener("change", addVeggies);
}

function addVeggies(){
    //get the value of the label and store it in a variable
    const veggiesName = this.parentNode.textContent.trim();
    //check to see if the checkbox is checked or unchecked
    if(this.checked){
        //if checked, add this object to the protein array
        sandwich.veggies.push(this.parentNode.textContent.trim());
    }else{
        //if unchecked, remove this object from the array
        //first, we have to figure out if the thinig is in the array
        //and if it is, what position it's at 
        const veggiesPos = sandwich.veggies.indexOf(veggiesName);
        //if the object not in the array, indexOf will return -1
        if(veggiesPos > -1){
            sandwich.veggies.splice(veggiesPos, 1);
            //if the position (index) is greater than -1, then the thing is in the array
            //use splice to remove it - splice(position, number of things to remove)
        }
    }
    console.log(sandwich);
}

//add an event listener to the form to see when it is submitted
document.querySelector("form").addEventListener("sumbit", function(event){
    //stop the form from submitting by stopping it's default behaviour
    event.parentDefault();
}
    //validate the form...
    //first check if the user selected a bread type
    if(sandwich.bread.kind == ""){
        //use template literals to create the html for the error
        const messageTemplate = `<p class="red">Your sandwich has to be on bread!</p>`;
        document.querySelector(".order").innerHTML = messageTemplate;
    }else if(sandwich.protein.length == 0 && sandwich.veggies.length == 0){
        //if both toppings arrays are empty, the user didn't select anything
        const messageTemplate = `<p class="red">Your sandwich needs toppings!</p>`;
        document.querySelector(".order").innerHTML = messageTemplate;
    }else{
        //they have both bread and toppings, so confirm ehtier order...
        //create a message that repeats what they wanted

        //turn our boolean values into readable text...
        const toastedM = (sandwich.toasted) ? "toasted" : "";
        const glutenM = (sandwich.bread.glutenFree) ? "gluten free" : "";


        //build a message based on all the things in the object
        const messageTemplate = `<p>You ordered a ${toastedM} sandwich on ${glutenM} ${sandwich.bread.kind} with ${sandwich.protein.join(", ")} and ${sandwich.veggies.join(", ")}.</p>`;
        document.querySelector(".order").innerHTML = messageTemplate;
});
