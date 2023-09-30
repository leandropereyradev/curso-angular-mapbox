import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css'],
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(2.09, 41.37);

  ngAfterViewInit(): void {
    if (!this.divMap) throw Error('El elemento HTML no fue encontrado');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener() {
    if (!this.map) throw Error('Mapa no inicializado');

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    // Esto permite controlar el máximo zoom posible
    // this.map.on('zoomend', (ev) => {
    //   if (this.map!.getZoom() < 18) return;
    //   this.map!.zoomTo(18);
    // });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
    });
  }

  zoomMore() {
    this.map?.zoomIn();
  }

  zoomLess() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);

    this.map?.zoomTo(this.zoom);
  }
}
