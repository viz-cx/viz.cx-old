import { LitElement, css, html, customElement } from 'lit-element';

@customElement('widget-button-award')
export class WidgetButtonAward extends LitElement {

  static get styles() {
    return css`
      div.content {
          overflow: hidden;
          text-align: center;
          height: 100%;
          width: 100%;
      }
      
      a.button-award {
        margin-top: 10px;
        display: inline-block;
        color: white;
        text-decoration: none;
        padding: .5em 2em;
        outline: none;
        border-width: 2px 0;
        border-style: solid none;
        border-color: #FDBE33 #000 #D77206;
        border-radius: 6px;
        background: linear-gradient(#F3AE0F, #E38916) #E38916;
        transition: 0.2s;
      } 
      a.button-award:hover { background: linear-gradient(#f5ae00, #f59500) #f5ae00; }
      a.button-award:active { background: linear-gradient(#f59500, #f5ae00) #f59500; }
    
      .spinner {
          margin-top: 10px;
          animation: rotator 1.4s linear infinite;
          display: inline-block;
      }
      @keyframes rotator {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(270deg); }
      }
      .path {
          stroke-dasharray: 187;
          stroke-dashoffset: 0;
          transform-origin: center;
          animation:
                  dash 1.4s ease-in-out infinite,
                  colors 5.6s ease-in-out infinite;
      }
      @keyframes colors {
          0% { stroke: #4285F4; }
          25% { stroke: #DE3E35; }
          50% { stroke: #F7C223; }
          75% { stroke: #1B9A59; }
          100% { stroke: #4285F4; }
      }
      @keyframes dash {
          0% { stroke-dashoffset:187; }
          50% {
              stroke-dashoffset: 47;
              transform:rotate(135deg);
          }
          100% {
              stroke-dashoffset: 187;
              transform:rotate(450deg);
          }
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    this.showSpinner(false)
  }

  render() {
    return html`
      <div class="content">

        <a href="#" class="button-award" @click="${this.send}">Спасибо</a>

        <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>

      </div>
    `;
  }

  private send(): void {
    this.showSpinner(true)
    setTimeout(() => {
      this.showSpinner(false)
        // window.xprops.onSuccess(award);
        // window.xprops.close();
    }, 1500);
  }

  private showSpinner(show: Boolean) {
    this.shadowRoot?.querySelector('.spinner')?.setAttribute('style', `display:${show ? 'inline-block' : 'none'}`)
    this.shadowRoot?.querySelector('a.button-award')?.setAttribute('style', `display:${show ? 'none' : 'inline-block'}`)
  }
}
