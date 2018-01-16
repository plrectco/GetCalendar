function ready() {   // Load the function after DOM ready.
// alert("ready");
var tt = document.getElementById("list-id-table").rows;
var table = [];
// alert(tt);
for (var i = 1; i < tt.length; i++) {
  var r = [];

  for (var j = 0; j < 22; j++) {
    var temp = tt[i].cells[j]
    if((j == 9 || j == 10) && temp.hasChildNodes()){
      temp = temp.childNodes[0];
    }
    r.push(temp.innerHTML);
  }
  table.push(r);
}
var dLookup = {'MO':1, 'TU': 2, 'WE':3, 'TH':4, 'FR':5};

var tpattern = "(.*):(.*)(a|p)-(.*):(.*)(a|p)";
var cal = ics();

for (var i = 0; i < table.length; i++) {
  var subject, description, location, begin, end, count, rrule, byday, timeDetails;
  var beginDate = new Date("01/08/2018");

  subject = table[i][0].trim();
  if(subject == "") continue;
  description = table[i][1].trim();
  location = table[i][9] + table[i][10];

  byday = table[i][7].split(/(?=[A-Z])/);
  byday = byday.map(function(x){
    switch(x) {
      case 'M': return 'MO';
      case 'W': return 'WE';
      case 'F': return 'FR';
      default: return x.toUpperCase();
    }
  })
  count = 10*byday.length;

  timeDetails = table[i][8].trim().match(tpattern);
  if(timeDetails[3]=='p') { timeDetails[1] = String(parseInt(timeDetails[1])+12);}
  if(timeDetails[6]=='p') { timeDetails[4] = String(parseInt(timeDetails[4])+12);}
  beginDate.setDate(beginDate.getDate() + (dLookup[byday[0]] - beginDate.getDay()) % 7);
  begin = beginDate.setHours(timeDetails[1],timeDetails[2]);
  end = beginDate.setHours(timeDetails[4],timeDetails[5]);

  rrule = {"freq":"WEEKLY", "count":count, "byday":byday};
  console.log("adding event: "+subject+ " in " + location + " at " + begin+ " to "+ end);
  console.log("Repeat every " + byday);
  cal.addEvent(subject, description, location, begin, end, rrule);

}

cal.download("1.ics");

}
document.onload = ready();
