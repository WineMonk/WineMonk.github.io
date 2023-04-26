/* jshint browser: true */


(function(window, document) {
	function myFunction(window, document) {
		var xmlhttp = new XMLHttpRequest();
		var url =
			"https://api.github.com/repos/winemonk/winemonk.github.io/issues/comments?sort=updated&direction=desc&per_page=3&page=1";
		var type = "GET";
		xmlhttp.open(type, url, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
				var result = JSON.parse(xmlhttp.response);
				for (var i = 0; i < result.length; i++) {
					var comment_info = result[i];

					var sidebarcommentDiv = document.getElementById("user-sidebarcomment");

					var divEle_top = document.createElement("div");

					// post
					var divEle_post = document.createElement("div");
					var issue_url = comment_info.issue_url;
					var xmlhttp_issue = new XMLHttpRequest();
					xmlhttp_issue.open(type, issue_url, false);
					xmlhttp_issue.send();
					var result_issue = JSON.parse(xmlhttp_issue.response);
					var post_title = result_issue.title;

					var iEle_title = document.createElement("i");
					iEle_title.textContent = "文章："
					divEle_post.appendChild(iEle_title);

					var aEle_title = document.createElement("a");
					aEle_title.textContent = post_title;
					var result_issue_body = result_issue.body;
					var line_break = undefined;
					var result_issue_post_url = undefined;
					if (result_issue_body.indexOf("\r\n") != -1) {
						line_break = "\r\n";
					} else if (result_issue_body.indexOf("\n") != -1) {
						line_break = "\n";
					} else if (result_issue_body.indexOf("\r") != -1) {
						line_break = "\r";
					}
					if (result_issue_body.indexOf(" ") != -1) {
						result_issue_post_url = result_issue_body.split(" ")[0];
					}
					if (line_break != undefined) {
						result_issue_post_url = result_issue_body.split(line_break)[0];
					}
					if (result_issue_post_url == undefined) {
						result_issue_post_url = result_issue_body;
					}

					aEle_title.href = result_issue_post_url;
					divEle_post.appendChild(aEle_title);
					divEle_post.appendChild(document.createElement("br"));
					divEle_top.appendChild(divEle_post);
					// post

					//user
					var divEle_user = document.createElement("div");
					var iUserEle = document.createElement("i");
					iUserEle.textContent = "用户：";
					divEle_user.appendChild(iUserEle);

					var imgEle = document.createElement("img");
					imgEle.height = 30;
					imgEle.width = 30;
					imgEle.src = comment_info.user.avatar_url;
					divEle_user.appendChild(imgEle);

					var aUserEle = document.createElement("a");
					aUserEle.textContent = comment_info.user.login;
					aUserEle.href = comment_info.user.html_url;
					divEle_user.appendChild(aUserEle);

					divEle_user.appendChild(document.createElement("br"));
					divEle_top.appendChild(divEle_user);
					//user

					//content
					var divEle_content = document.createElement("div");
					var iContentEle = document.createElement("i");
					iContentEle.textContent = "内容：";
					divEle_content.appendChild(iContentEle);

					var aEle = document.createElement("a");
					var comment_info_body = comment_info.body;
					if (comment_info_body.length > 45) {
						comment_info_body = comment_info_body.substring(0, 44) + "...";
						aEle.title = comment_info.body;
					}
					aEle.text = comment_info_body;
					aEle.href = comment_info.html_url;
					divEle_content.appendChild(aEle);
					divEle_top.appendChild(divEle_content);
					//content


					divEle_top.style.marginBottom = "30px";

					sidebarcommentDiv.appendChild(divEle_top);
				}
			}
		};
	}
	myFunction(window, document);

})(window, document);