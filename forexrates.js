//Include dependency npm packages
const async = require('async');
const request = require('request');
const prompt = require('prompt');
const prettyjson = require("prettyjson");
	//var date1 = process.argv[2];
	//var date2 = process.argv[3];
	var schema = {
		properties: {
		  date1: { 
			pattern: /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/,
			message: 'Date must be yyyy-mm-dd format',
			required: true
		  },
		  date2: {
			pattern: /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/,
			message: 'Date must be yyyy-mm-dd format',
			required: true
		  }
		}
	  };
	console.log("\n");
	//Getting user inputs
	prompt.start();
	prompt.get(schema, function (err, result) {
		// Log the results     
		var date1 = result.date1;
		var date2 = result.date2;
		//Form the api urls
		const urls= [
			  "http://api.fixer.io/"+date1,
			  "http://api.fixer.io/"+date2
			];
			
		if(date1 && date2) {	
			async.map(urls, httpGet, function (err, res) {
			  if (err)
				return console.log(err);
			  else		
				finddifference(res);	    
			})
		}
		else {
			console.log("Insufficient Data");
		}	
	 });
	
	//Prototype function to compare arrays
	Array.prototype.diff = function(a) {
		return this.filter(function(i) { return a.indexOf(i) < 0; });
	}
	
	function httpGet(url, callback) {
	  const options = {
		url :  url,
		json : true
	  };
	  
	  request(options,
		function(err, res, body) {
		  callback(err, body);
		}
	  );
	}
	
	//Find the value variation of forexrates
	function finddifference(r){	
		 var result={};	 
		 var keys1 = Object.keys(r[0].rates);
		 var keys2 = Object.keys(r[1].rates);				 
		 var totalkeys1 = keys1.length;
		 var totalkeys2 = keys2.length;
		 
		 if(totalkeys1==totalkeys2)
		 {
			for (var i=0;i<totalkeys1;i++) {			 
			  val1 = keys1[i];
			  
				for (var j=0;j<totalkeys2;j++) {
					val2 = keys2[j];
					
					if(val1==val2) {
					result[val1] = (r[0].rates[val1]-r[1].rates[val2]).toFixed(2);
					}						
				}			   
			}					 
			  console.log("\n");
			  console.log("-----------------------");
			  console.log("----  Forex Rates  ----");
			  console.log("-----------------------");
			  console.log(prettyjson.render(result));
			  console.log("-----------------------");
		 }
	}
