import React, { useEffect } from 'react';
import "./style/ComponentStyle.css"

const SearchIcon = ({ onClick }) => {
  useEffect(() => {
    if (document.getElementById('magnifier-white') && !window['__SVGATOR_PLAYER__']?.['91c80d77']) {
      (function(s,i,u,o,c,w,d,t,n,x,e,p,a,b){
        (a=document.getElementById(i.root)).svgatorPlayer={ready:(function(a){b=[];return function(c){return c?(b.push(c),a.svgatorPlayer):b}})(a)};
        w[o]=w[o]||{};w[o][s]=w[o][s]||[];w[o][s].push(i);
        e=d.createElementNS(n,t);e.async=true;
        e.setAttributeNS(x,'href',[u,s,'.','j','s','?','v','=',c].join(''));
        e.setAttributeNS(null,'src',[u,s,'.','j','s','?','v','=',c].join(''));
        p=d.getElementsByTagName(t)[0];p.parentNode.insertBefore(e,p);
      })('91c80d77',{"root":"magnifier-white","version":"2022-05-04","animations":[{"elements":{"magnifier-white-u-move":{"transform":{"data":{"t":{"x":-84,"y":-46}},"keys":{"o":[{"t":0,"v":{"x":57.284278,"y":57.284289,"type":"corner"},"e":[0.215,0.61,0.355,1]},{"t":300,"v":{"x":63.999989,"y":57.284289,"type":"corner"}}],"r":[{"t":0,"v":-45,"e":[0.215,0.61,0.355,1]},{"t":300,"v":0}]}}},"magnifier-white-u-circle":{"#radius":[{"t":0,"v":{"x":18.000001,"y":18.000001},"e":[0.215,0.61,0.355,1]},{"t":300,"v":{"x":26,"y":26}}],"transform":{"data":{"t":{"x":7.999999,"y":7.999999}},"keys":{"o":[{"t":0,"v":{"x":76.221827,"y":38.221819,"type":"corner"},"e":[0.215,0.61,0.355,1]},{"t":300,"v":{"x":76.000012,"y":44.715712,"type":"corner"}}]}}},"magnifier-white-u-handle":{"transform":{"data":{"t":{"x":-83.975282,"y":-64.587577}},"keys":{"o":[{"t":0,"v":{"x":83.975282,"y":64.587577,"type":"corner"},"e":[0.215,0.61,0.355,1]},{"t":300,"v":{"x":92.000011,"y":52.715711,"type":"corner"},"e":[0,0,0.58,1]},{"t":450,"v":{"x":93.000011,"y":52.715711,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":600,"v":{"x":92.000011,"y":52.715711,"type":"corner"}}],"r":[{"t":0,"v":0,"e":[0.215,0.61,0.355,1]},{"t":300,"v":90}]}}},"magnifier-white-u-line":{"transform":{"data":{"t":{"x":0,"y":15.414214}},"keys":{"o":[{"t":0,"v":{"x":88,"y":64.585786,"type":"corner"},"e":[0,0,0.58,1]},{"t":300,"v":{"x":84,"y":64.585786,"type":"corner"}}],"r":[{"t":0,"v":0,"e":[0,0,0.58,1]},{"t":300,"v":-45}]}},"stroke-dashoffset":[{"t":0,"v":67.8,"e":[0,0,0.58,1]},{"t":300,"v":39.09}],"stroke-dasharray":[{"t":0,"v":[33.9],"e":[0,0,0.58,1]},{"t":300,"v":[21.17,33.92]}]},"magnifier-white-s-line1":{"transform":{"data":{"t":{"x":0,"y":15.414214}},"keys":{"o":[{"t":0,"v":{"x":80,"y":64.585786,"type":"corner"},"e":[0,0,0.58,1]},{"t":300,"v":{"x":84,"y":64.585786,"type":"corner"}}],"r":[{"t":0,"v":0,"e":[0,0,0.58,1]},{"t":300,"v":45}]}},"stroke-dashoffset":[{"t":100,"v":42.34,"e":[0,0,0.58,1]},{"t":300,"v":38.997368}]}},"s":"MDGA1Y2IzNWE5YK2FkYWE5OWFjWYTFhN2E2NWEE3MjZlNjg2ODKY0NWE5Y2ExYCWE5ZDliYWNhSMWE3YTY1YTcRyTjY5QTY0NWUFhMWFjOWRhYWTk5YWNhMWE3SYTZhYjVhNzIO2OTY0NWE5ZWOExRmE0YTQ1YBVY3MjY5NjQ1UYTk5YTRhYzlDkWWFhYTY5OWVFjTjlkVDVhNUzI5ZUI5OWE0GYWI5ZDY0NWFMhYmE4OWQ5ZDWljNWE3MjY5NYjQ1YTllYThhCYjVhNzI2OVYW2ODY4UGI1"}],"options":"MDTAyMzlkNDQ5NSTk2ODM5NFA5VNjQ0NWM0NDhMhOTE5ODg3OTQQ0NDRlNDQ4YRTkxOTg4Nzk0UNDRINWNZNDQA5NDg3OTg4NzAk0OTU4NzQ0OQWY/"},'https://cdn.svgator.com/ply/','__SVGATOR_PLAYER__','2022-05-04',window,document,'script','http://www.w3.org/2000/svg','http://www.w3.org/1999/xlink');
    }
  }, []);

  return (
    <div className="button" onClick={onClick}>
      <svg id="magnifier-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" shapeRendering="geometricPrecision" textRendering="geometricPrecision" style={{ cursor: 'pointer' }}>
        <g id="magnifier-white-u-move" transform="matrix(.707107-.707107 0.707107 0.707107-34.639604 84.154347)">
          <ellipse id="magnifier-white-u-circle" rx="18.000001" ry="18.000001" transform="translate(84.221826 46.221818)" fill="none" stroke="#fff" strokeWidth="4"/>
          <g id="magnifier-white-u-handle">
            <path id="magnifier-white-u-line" d="M-8.029452,5.916737c0,2.209139,1.790861,4,4,4s4-1.790861,4-4L0,5.757358l-.017478-21.18905" transform="translate(88 80)" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDashoffset="67.8" strokeDasharray="33.9"/>
            <line id="magnifier-white-s-line1" x1="0" y1="5.757358" x2="0" y2="-15.414214" transform="translate(80 80)" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDashoffset="42.34" strokeDasharray="21.17"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default SearchIcon;