'use client';

import Script from 'next/script';

export function TalkMe() {
  return (
    <Script id="talk-me" type="text/javascript" strategy="afterInteractive">
      {TALK_ME}
    </Script>
  );
}

const TALK_ME = `
(function() {
  (function c(d, w, m, i) {
    window.supportAPIMethod = m;
    var s = d.createElement("script");
    s.id = "supportScript";
    var id = "${process.env.NEXT_PUBLIC_TALK_ME_TOKEN}";
    s.src = (!i
      ? "https://lcab.talk-me.ru/support/support.js"
      : "https://static.site-chat.me/support/support.int.js") + "?h=" + id;
    s.onerror = i ? undefined : function() {
      c(d, w, m, true);
    };
    w[m] = w[m] ? w[m] : function() {
      (w[m].q = w[m].q ? w[m].q : []).push(arguments);
    };
    (d.head ? d.head : d.body).appendChild(s);
  })(document, window, "TalkMe");
})();
`;
