const template = document.createElement("template");
template.innerHTML = `
<style>
    div.vimeo-embed iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
<div class="container vimeo-embed" style="padding:56.25% 0 0 0;position:relative;">
</div>
`;

class VimeoEmbed extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    shadow.appendChild(clone);
  }

  static get observedAttributes() {
    return ["vimeoId"];
  }

  get vimeoId() {
    return this.getAttribute("vimeoId");
  }

  set vimeoId(val) {
    this.setAttribute("vimeoId", val);
  }

  async connectedCallback() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const endpoint = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${this.vimeoId}`;
          const response = await fetch(endpoint);
          const data = await response.json();
          this.shadowRoot.querySelector("div").innerHTML = data.html;
        }
      });
    });
    observer.observe(this);
  }
}
customElements.define("vimeo-embed", VimeoEmbed);
