// ==UserScript==
// @name         DoYeah · 野渡彼岸（✌️ 常驻 + 半透明说明条）
// @name:en      DoYeah · Wild Browser Ferry
// @namespace    https://github.com/JCZGEO/doyeah-browser-ferry
// @version      2026.05.16.5
// @description  右侧常驻 ✌️ 手势图标，鼠标靠近时从左侧滑出 50% 透明说明条，点击将当前 URL 发送到本机浏览器渡口服务，由本机决定用哪个浏览器打开（默认 Comet，自行可改）。
// @description:en  Always-visible ✌️ DoYeah logo on the right edge. On hover, a semi-transparent label slides out. On click, the current URL is sent to a local browser ferry service, which decides which browser to open (Comet by default, configurable by the user).
// @author       DY
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/JCZGEO/doyeah-browser-ferry
// @supportURL   https://github.com/JCZGEO/doyeah-browser-ferry/issues
// ==/UserScript==

(function() {
    'use strict';

    const FORWARD_ENDPOINT = 'http://localhost:3000/open';

    window.addEventListener('load', () => {
        const wrapper = document.createElement('div');
        wrapper.id = 'doyeah-ferry-wrapper';

        const logo = document.createElement('div');
        logo.id = 'doyeah-ferry-logo';
        logo.textContent = '✌️';

        const label = document.createElement('div');
        label.id = 'doyeah-ferry-label';
        label.textContent = 'DoYeah 野渡浏览';

        Object.assign(wrapper.style, {
            position: 'fixed',
            top: '50%',
            right: '0',
            transform: 'translateY(-50%)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            pointerEvents: 'auto',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        });

        Object.assign(label.style, {
            backgroundColor: 'rgba(0, 115, 234, 0.5)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: '4px 0 0 4px',
            fontSize: '13px',
            marginRight: '-150px',
            opacity: '0',
            whiteSpace: 'nowrap',
            transition: 'margin-right 0.25s ease-out, opacity 0.2s ease-out, background-color 0.15s ease-out',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        });

        Object.assign(logo.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'transform 0.15s ease-out'
        });

        wrapper.addEventListener('mouseenter', () => {
            label.style.marginRight = '0';
            label.style.opacity = '1';
            label.style.backgroundColor = 'rgba(0, 90, 192, 0.5)';
            logo.style.transform = 'scale(1.05)';
        });

        wrapper.addEventListener('mouseleave', () => {
            label.style.marginRight = '-150px';
            label.style.opacity = '0';
            label.style.backgroundColor = 'rgba(0, 115, 234, 0.5)';
            logo.style.transform = 'scale(1)';
        });

        const handleClick = () => {
            const currentUrl = window.location.href;
            const target = FORWARD_ENDPOINT + '?url=' + encodeURIComponent(currentUrl);
            window.open(target, '_blank');
        };

        logo.addEventListener('click', handleClick);
        label.addEventListener('click', handleClick);

        wrapper.appendChild(label);
        wrapper.appendChild(logo);
        document.body.appendChild(wrapper);
    });
})();
