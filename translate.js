// const googleTranslateConfig = {
// 	lang: "ru",
// 	testWord: "Язык",
// };

// document.addEventListener("DOMContentLoaded", () => {
// 	let script = document.createElement("script");
// 	script.src = `//translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
// 	document.head.appendChild(script);
// });

// function TranslateWidgetIsLoaded() {
// 	TranslateInit(googleTranslateConfig);
// }

// function TranslateInit(config) {
// 	if (config.langFirstVisit && !Cookies.get("googtrans")) {
// 		TranslateCookieHandler("/auto/" + config.langFirstVisit);
// 	}

// 	let code = TranslateGetCode(config);

// 	TranslateHtmlHandler(code);

// 	if (code === config.lang) {
// 		TranslateCookieHandler(null);
// 	}

// 	if (config.testWord) TranslateMutationObserver(config.testWord, code === config.lang);

// 	new google.translate.TranslateElement({
// 		pageLanguage: config.lang,
// 		multilanguagePage: true,
// 	});

// 	TranslateEventHandler("click", 'a[href^="#translate:"]', (el) => {
// 		const lang = el.getAttribute("href").split(":")[1];
// 		TranslateCookieHandler("/" + googleTranslateConfig.lang + "/" + lang);
// 		window.location.reload();
// 	});
// }

// function TranslateGetCode(config) {
// 	let lang = Cookies.get("googtrans") || config.lang;
// 	return lang.match(/(?!^\/)[^\/]*$/gm)[0];
// }

// function TranslateCookieHandler(val) {
// 	const hostname = location.hostname;

// 	const cookieOptions = {
// 		domain: hostname,
// 		path: "/",
// 	};

// 	const domainsToClear = [
// 		hostname,
// 		"." + hostname,
// 	];

// 	console.log("[TranslateCookieHandler] Очистка googtrans cookies для:", domainsToClear);
// 	console.log("[TranslateCookieHandler] Устанавливаем новое значение:", val);

// 	domainsToClear.forEach((d) => {
// 		Cookies.remove("googtrans", { domain: d, path: "/" });
// 		console.log(`[TranslateCookieHandler] Удалена кука для домена: ${d}`);
// 	});

// 	if (val) {
// 		Cookies.set("googtrans", val, cookieOptions);
// 		console.log(`[TranslateCookieHandler] Установлена кука: ${val} для домена: ${hostname}`);
// 	}
// }

// function TranslateEventHandler(event, selector, handler) {
// 	document.addEventListener(event, function (e) {
// 		let el = e.target.closest(selector);
// 		if (el) handler(el);
// 	});
// }

// function TranslateHtmlHandler(code) {
// 	let activeLangEl = document.querySelector('[data-google-lang="' + code + '"]');
// 	if (activeLangEl) {
// 		activeLangEl.classList.add("language__img_active");
// 	}
// }

// function TranslateMutationObserver(word, isOrigin) {
// 	if (isOrigin) {
// 		document.dispatchEvent(new CustomEvent("FinishTranslate"));
// 	} else {
// 		let div = document.createElement('div');
// 		div.id = 'googleTranslateTestWord';
// 		div.innerHTML = word;
// 		div.style.display = 'none';
// 		document.body.prepend(div);

// 		let observer = new MutationObserver(() => {
// 			document.dispatchEvent(new CustomEvent("FinishTranslate"));
// 			observer.disconnect();
// 		});

// 		observer.observe(div, {
// 			childList: false,
// 			subtree: true,
// 			characterDataOldValue: true
// 		});
// 	}
// }
