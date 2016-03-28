function onOpen() {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() 
      .createMenu('備考')
      .addItem('備考', 'openDialog')
      .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('selectDetail').setSandboxMode(HtmlService.SandboxMode.IFRAME);
       SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Dialog title');
} 

function processForm(formObject) {
  var str = "";
  if(formObject){
    
    if(formObject.cb){
      if(Array.isArray(formObject.cb)){
      for(var i=0; i < formObject.cb.length; i++){
        str += formObject.cb[i]+"\n";
      }
      }else{
       str +=formObject+"\n";
      }
    }
    
    if(formObject.other){
      str += formObject.other;
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var cols = sheet.getActiveCell().getColumn();
    var rows = sheet.getActiveCell().getRow();
    sheet.getRange('A1').offset(rows-1,cols-1).setValue(str);
  }
  
}
