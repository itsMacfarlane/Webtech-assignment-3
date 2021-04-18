function mylogin(e) {
	
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var url = "server.js?username="+username+"&password="+password;

	get(url);

	e.preventDefault();

}
document.getElementsByClassName("login-body__form")[0].addEventListener("submit", mylogin);

function get(url) {

	var req = new XMLHttpRequest();

	req.open("GET", url, true);
	req.onreadystatechange = function () {
		if (req.readyState === 4 && req.status === 200) {
			alert("Welcome to the site, " + req.responseText);
		}
	}
	req.send();
}