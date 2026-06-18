import React, { useEffect } from 'react';

import './style/MenuIcon.css';

const MenuIcon = ({ onClick }) => {
  useEffect(() => {
    // Αυτό το block κώδικα εκτελεί το script του SVGator μόλις φορτώσει το component
    (function(s,i,u,o,c,w,d,t,n,x,e,p,a,b){
      if (document.getElementById(i.root) && !window[o]?.[s]) {
        (a=document.getElementById(i.root)).svgatorPlayer={ready:(function(a){b=[];return function(c){return c?(b.push(c),a.svgatorPlayer):b}})(a)};
        w[o]=w[o]||{};w[o][s]=w[o][s]||[];w[o][s].push(i);
        e=d.createElementNS(n,t);
        e.async=true;
        e.setAttributeNS(x,'href',[u,s,'.','j','s','?','v','=',c].join(''));
        e.setAttributeNS(null,'src',[u,s,'.','j','s','?','v','=',c].join(''));
        p=d.getElementsByTagName(t)[0];
        p.parentNode.insertBefore(e,p);
      }
    })('91c80d77',{"root":"esdngqWkuNL1","version":"2022-05-04","animations":[{"elements":{"esdngqWkuNL3":{"transform":{"data":{"t":{"x":-291.59,"y":-439.460015}},"keys":{"o":[{"t":0,"v":{"x":287.59,"y":439.460015,"type":"corner"},"e":[0.39,0.575,0.565,1]},{"t":700,"v":{"x":299.128942,"y":440.06826,"type":"corner"}}],"r":[{"t":0,"v":0,"e":[0.39,0.575,0.565,1]},{"t":700,"v":45}]}}},"esdngqWkuNL4":{"transform":{"data":{"o":{"x":327.589996,"y":467.959991,"type":"corner"},"t":{"x":-331.589996,"y":-467.959991}},"keys":{"r":[{"t":0,"v":0,"e":[0.39,0.575,0.565,1]},{"t":700,"v":315}]}}},"esdngqWkuNL5":{"transform":{"data":{"t":{"x":-371.59,"y":-497.000015}},"keys":{"o":[{"t":0,"v":{"x":367.59,"y":497.000015,"type":"corner"},"e":[0.39,0.575,0.565,1]},{"t":700,"v":{"x":355.6692,"y":497.000015,"type":"corner"}}],"r":[{"t":0,"v":0,"e":[0.39,0.575,0.565,1]},{"t":700,"v":45}]}},"opacity":[{"t":0,"v":1,"e":[0.39,0.575,0.565,1]},{"t":700,"v":0}]}},"s":"MDEA1Yzk2M2Q3ZTjkwOGQ3YzhmUQTg0OGE4OU8EzZDU1RzUyNGYJSNGI0NzNkNS2Y4NFE4ZDgwDN2U4Zjg0OGES4OTNkNTU0YzAQ3M2Q4NDhmOVDA4ZDdjOGY4CNDhhODk4ZTNWkNTU0YzQ3WDCNkODE4NDg3OQDczZDU1NGNWLNDczZDdjODcA4ZjgwOGRQODLk3YzhmODAzZVDU1ODFLWTdjPODc4ZTgwTDQI3VTNkOGU4YjFgwODA3ZjNkNBTU0YzQ3M2Q4JMThiOGUzZDUJ1NGM0YjRiOTBg/"}],"options":"MDLAyMzhlMzU4NCjg3NzQ4NTg3MMzU0ZDM1NzYU3ZjdjNzY3ZTUM1M2YzNTc2NX2Y3Yzc2N2UzHNTRkUzM1ODUO3ODg5Nzg4NTMg2NzgzNTkw"},'https://cdn.svgator.com/ply/','__SVGATOR_PLAYER__','2022-05-04',window,document,'script','http://www.w3.org/2000/svg','http://www.w3.org/1999/xlink');
  }, []);

  return (
      <div className="menu" onClick={onClick}>
        <svg
          id="esdngqWkuNL1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 80 80"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          style={{ cursor: 'pointer' }}
        >
          <g transform="matrix(.49946 0 0 0.49946-123.618137-193.864866)">
            <line
              id="esdngqWkuNL3"
              x1="291.59"
              y1="439.21"
              x2="371.59"
              y2="439.21"
              transform="translate(-4 0)"
              fill="none"
              stroke="#f36937"
              strokeWidth="12"
              strokeLinecap="round"
              strokeMiterlimit="10"
            />
            <line
              id="esdngqWkuNL4"
              x1="291.59"
              y1="467.96"
              x2="371.59"
              y2="467.96"
              transform="translate(-4 0)"
              fill="none"
              stroke="#f36937"
              strokeWidth="12"
              strokeLinecap="round"
              strokeMiterlimit="10"
            />
            <line
              id="esdngqWkuNL5"
              x1="291.59"
              y1="496.71"
              x2="371.59"
              y2="496.71"
              transform="translate(-4 0)"
              fill="none"
              stroke="#f36937"
              strokeWidth="12"
              strokeLinecap="round"
              strokeMiterlimit="10"
            />
          </g>
        </svg>
    </div>
  );
};

export default MenuIcon;