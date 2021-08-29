function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

___$insertStyle(".post {\n  max-width: 100%;\n  width: 780px;\n}\n.post * {\n  font-family: \"Noto Sans JP\" !important;\n}\n.post img {\n  max-width: 100%;\n}\n.post h1 {\n  font-size: 3rem;\n  font-weight: 400;\n}\n.post h2 {\n  position: relative;\n  position: relative;\n  padding: 3% 1em;\n  border-top: solid 2px black;\n  border-bottom: solid 2px black;\n  font-size: 25px;\n  line-height: 30px;\n  margin-bottom: 38px;\n  padding-top: 10px;\n  padding-right: 20px;\n  padding-bottom: 10px;\n  padding-left: 20px;\n  text-align: center;\n  margin-top: 50px;\n}");
