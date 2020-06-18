window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (!event.data.command) {
    return;
  }
  if (event.data.command === "replace" && event.data.arg !== undefined) {
    const scripts = [];
    const regexp = /<script[^>]+?src=['"](.+?)['"][\S\s]*?\/>|<script[^>]+?src=['"](.+?)['"][\S\s]*?>[\S\s]*?<\/script>|<script[^>]*?>([\S\s]*?)<\/script>/gi;
    const htmlOnly = event.data.arg.replace(regexp, (match, p1, p2, p3) => {
      const scriptElement = document.createElement("script");
      scriptElement.setAttribute("type", "text/javascript");
      if (p1 !== undefined || p2 !== undefined) {
        // e.g. <script src="(p1)"/>, <script src="(p2)"></script>
        const src = p1 ? p1 : p2;
        scriptElement.setAttribute("src", src);
      } else if (p3 !== undefined) {
        // e.g. <script>(p3)</script>
        scriptElement.text = p3;
      }
      scripts.push(scriptElement);
      return "";
    });
    document.body.insertAdjacentHTML("beforeend", htmlOnly);
    scripts.forEach(elm => {
      document.body.appendChild(elm);
    });
  }
}

function say(txt) {
  const mes = document.createTextNode(txt);
  document.body.appendChild(mes);
  document.body.appendChild(document.createElement("br"));
}
