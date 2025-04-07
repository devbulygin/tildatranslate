<!-- Подключаем js-cookie -->
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>

<script>
    const googleTranslateConfig = {
        lang: "ru",
        domain: "kurdorganization.tilda.ws"
    };

    function TranslateInit() {
        let code = TranslateGetCode();

        const activeLangEl = document.querySelector('[data-google-lang="' + code + '"]');
        if (activeLangEl) {
            activeLangEl.classList.add('language__img_active');
        }

        const cookieVal = "/" + googleTranslateConfig.lang + "/" + code;
        TranslateCookieHandler(cookieVal, googleTranslateConfig.domain);

        new google.translate.TranslateElement({
            pageLanguage: googleTranslateConfig.lang,
        });

        TranslateEventHandler('click', '[data-google-lang]', function (el) {
            const targetLang = el.getAttribute("data-google-lang");
            const newCookieVal = "/" + googleTranslateConfig.lang + "/" + targetLang;

            DeleteTranslateCookies(googleTranslateConfig.domain);
            TranslateCookieHandler(newCookieVal, googleTranslateConfig.domain);
            window.location.reload();
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

<!-- Подключение Google Translate -->
<script src="//translate.google.com/translate_a/element.js?cb=TranslateInit"></script>
