import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appToolbar]'
})
export class ToolbarDirective {

  constructor(el: ElementRef) {
    const e = el.nativeElement;
    e.style.backgroundColor = 'yellow';
    e.style.height = '2rem';
    e.style.maxHeight = '2rem';
    e.style.width = '100%';
  }

}
