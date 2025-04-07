<!-- Подключаем js-cookie -->
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>

<script>
    const googleTranslateConfig = {
        lang: "ru", // Язык по умолчанию
        domain: "kurdorganization.tilda.ws"
    };

    function TranslateInit() {
        let code = TranslateGetCode();

        // Находим активный флаг
        const activeLangEl = document.querySelector('[data-google-lang="' + code + '"]');
        if (activeLangEl) {
            activeLangEl.classList.add('language__img_active');
        }

        // Инициализируем Google Translate
        new google.translate.TranslateElement({
            pageLanguage: googleTranslateConfig.lang,
        });

        // Обработчик кликов на флаги
        TranslateEventHandler('click', '[data-google-lang]', function (el) {
            const targetLang = el.getAttribute("data-google-lang");

            // Если текущий язык уже выбран, не делаем ничего
            if (targetLang === code) return;

            // Обновляем куку с новым языком
            const newCookieVal = "/" + googleTranslateConfig.lang + "/" + targetLang;
            TranslateCookieHandler(newCookieVal, googleTranslateConfig.domain);

            // Перезагружаем страницу для применения нового языка
            window.location.reload();
        });
    }

    function TranslateGetCode() {
        // Если куки нет, то передаем дефолтный язык
        const cookie = Cookies.get('googtrans') || "/";
        const match = cookie.match(/(?!^\/)[^\/]*$/gm);
        return match ? match[0] : googleTranslateConfig.lang;
    }

    function TranslateCookieHandler(val, domain) {
        // Записываем куки для выбранного языка
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

<!-- Google Translate -->
<script src="//translate.google.com/translate_a/element.js?cb=TranslateInit"></script>
