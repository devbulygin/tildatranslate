<!-- Подключаем js-cookie -->
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>

<!-- Подключаем Google Translate и наш скрипт -->
<script>
    const googleTranslateConfig = {
        lang: "ru", // Язык по умолчанию
        domain: "project12674715.tilda.ws" // Укажи свой домен, если он изменится
    };

    function TranslateInit() {
        let code = TranslateGetCode();

        // Отмечаем активный флаг
        const activeLangEl = document.querySelector('[data-google-lang="' + code + '"]');
        if (activeLangEl) {
            activeLangEl.classList.add('language__img_active');
        }

        // Сохраняем выбранный язык даже если это язык по умолчанию
        TranslateCookieHandler("/" + googleTranslateConfig.lang + "/" + code, googleTranslateConfig.domain);

        // Инициализируем переводчик
        new google.translate.TranslateElement({
            pageLanguage: googleTranslateConfig.lang,
        });

        // Навешиваем обработчик на флаги
        TranslateEventHandler('click', '[data-google-lang]', function (el) {
            const targetLang = el.getAttribute("data-google-lang");
            TranslateCookieHandler("/" + googleTranslateConfig.lang + "/" + targetLang, googleTranslateConfig.domain);
            window.location.reload();
        });
    }

    function TranslateGetCode() {
        let lang = Cookies.get('googtrans') || "/";
        return lang.match(/(?!^\/)[^\/]*$/gm)?.[0] || googleTranslateConfig.lang;
    }

    function TranslateCookieHandler(val, domain) {
        Cookies.set('googtrans', val);
        Cookies.set('googtrans', val, { domain: "." + document.domain });

        if (domain) {
            Cookies.set('googtrans', val, { domain: domain });
            Cookies.set('googtrans', val, { domain: "." + domain });
        }
    }

    function TranslateEventHandler(event, selector, handler) {
        document.addEventListener(event, function (e) {
            const el = e.target.closest(selector);
            if (el) handler(el);
        });
    }
</script>

<!-- Подключаем сам виджет Google Translate -->
<script src="//translate.google.com/translate_a/element.js?cb=TranslateInit"></script>
