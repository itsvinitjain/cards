let playingCard =['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
let mainCard= ['heart','diamond','spade','club']
let mainCardValue={
    'heart':'DD',
    'spade':'HH',
    'club':'CC',
    'diamond':'SS'
}

let playerOneFirstValue,playerOneSecondValue,playerOneThirdValue,
playerTwoFirstValue,playerTwoSecondValue,playerTwoThirdValue =''

function getValue(dropdownValue) {
let value= $(`#${dropdownValue}`).dropdown('get value')
return value
}

$('.ui.dropdown').dropdown();      


$("#floating1").on("click", () =>   playerOneFirstValue= getValue(`dropdownMenu1`)  )
$("#floating2").on("click", () =>   playerTwoFirstValue= getValue(`dropdownMenu2`)  )
$("#floating3").on("click", () =>   playerOneSecondValue= getValue(`dropdownMenu3`)  )
$("#floating4").on("click", () =>   playerTwoSecondValue= getValue(`dropdownMenu4`)  )
$("#floating5").on("click", () =>   playerOneThirdValue= getValue(`dropdownMenu5`)  )
$("#floating6").on("click", () =>   playerTwoThirdValue= getValue(`dropdownMenu6`)  )



function insertDropDownValue(suit,mainSuit,dropDown){
    const itemDiv = document.createElement('div')
    itemDiv.classList.add('item')

    let setValue= mainCardValue[mainSuit]
    setValue=suit+setValue
    //console.log(setValue)

    itemDiv.setAttribute('data-value',setValue)
    itemDiv.innerHTML=`<div class="ui red empty circular label"></div>
                        ${suit} <img src="static/images/${mainSuit}.png">
                       `
    dropDown.append(itemDiv)
}


for(i=1; i<=7;i++){
    
    const dropDown= document.querySelector(`#dropdown${i}`)

    for(let mainSuit in mainCard)
    {
        for(let suit in playingCard)
        {
            let suitValue=playingCard[suit]
            let mainSuitValue=mainCard[mainSuit]

            insertDropDownValue(suitValue,mainSuitValue,dropDown)
        
        }
    }

}


function afterSubmit()
{   

    //$('#dropdown1').empty();

    let radio = $('input[name="radio"]:checked').val();

    console.log(playerOneFirstValue)

    if(playerOneFirstValue === '' || playerOneFirstValue === undefined)
      {
          alert('Please selected Player I first drop down')
          return        
      }

    if(playerOneSecondValue === '' || playerOneSecondValue === undefined)
      {
          alert('Please selected Player I Second drop down')
          return        
      }

    if(playerOneThirdValue === '' || playerOneThirdValue === undefined)
      {
          alert('Please selected Player I Third drop down')
          return        
      }
    
    if(playerTwoFirstValue === '' || playerTwoFirstValue === undefined)
      {
          alert('Please selected Player II First drop down')
          return        
      }
    
     if(playerTwoFirstValue === '' || playerTwoFirstValue === undefined)
      {
          alert('Please selected Player II First drop down')
          return        
      }
    
    if(playerTwoSecondValue === '' || playerTwoSecondValue === undefined)
      {
          alert('Please selected Player II Second drop down')
          return        
      }
    
    if(playerTwoThirdValue === '' || playerTwoThirdValue === undefined)
      {
          alert('Please selected Player II Third drop down')
          return        
      }
    

    let url = '/update'
    let data ={
        card1:playerOneFirstValue,
        card2:playerOneSecondValue,
        card3:playerOneThirdValue,
        card4:playerTwoFirstValue,
        card5:playerTwoSecondValue,
        card6:playerTwoThirdValue,
        winner:$("input[type='radio'][name='radio']:checked").val()
    }
    let method='POST'

    let options={
        method,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(data)
    }
    console.log(data)
    fetch(url,options)
    .then(res => res.json())
    .then(data => console.log(data))
    .then(() =>window.location.reload())


}


