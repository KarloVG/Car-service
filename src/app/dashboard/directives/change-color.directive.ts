import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective implements OnInit{

  @Input() defaultColor!: string;
  @Input() row: any;
  todaysDate = new Date();
  today = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth(), this.todaysDate.getDate(), 0,0,0).toISOString();
 
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    console.log(this.row)
      if(this.row.date == this.today){
        this.elementRef.nativeElement.style.backgroundColor = 'beige';
      }
      if(this.row.status == 'U tijeku'){
        this.elementRef.nativeElement.style.backgroundColor = "cornflowerblue";
      }
      if(this.row.status == 'Završeno'){
        this.elementRef.nativeElement.style.backgroundColor = "lightgreen";
      }
      if(this.row.data < this.today){
        this.elementRef.nativeElement.style.backgroundColor = "tomato";
      }
      
  }

  setBgColor(color: string){
    this.renderer.setStyle(
      this.elementRef.nativeElement, 'backgroundColor', color
    )
  }

}
