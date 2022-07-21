let playingCard =['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
let mainCard= ['heart','diamond','spade','club']
let mainCardValue={
    'heart':'DD',
    'spade':'HH',
    'club':'CC',
    'diamond':'SS'
}

let mainCardValueimg={
    'DD':'heart',
    'HH':'spade',
    'CC':'club',
    'SS':'diamond'
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
    .then(data =>  data.success ? data : false).then(res => {
        if (res) {
            window.location.reload();
        } else {
            duplicatealert()
        }    
    });
    


}

function duplicatealert(){
    $.uiAlert({
    textHead: "Duplicate Entry Exists", // header
    text: 'Duplicate Entry', // Text
    bgcolor: '#DB2828', // background-color
    textcolor: '#fff', // color
    position: 'top-right',// position . top And bottom ||  left / center / right
    icon: 'remove circle', // icon in semantic-UI
    time: 2, // time
      })
};


function uploadmodal(){ 
    $('.ui.modal').modal('show');
}


function uploadexcel() {
    var form_data = new FormData($('#upload-file')[0]);
    $("#upload-file-btn").addClass("loading");
    $.ajax({
        type: 'POST',
        url: '/uploadajax',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            if ( data["data"] == null){
                swal("File Uploaded Successfully", "", "success")
            }
            else if (data["success"]){
                const wrapper = document.createElement('div');
                //wrapper.innerHTML = createTable([["row 1, cell 1", "row 1, cell 2"], ["row 2, cell 1", "row 2, cell 2"]]);
                var tableData = data["data"]

                var table = document.createElement('table');
                table.setAttribute("id", "datatable");
                table.innerHTML=`<thead><th>card1</th><th>card2</th><th>card3</th><th>card4</th><th>card5</th><th>card6</th><th>winner</th></thead>`
                var tableBody = document.createElement('tbody');
              
                tableData.forEach(function(rowData) {
                  var row = document.createElement('tr');
              
                  rowData.forEach(function(cellData) {
                    var cell = document.createElement('td');
                    console.log(cellData);
                    if (cellData.startsWith("Player") || cellData.startsWith("player")){
                    var winner = document.createTextNode(cellData);     
                    cell.appendChild(winner);
                    }
                    else{
                    var img = document.createElement('img');
                    img.style.width = "20px";
                    img.style.height = "20px";
                    //var textofcard = document.createTextNode(cellData[0]);
                    img.src = 'https://d1arlbwbznybm5.cloudfront.net/v1/static/front/images/cards/'+cellData+'.png';
                    //cell.appendChild(textofcard);
                    img.setAttribute("title", cellData.slice(0,-2)+" "+mainCardValueimg[cellData.slice(-2)]);
                    cell.appendChild(img);
                    }
                    row.appendChild(cell);
                  });
              
                  tableBody.appendChild(row);
                });
              
                table.appendChild(tableBody);
                swal({
                title: 'File Uploaded Successfully...',
                text: 'Below Duplicate Entries Found...',
                content: table
                });
                $('#datatable').DataTable( {
                    dom: 'Bfrtip',
                    buttons : [
                        { 
                        extend : 'pdfHtml5',
                        exportOptions : {
                            stripHtml: false,
                            format: {
                                body: function(data, col, row) {
                                    var isImg = ~data.toLowerCase().indexOf('img') ? $(data).is('img') : false;
                                    if (isImg) {
                                        return $(data).attr('title');
                                    }
                                    return data;
                                }
                            }
                        }
                }]
                });
                
            }
            else{
                sweetAlert("Oops...", data["error"], "error");
            }
            $("#upload-file-btn").removeClass("loading");
        }
        
    });
}

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode("Hi"));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }
  
  