document.getElementsByTagName("h1")[0].innerHTML = "Hello world"
browser.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log("Recieved from notifier")
		console.log(request.data.content)

	}
);

browser.runtime.sendMessage({
	msg: "Send frompopup",
	data: {
		subject: "Loading",
		content: "Just completed!"
	}
});