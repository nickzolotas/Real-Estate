import React, { useEffect } from 'react';
import "./style/ComponentStyle.css"

const HomeIcon = ({ onClick }) => {
  useEffect(() => {
    if (document.getElementById('home') && !window['__SVGATOR_PLAYER__']?.['91c80d77']) {
      (function(s,i,u,o,c,w,d,t,n,x,e,p,a,b){
        (a=document.getElementById(i.root)).svgatorPlayer={ready:(function(a){b=[];return function(c){return c?(b.push(c),a.svgatorPlayer):b}})(a)};
        w[o]=w[o]||{};w[o][s]=w[o][s]||[];w[o][s].push(i);
        e=d.createElementNS(n,t);e.async=true;
        e.setAttributeNS(x,'href',[u,s,'.','j','s','?','v','=',c].join(''));
        e.setAttributeNS(null,'src',[u,s,'.','j','s','?','v','=',c].join(''));
        p=d.getElementsByTagName(t)[0];p.parentNode.insertBefore(e,p);
      })('91c80d77',{"root":"home","version":"2022-05-04","animations":[{"elements":{"home-u-scale":{"transform":{"data":{"o":{"x":64,"y":64,"type":"corner"},"t":{"x":-64,"y":-64}},"keys":{"s":[{"t":0,"v":{"x":1,"y":1},"e":[0.215,0.61,0.355,1]},{"t":500,"v":{"x":1.2,"y":1.2}}]}}},"home-u-door-scale":{"transform":{"data":{"t":{"x":-70,"y":-87}},"keys":{"o":[{"t":0,"v":{"x":70,"y":87,"type":"corner"}},{"t":500,"v":{"x":71.666666,"y":86.166667,"type":"corner"}}],"s":[{"t":0,"v":{"x":1,"y":1}},{"t":500,"v":{"x":0,"y":1}}]}},"opacity":[{"t":0,"v":1,"e":[0,0,0.58,1]},{"t":200,"v":0}]},"home-u-door":{"transform":{"data":{"o":{"x":70,"y":87,"type":"corner"},"t":{"x":-70,"y":-87}},"keys":{"k":[{"t":0,"v":{"x":0,"y":0},"e":[0.215,0.61,0.355,1]},{"t":500,"v":{"x":0,"y":25}}]}},"stroke-width":[{"t":0,"v":4,"e":[0.215,0.61,0.355,1]},{"t":500,"v":3.33}]},"home-s-path1":{"d":[{"t":0,"v":["M",82,67.3,"L",64,49.3,"L",46,67.3,"L",46,85,"C",46,86.104569,46.895431,87,48,87,"L",58,87,"L",58,73,"C",58,71.895431,58.895431,71,60,71,"L",68,71,"C",69.104569,71,70,71.895431,70,73,"L",70,87,"L",80,87,"C",81.104569,87,82,86.104569,82,85,"L",82,67.3,"Z"],"e":[0.215,0.61,0.355,1]},{"t":500,"v":["M",82,67.3,"L",64,49.3,"L",46,67.3,"L",46,85,"C",46,86.104569,46.895431,87,48,87,"L",55.166667,87,"L",55.166667,69.333334,"C",55.166667,68.228765,56.062098,67.333334,57.166667,67.333334,"L",70.833333,67.333334,"C",71.937902,67.333334,72.833333,68.228765,72.833333,69.333334,"L",72.833333,87,"L",80,87,"C",81.104569,87,82,86.104569,82,85,"L",82,67.3,"Z"]}],"stroke-width":[{"t":0,"v":4,"e":[0.215,0.61,0.355,1]},{"t":500,"v":3.33}]},"home-u-arrow":{"transform":{"data":{"t":{"x":-64.000002,"y":-79.833332}},"keys":{"o":[{"t":300,"v":{"x":64.000002,"y":96.222223,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":700,"v":{"x":64.000002,"y":78.999999,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":1000,"v":{"x":64.000002,"y":80.666665,"type":"corner"}}]}},"opacity":[{"t":300,"v":0,"e":[0.42,0,0.58,1]},{"t":600,"v":1}]},"home-u-roof":{"stroke-width":[{"t":0,"v":4,"e":[0.215,0.61,0.355,1]},{"t":500,"v":3.33}]}},"s":"MDBA1ZDhmMzY3OUDg5ODZQNzU4MODdkODM4MjMO2NGVKNDU0NDAQ0NDQ0MDM2NOzg3ZEg4Njc5ENzc4ODdkODMS4MlgzNkI0ZTQQ1NDAzNjdkOIDg3OUo4Njc1KODg3ZDgzODIH4NzM2NGU0NTHQwMzY3YTdkORDA4MDM2NGU0DNTQwMzY3NTgNwODg3OTg2ODTI3NTg4NzkzNLjRlN2E3NVg4EMDg3Nzk4MDMQ2ODc4NDc5NzOk3ODM2NGU0NXTQwMzY3YTg0BODczNjRlNDUG0NDQ0OTE/"}],"options":"MDXAyMzhmMzY4NQzg4NzVHODY4GODM2NGUzNjdAjODM4YTc5ODSYzNjQwMzY3YIzgzOGE3OUY4INjM2NGUzNjgI2Nzk4YTc5ODAY4Nzc5MzY5MFQ|"},'https://cdn.svgator.com/ply/','__SVGATOR_PLAYER__','2022-05-04',window,document,'script','http://www.w3.org/2000/svg','http://www.w3.org/1999/xlink');
    }
  }, []);

  return (
    <div className="button" onClick={onClick}>
      <svg id="home" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" shapeRendering="geometricPrecision" textRendering="geometricPrecision" style={{ cursor: 'pointer' }}>
        <g id="home-u-scale">
          <g id="home-u-door-scale">
            <path id="home-u-door" d="M68,71h-8c-1.104569,0-2,.895431-2,2v14h12v-14c0-1.104569-.895431-2-2-2Z" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <path id="home-s-path1" d="M82,67.3l-18-18-18,18v17.7c0,1.104569.895431,2,2,2h10v-14c0-1.104569.895431-2,2-2h8c1.104569,0,2,.895431,2,2v14h10c1.104569,0,2-.895431,2-2v-17.7Z" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <g id="home-u-arrow" transform="translate(0 16.388891)" opacity="0">
            <path id="home-s-path2" d="M0,6v-6h6" transform="matrix(.707107 0.707107-.707107 0.707107 64 73.166666)" fill="none" stroke="#fff" strokeWidth="3.33" strokeLinecap="round" strokeLinejoin="round"/>
            <path id="home-s-path3" d="M70,89.166667v12.499999" transform="translate(-6-15.166667)" fill="#fff" stroke="#fff" strokeWidth="3.33" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <path id="home-u-roof" d="M88,63.33v0L66.8,42.13c-.750273-.751108-1.768363-1.173147-2.83-1.173147s-2.079727.422039-2.83,1.173147L40,63.35v0c-1.264949,1.398884-1.211059,3.543861.12254,4.87746s3.478576,1.387489,4.87746.12254L64,49.3_19,19c.961356.939511,2.366058,1.265169,3.642747.844513s2.212677-1.517545,2.427253-2.844513c.235166-1.112789-.179174-2.262872-1.07-2.97Z" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </div>
  );
};

export default HomeIcon;