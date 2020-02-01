var script = document.createElement('script');
script.src = "https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js";
document.getElementsByTagName('head').item(0).appendChild(script);

script = document.createElement('script');
script.src = "https://www.gstatic.com/firebasejs/7.7.0/firebase-analytics.js";
document.getElementsByTagName('head').item(0).appendChild(script);

script = document.createElement('script');
script.src = "https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js";
document.getElementsByTagName('head').item(0).appendChild(script);

script.onload = function () {
	var firebaseConfig = {

	};
	// Initialize Firebase
	try {
		const app = firebase.initializeApp(firebaseConfig);
		firebase.analytics();
		var appDb = firebase.database().ref();
		const applicationState = {
			values: []
		};
		appDb.on('child_added', snapshot => {
			applicationState.values.push({
				id: snapshot.key,
				value: snapshot.val()
			});
			updateState(applicationState);
		});

	} catch (e) {
		console.log(e)
	}

	function updateState(applicationState) {
		console.log({
			state: JSON.stringify(applicationState)
		});
		browser.notifications.create({
			"type": "basic",
			"title": "title",
			"message": "content"
		});
	}

	browser.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			browser.runtime.sendMessage({
				msg: "sended from notifier",
				data: {
					subject: "Loading",
					content: "sended from notifier completed!"
				}
			});

		}
	);

};