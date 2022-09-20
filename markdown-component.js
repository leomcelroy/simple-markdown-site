import { marked } from "./marked.js";

class MarkdownComponent extends HTMLElement {
  constructor() {
    super();

  }
  
  connectedCallback() {
    const compiledHTML = marked.parse(this.innerHTML);
    this.innerHTML = marked.parse(this.innerHTML);
    this.style.visibility = "visible"
  }

  disconnectedCallback() { }
}

customElements.define("markdown-component", MarkdownComponent);


