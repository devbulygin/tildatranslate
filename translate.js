<!-- Подключаем js-cookie -->
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>

<!-- Скрипт с логами -->
<script>
    const googleTranslateConfig = {
        lang: "ru",
        domain: "kurdorganization.tilda.ws"
    };

    function TranslateInit() {
        console.log("🔁 TranslateInit запускается...");

        let code = TranslateGetCode();
        console.log("🌍 Язык из куки / по умолчанию:", code);

        // Активируем флаг
        const activeLangEl = document.querySelector('[data-google-lang="' + code + '"]');
        if (activeLangEl) {
            activeLangEl.classList.add('language__img_active');
            console.log("✅ Активный флаг найден и выделен:", code);
        } else {
            console.warn("⚠️ Флаг не найден для языка:", code);
        }

        // Устанавливаем куку даже если это язык по умолчанию
        const cookieVal = "/" + googleTranslateConfig.lang + "/" + code;
        console.log("🍪 Устанавливаем куку:", cookieVal);
        TranslateCookieHandler(cookieVal, googleTranslateConfig.domain);

        // Инициализация Google Translate
        console.log("📦 Инициализация виджета Google Translate...");
        new google.translate.TranslateElement({
            pageLanguage: googleTranslateConfig.lang,
        });

        // Обработчик клика по флагу
        TranslateEventHandler('click', '[data-google-lang]', function (el) {
            const targetLang = el.getAttribute("data-google-lang");
            const newCookieVal = "/" + googleTranslateConfig.lang + "/" + targetLang;

            console.log("🖱 Клик по языку:", targetLang);
            console.log("🍪 Устанавливаем новую куку:", newCookieVal);
            TranslateCookieHandler(newCookieVal, googleTranslateConfig.domain);

            console.log("🔄 Перезагрузка страницы...");
            window.location.reload();
        });
    }

    function TranslateGetCode() {
        const cookie = Cookies.get('googtrans');
        console.log("🔍 Получаем googtrans из куки:", cookie);
        const lang = cookie || "/";
        const match = lang.match(/(?!^\/)[^\/]*$/gm);
        return match ? match[0] : googleTranslateConfig.lang;
    }

    function TranslateCookieHandler(val, domain) {
        console.log("🍪 Установка куки для домена:", document.domain);
        Cookies.set('googtrans', val);
        Cookies.set('googtrans', val, { domain: "." + document.domain });

        if (domain) {
            console.log("🍪 Установка куки для заданного домена:", domain);
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
