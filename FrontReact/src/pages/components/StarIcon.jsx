import React, { useEffect } from 'react';
import "./style/ComponentStyle.css"

const StarIcon = ({ onClick }) => {
  useEffect(() => {
    if (document.getElementById('star')) {
      (function(s, i, u, o, c, w, d, t, n, x, e, p, a, b) {
        (a = document.getElementById(i.root)).svgatorPlayer = { ready: (function(a) { b = []; return function(c) { return c ? (b.push(c), a.svgatorPlayer) : b } })(a) };
        w[o] = w[o] || {}; w[o][s] = w[o][s] || []; w[o][s].push(i);
        if (!d.querySelector('script[src*="svgator.com/ply/91c80d77.js"]')){
          e = d.createElementNS(n, t); e.async = true;
          e.setAttributeNS(x, 'href', [u, s, '.', 'j', 's', '?', 'v', '=', c].join(''));
          e.setAttributeNS(null, 'src', [u, s, '.', 'j', 's', '?', 'v', '=', c].join(''));
          p = d.getElementsByTagName(t)[0]; p.parentNode.insertBefore(e, p);
        }
      })('91c80d77', { "root": "star", "version": "2022-05-04", "animations": { "elements": { "star-u-star": { "transform": { "data": { "o": { "x": 64, "y": 64.85306, "type": "corner" } }, "keys": { "s": [{ "t": 0, "v": { "x": 0.9, "y": 0.9 } }, { "t": 1000, "v": { "x": 1, "y": 1 } }] } } }, "star-u-wave": { "transform": { "data": { "s": { "x": 1.292474, "y": 1.292474 }, "t": { "x": -50, "y": -60 } }, "keys": { "o": [{ "t": 0, "v": { "x": 111.041451, "y": 109.052477, "type": "corner" } }, { "t": 1000, "v": { "x": 0.404723, "y": 61.738638, "type": "corner" } }] } } }, "star-u-star-mask": { "transform": { "data": { "o": { "x": 64, "y": 64.85306, "type": "corner" } }, "keys": { "s": [{ "t": 0, "v": { "x": 0.9, "y": 0.9 } }, { "t": 1000, "v": { "x": 1, "y": 1 } }] } } } }, "s": "MDFA1ZDhiMzI3NYEk4NTgyNzE4WNDc5N2Y3ZTMFyNGE0MTQwNDBA0MDNjMzI3NNDc5ODI3NTczWODQ3OTdmN2UPzMjRhNDEzYzWMyNzk4NFk3NKTgyNzE4NDc5QN2Y3ZVc4MzMKyNGE0MTNjVzVMyNzY3OTdjVYjdjMzI0YTQxDM2MzMjcxN2MU4NDc1ODI3ZTIcxODQ3NTMyNDGE3NjcxN2NFAODM3NTNjMzIY4MzgwNzU3NTEc0MzI0YTQxRCjNjMzI3NjgwBODMzMjRhNDEL0MDQwOGQ" }, "options": "MDWAyMzhiMzI4MAzg0NzE4Mjg0SMzI0YTMyQzcXzN2M3OTczN2PIzMjNjMzI3MWzdjNzk3MzdiJMzJINGEzMksR4Mjc1ODY3NTXgyODNTNzUzMJjhk" }, 'https://cdn.svgator.com/ply/', '__SVGATOR_PLAYER__', '2022-05-04', window, document, 'script', 'http://www.w3.org/2000/svg', 'http://www.w3.org/1999/xlink');
    }
  }, []);

  return (
    <div className="button" onClick={onClick}>
      <svg id="star" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" shapeRendering="geometricPrecision" textRendering="geometricPrecision" style={{ cursor: 'pointer' }}>
        <g id="star-u-mask-group" mask="url(#star-u-masks)">
          <polygon id="star-u-star" points="0,-29.589155 8.610584,-12.142207 27.864435,-9.344458 13.932217,4.236097 17.221168,23.412149 0,14.358445 -17.221168,23.412149 -13.932217,4.236097 -27.864435,-9.344458 -8.610584,-12.142207 0,-29.589155" transform="matrix(.9 0 0 0.9 64 64.85306)" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round"/>
          <path id="star-u-wave" d="M108.828,42.71175c-9.444977-6.984808-18.768865,0-18.768865,0s-10.171514,6.984807-19.616491,0-18.768864,0-18.768864,0-10.171514,6.984807-19.616491,0-18.768865,0-18.768865,0-10.171513,6.984807-19.61649,0-18.768865,0-18.768865,0v37.66825h153.541421v-37.66825c0,0-10.171513,6.979735-19.61649,0Z" transform="matrix(1.292474 0 0 1.292474 46.417751 31.504037)" fill="#fff"/>
          <mask id="star-u-masks" mask-type="luminance" x="-150%" y="-150%" height="400%" width="400%">
            <polygon id="star-u-star-mask" points="0,-29.589155 8.610584,-12.142207 27.864435,-9.344458 13.932217,4.236097 17.221168,23.412149 0,14.358445 -17.221168,23.412149 -13.932217,4.236097 -27.864435,-9.344458 -8.610584,-12.142207 0,-29.589155" transform="matrix(.9 0 0 0.9 64 64.85306)" fill="#fff" stroke="#fff" strokeWidth="4" strokeLinejoin="round"/>
          </mask>
        </g>
      </svg>
    </div>
  );
};

export default StarIcon;