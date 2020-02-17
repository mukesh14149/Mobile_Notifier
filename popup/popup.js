let content = undefined;
browser.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		content = request;
		var btn;
		Object.keys(content.msg).forEach((key) => {
			btn = document.createElement("BUTTON");
			btn.innerHTML = key;
			btn.className = "app_name_button" + key;
			document.getElementsByClassName("btn-group")[0].appendChild(btn);
			document.getElementsByClassName("app_name_button" + key)[0].addEventListener('click', (e) => {
				const parent = document.getElementsByClassName("detail-page")[0];
				while (parent.firstChild) {
					parent.firstChild.remove();
				}
				document.getElementsByClassName("btn-group")[0].style['display'] = 'none';
				document.getElementsByClassName("detail-page")[0].style['display'] = 'block';
				presentDatainDetailpage(content.msg[e.target.innerHTML])

			})
		})
	}
);

function presentDatainDetailpage(data) {
	btn = document.createElement("BUTTON");
	btn.innerHTML = "Back";
	btn.className = "detail_back_button"
	document.getElementsByClassName("detail-page")[0].appendChild(btn);
	document.getElementsByClassName("detail_back_button")[0].addEventListener('click', (e) => {
		document.getElementsByClassName("btn-group")[0].style['display'] = 'block';
		document.getElementsByClassName("detail-page")[0].style['display'] = 'none';
	})
	Object.keys(data).forEach((key) => {
		div = document.createElement("DIV");
		div.innerHTML = key;
		list = document.createElement("UL");
		div.appendChild(list);
		uniqueList = [];
		Object.keys(data[key]).forEach((msgId) => {
			if (!uniqueList.includes(data[key][msgId])) {
				li = document.createElement("LI");
				li.innerHTML = data[key][msgId];
				list.appendChild(li);
				uniqueList.push(data[key][msgId]);
			}
		})
		document.getElementsByClassName("detail-page")[0].appendChild(div);
	})
}

browser.runtime.sendMessage({
	key: "GetAllAppNotification"
});