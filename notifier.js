let script = document.createElement('script');
script.src = "https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js";
document.getElementsByTagName('head').item(0).appendChild(script);

script = document.createElement('script');
script.src = "https://www.gstatic.com/firebasejs/7.7.0/firebase-analytics.js";
document.getElementsByTagName('head').item(0).appendChild(script);

script = document.createElement('script');
script.src = "https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js";
document.getElementsByTagName('head').item(0).appendChild(script);

script.onload = function () {
	let firebaseConfig = {
		apiKey: "api_key",
		authDomain: "auth_domain",
		databaseURL: "db_url",
		projectId: "product_id",
		storageBucket: "storage_bucket",
		messagingSenderId: "msg_senderId",
		appId: "appId",
		measurementId: "measurementId"
	};
	// Initialize Firebase
	try {
		const app = firebase.initializeApp(firebaseConfig);
		firebase.analytics();
		let getAllpkg = firebase.database().ref();
		getAllpkg.on('child_added', snapshot => {
			pkg_listener(snapshot.key);
		})

	} catch (e) {
		console.log(e)
	}


	function pkg_listener(id) {
		let appDb = firebase.database().ref(id);
		appDb.on('child_added', snapshot => {
			create_listener(id, snapshot.key)
		});
	}

	function create_listener(parentId, id) {
		let appDb = firebase.database().ref(parentId + "/" + id);
		appDb.on('value', snapshot => {
			let dates = Object.keys(snapshot.val());
			dates.sort((a, b) => (new Date(b) - new Date(a)))
			updateState(id, snapshot.val()[dates[0]] + "\n" + snapshot.val()[dates[1]]);
		});
	}

	function updateState(id, message) {
		//	console.log(id + " " + message);
		browser.notifications.create({
			"type": "basic",
			"title": id,
			"message": message
		});
	}

	function fetchAllAppMeta() {
		let appName = firebase.database().ref();
		appName.on('value', snapshot => {
			//console.log(snapshot.val())
			browser.runtime.sendMessage({
				msg: snapshot.val()
			});
		});
	}

	browser.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			if (request.key === "GetAllAppNotification")
				fetchAllAppMeta();
		}
	);

};