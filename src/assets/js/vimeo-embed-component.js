const template = document.createElement("template");
template.innerHTML = `
<style>
    div.container {
      background-color: #000;
      padding: 56.25% 0 0 0;
      position: relative;
    }
    div.container p {
      font-size: 24px;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    div.container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
</style>
<div class="container">
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
    const container = this.shadowRoot.querySelector("div.container");
    const status = document.createElement('p');
    container.appendChild(status);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          try {
            status.textContent = "Loading...";
            const endpoint = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${this.vimeoId}`;
            const response = await fetch(endpoint);
            if (!response.ok) {
              throw new Error('Error: ' + response.status);
            }
            const data = await response.json();
            container.textContent = null;
            container.innerHTML = data.html;
          }
          catch(err) {
            status.textContent = `Video failed to load (${err.message})`;
            console.log(err.message);
          }
        }
      });
    });
    observer.observe(this);
  }
}
customElements.define("vimeo-embed", VimeoEmbed);
