$("#mainForm").submit(function(event) {

    let prefix = $("#prefix").val();
    let body = $("#snippet").val();
    let description = $("#description").val();
    let resultCnt = [];
    let j = "";
    let resultText = ``;

    // Some special charachters should be escaped
    // $ sign is only for php important , for other languages u can get rid of replace function
    body = body.replaceAll('\\', '\\\\').replaceAll('"', '\\\"').replaceAll("$","$$$");

    // check if body text has multiple lines 
    if(body.includes('\n'))
    {
        let splittedBodyCnt = body.split('\n');
      for (let i of splittedBodyCnt) 
      {
        let idx = splittedBodyCnt.indexOf(i);
        if (idx == 0) {
          j = i + '\"' + ',';
        } 
        if (idx != splittedBodyCnt.length -1 && idx != 0 ) {
          j = '\t\"' + i + '\"' + ',';
        }
        if (idx == splittedBodyCnt.length -1) {
          j = '\t\"' + i;

        }
        resultCnt.push(j);
      }

      body = resultCnt.join('\n');
    }
      resultText = `
\t\"` + description + `\": {
\"prefix\": \"` + prefix + `\",
\"body\": [
  \"` + body + `\"
],
\"description\": \"` + description + `\"
},`;

    $("#output").text(resultText).show();
    event.preventDefault();

  });

  // Copy To Clipboard function
  $("#copyBtn").click(function() {
    $("#output").select();
    document.execCommand('copy');
  $("#copyMsg").fadeIn(1500).fadeOut(1000);
  });

  $('[data-toggle="popover"]').popover();  
  
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  }) 