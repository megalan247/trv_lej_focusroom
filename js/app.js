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
	document.getElementById(deskID + "-book").innerHTML = "Tap to book";
	document.getElementById(deskID + "-status").innerHTML = "Available";
}