/// <reference path="node_modules/angular2/core.d.ts" />
/// <reference path="node_modules/angular2/platform/browser.d.ts" />
/// <reference path="node_modules/angular2/common.d.ts" />

import { Directive, Component, Query, QueryList, View, ViewContainerRef, forwardRef, TemplateRef } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { NgFor } from 'angular2/common';

//having some issue using selector as `view-dst`
@Directive({
  selector: '[viewdst]',
  inputs: ['viewdst']
})
class ViewDst {
  constructor(public viewContainer: ViewContainerRef) {
    console.log('ViewDst');
  }

  set viewdst(templateRef: TemplateRef) {
    this.viewContainer.createEmbeddedView(templateRef);
  }
}


@Component({
  selector: 'axis'
})
@View({
  directives: [forwardRef(() => SrcAxisTemplate)],
  template: `<svg><rect *src-axis-template="var width=width; var y=y;"
          width="100%" height="5" x="0" y="10"
          style="fill:rgb(255,0,9);stroke-width:3;stroke:rgb(0,0,0)"></rect></svg>`
})
class Axis {
  templateRef: TemplateRef;
  constructor() {
    console.log('Axis');
  }

  addTemplate(srcAxisTemplate: SrcAxisTemplate) {
    this.templateRef = srcAxisTemplate.templateRef;
  }
}


@Directive({
  selector: '[src-axis-template]'
})
class SrcAxisTemplate {
  constructor(axis: Axis, public templateRef: TemplateRef) {
    console.log('SrcAxisTemplate');
    axis.addTemplate(this);
  }
}


@Component({
  selector: 'graph',
  properties: [
    'width: width',
    'height: height'
  ],
  template: `
  <svg width="100%" height="100%">
    <rect [attr.width]="width" [attr.height]="height"
          style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"></rect>
    <svg [attr.width]="width" height="10" x="0" [attr.y]="1*height + 5">
      <g *ngFor="#axis of axes; #i=index" [attr.y]="i*10">
        <template [viewdst]="axis.templateRef"></template>
      </g>
    </svg>
  </svg>
  <!-- not necessary, but useful for debugging -->
  <content></content>`,
  directives: [ViewDst, NgFor]
})
class Graph {
  width: number;
  height: number;
  axes: QueryList<Axis>;

  constructor( @Query(Axis) axes: QueryList<Axis>) {
    console.log('Graph');
    this.axes = axes;
  }
}


// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  directives: [Graph, Axis],
  template: `
  <graph width="500" height="300">
    <axis></axis>
  </graph>`
})
// Component controller
class MyAppComponent {
  constructor() {
    console.log('MyAppComponent');
  }
}

//console.log(ViewContainerRef);
bootstrap(MyAppComponent);
