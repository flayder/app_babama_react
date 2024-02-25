'use client';

import Script from 'next/script';

export function YandexMetrika() {
  return (
    <>
      <Script id="yandex-metrika" type="text/javascript" strategy="afterInteractive">
        {YANDEX_SCRIPT}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}`}
            style={{
              position: 'absolute',
              left: '-9999px',
            }}
            alt=""
          />
          <img
            src="https://mc.yandex.ru/watch/95317219"
            style={{
              position: 'absolute',
              left: '-9999px',
            }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

const YANDEX_SCRIPT = `
(function(m, e, t, r, i, k, a) {
  m[i] = m[i] || function() {
    (m[i].a = m[i].a || []).push(arguments);
  };
  m[i].l = 1 * new Date();
  for (var j = 0; j < document.scripts.length; j++) {
    if (document.scripts[j].src === r) {
      return;
    }
  }
  k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}, "init", {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true
});
ym(95317219, "init", {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true
});
`;
