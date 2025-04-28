// Internal Variable 
 var myInternalVariable = "This is an Internal Variable"; 
 // Variable Can be accessible outside 
 var myExternalVariable = "This is an External Variable"; 
 // Internal Function 
 function myInternalFun() { 
	 // Code Goes here 
 } 
 // Function Can be accessible outside  
 function myExternalFun (data) { 
	 // Code Goes here 
	  return data; 
 }; 
 
ExportModule = { 
	myExternalFun: myExternalFun, 
	myExternalVariable: myExternalVariable 
 };