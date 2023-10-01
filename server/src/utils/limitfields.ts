





function limitFields (fieldsArray: any[], productsArray:any[]){
 


    let finalSortedArray1 = new Array();

    //  finalSortedArray.filter()

      for (let i = 0; i < productsArray.length; i++) {
        // console.log("outer loop running");
        let object: any = {};
       

        for (let j = 0; j < fieldsArray.length; j++) {
          //  console.log(splitedString[j]   );

          for (const [key, value] of Object.entries(
            productsArray[i].toJSON()
          )) {

           // if(splitedString[j][0] !== "-"  ){}
            if (key ===fieldsArray[j]) {
              //console.log(finalSortedArray[i]._id.toString());
              
              object._id = productsArray[i]._id.toString();
              object[fieldsArray[j]] = value;

            
             


              console.log(`${key}: ${value}`);
            }
            // console.log(`${key}: ${value}`);
          }

          //  const finalSortedArray1 = new Array()
         

          // console.log(obj);
        }

        finalSortedArray1.push(object);

        console.log(
          "NEWLINE-----------------------------------------------------------"
        );
      }


      return finalSortedArray1;





}


export default limitFields