<!-- Подключаем js-cookie -->
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>

<script>
    const googleTranslateConfig = {
        lang: "ru",
        domain: "kurdorganization.tilda.ws"
    };

    function TranslateInit() {
        const currentLang = TranslateGetCode();

        const activeLangEl = document.querySelector('[data-google-lang="' + currentLang + '"]');
        if (activeLangEl) {
            activeLangEl.classList.add('language__img_active');
        }

        const cookieVal = "/" + googleTranslateConfig.lang + "/" + currentLang;
        TranslateCookieHandler(cookieVal, googleTranslateConfig.domain);

        new google.translate.TranslateElement({
            pageLanguage: googleTranslateConfig.lang,
        });

        TranslateEventHandler('click', '[data-google-lang]', function (el) {
            const targetLang = el.getAttribute("data-google-lang");
            const newCookieVal = "/" + googleTranslateConfig.lang + "/" + targetLang;

            DeleteTranslateCookies(googleTranslateConfig.domain);
            TranslateCookieHandler(newCookieVal, googleTranslateConfig.domain);

            // Если возвращаемся на оригинальный язык — принудительно сбрасываем перевод
            if (targetLang === googleTranslateConfig.lang) {
                // Удалим iframe перевода
                const frame = document.querySelector("iframe.goog-te-banner-frame");
                if (frame) frame.remove();

                // Удалим лишние классы
                document.body.classList.remove("goog-te-banner-frame", "skiptranslate");
                const el = document.querySelector(".goog-te-banner-frame");
                if (el) el.remove();

                // Удалим элемент translate
                const translateEl = document.getElementById("google_translate_element");
                if (translateEl) translateEl.innerHTML = "";

                // Жёсткий сброс страницы
                window.location.href = window.location.pathname;
            } else {
                window.location.reload();
            }
        });
    }

    function TranslateGetCode() {
        const cookie = Cookies.get('googtrans') || "/";
        const match = cookie.match(/(?!^\/)[^\/]*$/gm);
        return match ? match[0] : googleTranslateConfig.lang;
    }

    function TranslateCookieHandler(val, domain) {
        Cookies.set('googtrans', val);
        Cookies.set('googtrans', val, { domain: "." + document.domain });

        if (domain) {
            Cookies.set('googtrans', val, { domain: domain });
            Cookies.set('googtrans', val, { domain: "." + domain });
        }
    }

    function DeleteTranslateCookies(domain) {
        Cookies.remove('googtrans');
        Cookies.remove('googtrans', { domain: "." + document.domain });

        if (domain) {
            Cookies.remove('googtrans', { domain: domain });
            Cookies.remove('googtrans', { domain: "." + domain });
        }
    }

    function TranslateEventHandler(event, selector, handler) {
        document.addEventListener(event, function (e) {
            const el = e.target.closest(selector);
            if (el) handler(el);
        });
    }
</script>

<script src="//translate.google.com/translate_a/element.js?cb=TranslateInit"></script>
