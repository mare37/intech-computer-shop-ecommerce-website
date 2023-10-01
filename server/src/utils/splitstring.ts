





function splitString(splitString: any){

    console.log(splitString);


    
    let originalString = splitString;
    let separatedArray = [];
    let i
      
     // Index of end of the last string
     let previousIndex = 0;
      
     for (i = 0; i < originalString.length; i++) {
      
         // Check the character for a comma
         if (originalString[i] == ",") {
          
             // Split the string from the last index
             // to the comma
            let separated = originalString.slice(previousIndex, i);
             separatedArray.push(separated);
      
             // Update the index of the last string
             previousIndex = i + 1;
         }
     }
      
     // Push the last string into the array
     separatedArray.push(originalString.slice(previousIndex, i));
      
     console.log(separatedArray);

     return separatedArray

    




}


export default splitString