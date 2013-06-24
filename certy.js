  var data = []; 

  var output=new String("string");
	var bib;	
	var pos ;


 $(document).ready(function () {
   $('#downloadButton').click(function() { 
    //Read CSV file
        $.ajax({
            type: "GET",
            url: "ParticipantList.csv",
            dataType: "text",
            success: function(data){
                data = processData(data);
            }
        }); //end of ajax call
	  });//end of button click
 });// end of document.ready


//parse through each line in CSV for searching 
function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
	var lines = []; 
  var headers = allTextLines[0].split(',');

  for (var i=1; i<allTextLines.length; i++) {
    var data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        var tarr = [];
          for (var j=0; j<headers.length; j++) {
            tarr.push(data[j]);
          }
          lines.push(tarr);
      }//end of IF
  } //end of for

	bib = document.getElementById('bib').value;
	searchData(lines, bib);
}//end of process data


function searchData(data, search){
  var tempArray = [];
  for(i=0; i<data.length; i++){
    pos = $.inArray(search, data[i]);
        if(pos !== -1){
            tempArray.push(data[i]);
        }
    }
	
  var c = document.getElementById('canvas');
	var context = c.getContext('2d');
  var backgroundImage = new Image();

  backgroundImage.onload = function() {
          DrawScreen();
          DrawText();
  };
  
  backgroundImage.src = "CertificateTemplate.png";

  function DrawScreen() {
    context.drawImage(backgroundImage, 0, 0);
  }

	function DrawText() {
    context.fillStyle = "Black";
    context.font = 'italic 65px Calibri';
    context.textBaseline = 'top';
	  var Name = tempArray[0][0];
	  var Time =  tempArray[0][2];
    context.fillText(Name, 600, 520);
	  context.fillText(Time, 930, 670);
  }
	  
	var FinalCanvas = document.getElementById('canvas');
  var data = FinalCanvas.toDataURL("image/png");
  document.getElementById('canvas').style.display="block";
}
