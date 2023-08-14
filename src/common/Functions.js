export const validar = (inputs) =>{
   
    let errores = {}
    let regexName = /^[a-z0-9_ -]*$/i
   

    if(inputs.name.length < 5 || !regexName.test(inputs.name) || inputs.name.length>30){
        errores.name = "Name must be 5 to 30 characters long without any special character"
    } else if(inputs.name.length >= 5 && regexName.test(inputs.name) && inputs.name.length<30){delete errores.name}
    if(inputs.difficulty === 0){ errores.difficulty = "Please select difficulty"}
    else if(inputs.difficulty !== 0){delete errores.difficulty}
    if(inputs.duration === 0  || inputs.duration > 10){
        errores.duration = "Duration must be between 1 and 10 hours"
    } else if (inputs.duration !== 0 && inputs.duration <= 10){
        delete errores.duration
    }
    if(inputs.season === ""){
        errores.season = "Please select season"
    } else if( inputs.season !== ""){delete errores.season}
    if(inputs.countryId.length === 0 ){
        errores.countryId = "Please select at least one country"
    } else if( inputs.countryId.length !== 0){delete errores.countryId}
    if(inputs.imageURL === "error"){
        errores.imageURL = "Please enter a valid image URL"
    }
    if(inputs.description.length > 200){
        errores.description = "Description text must be less than 200 characters"
    } else if(!inputs.description || inputs.description.length <= 200){
        delete errores.description
    }
    
    return errores
}

export const sliceData = (data,page,maxPageData) => {
    return data.slice((page-1)*maxPageData,page*maxPageData)
}

export const slicePage = (data,currentPage,maxPages) => {
  if(currentPage === 1){
    return data.slice(currentPage,currentPage+maxPages+2)
  }
  if(currentPage === 2){
    return data.slice(currentPage-1,currentPage+maxPages+1)
  }
  else if(currentPage <= 3){
    return data.slice(currentPage-2,currentPage+maxPages)
  }
    return data.slice(currentPage-3,currentPage+maxPages)
}