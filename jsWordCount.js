/*
Free Software: see license.txt Copyright (c) 2011 Rich Boakes
*/
var jsWordCount = (function () {
	"use strict";
	var
		annotatedElements = ['ARTICLE', 'SECTION', 'P'],
		countWordsInText = function (str) {
			var localCount = 0,
				words = str.trim().split(" "),
				i;
			for (i = 0; i < words.length; i++) {
				if (words[i].trim().length > 0) {
					localCount++;
				}
			}
			return localCount;
		},
		countWordsInElement = function (node) {
			var localCount = 0, i;
			for (i = 0; i < node.childNodes.length; i++) {
				switch (node.childNodes[i].nodeType) {
				case 1:
					localCount += countWordsInElement(node.childNodes[i]);				
					if (annotatedElements.indexOf(node.nodeName) >= 0) {
						node.setAttribute("data-jsWordCount", localCount);
					}
					break;
				case 3:
					localCount += countWordsInText(node.childNodes[i].textContent);
					break;
				}
			}
			return localCount;
		},
		annotate = function () {
			var topLevelCountables = document.querySelectorAll("article"),
				i;
			for (i = 0; i < topLevelCountables.length; i++) {
				countWordsInElement(topLevelCountables[i]);
			}
		};
	return {
		annotate: annotate
	};
}());

window.addEventListener("load", jsWordCount.annotate);
