function formatReadableDate() {
var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'PM' : 'AM',
    months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var readableDate = days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear();
	var readableTime = hours+':'+minutes+ampm;
	document.getElementById('date').innerHTML = readableDate;
	document.getElementById('time').innerHTML = readableTime;
	
}

function bookDesk(deskID) {
	if (document.getElementById(deskID).style.backgroundColor == "red") {
		localStorage.setItem(deskID + "-booktime", (Number(localStorage.getItem(deskID + "-booktime")) + 1800));
		document.getElementById(deskID + "-book").innerHTML = new Date(localStorage.getItem(deskID + "-booktime") * 1000).toISOString().substr(11, 8);
	} else {
		localStorage.setItem(deskID + "-booktime", "3600");
		document.getElementById(deskID).style.backgroundColor = "red";
		document.getElementById(deskID + "-checkout").style.display = "block";
		document.getElementById(deskID + "-book").innerHTML = new Date(localStorage.getItem(deskID + "-booktime") * 1000).toISOString().substr(11, 8);
		document.getElementById(deskID + "-status").innerHTML = "Booked";
		var deskCountdown = setInterval(function() {
			if ((document.getElementById(deskID).style.backgroundColor == "green") || (localStorage.getItem(deskID + "-booktime") == 0)) {
				clearInterval(deskCountdown);
				checkoutDesk(deskID);
			} else {
				localStorage.setItem(deskID + "-booktime", (Number(localStorage.getItem(deskID + "-booktime")) - 1));
				document.getElementById(deskID + "-book").innerHTML = new Date(localStorage.getItem(deskID + "-booktime") * 1000).toISOString().substr(11, 8);
			}
		}, 1000);
	}
}

function checkoutDesk(deskID) {
	localStorage.removeItem(deskID + "-booktime");
	document.getElementById(deskID).style.backgroundColor = "green";
	document.getElementById(deskID + "-checkout").style.display = "none";
	document.getElementById(deskID + "-book").innerHTML = "Tap to Book";
	document.getElementById(deskID + "-status").innerHTML = "Available";
}

window.onload = function() {            
    setInterval("formatReadableDate()",500)
}