import {Component, Directive, Provider, forwardRef, Input, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  @Input()
  keywords:string;

  highlightClass: string = 'highlight';
  attributeEncapsulation;

  constructor(private elementRef:ElementRef,private renderer:Renderer) {

  }

  replacer(match, item) {
    return `<span ${this.attributeEncapsulation} class="${this.highlightClass}">${match}</span>`;
  }

  tokenize(keywords) {
    keywords = keywords.replace(new RegExp(',$','g'), '').split(',');
    return keywords.map((keyword) => {
      return '\\b'+keyword.replace(new RegExp('^ | $','g'), '')+'\\b';
    });
  }

  highlightText() {
    this.initializeEncapsulationAttribute();
    if (this.keywords) {
      var tokenized   = this.tokenize(this.keywords);
      var regex       = new RegExp(tokenized.join('|'), 'gmi');

      var html = this.elementRef.nativeElement.innerHTML.replace(regex, (match, item) => {
        return this.replacer(match, item);
      });
      console.log('tml = '+html);

      this.renderer.setElementProperty(this.elementRef.nativeElement, 'innerHTML', html);
    }
  }

  ngAfterViewInit() {
    console.log(this.elementRef.nativeElement);
    this.highlightText();
  }

  initializeEncapsulationAttribute() {
    if (!this.attributeEncapsulation) {
      console.log(this.elementRef.nativeElement.attributes);
      var attributes = this.elementRef.nativeElement.attributes;
      for (var i = 0; i<attributes.length; i++) {
        let attr = attributes[i];
        if(attr.name.indexOf('_ngcontent') != -1) {
          this.attributeEncapsulation = attr.name;
          break;
        }
      }
    }
  }
}
