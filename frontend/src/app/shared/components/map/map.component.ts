import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  badge?: string;
  type?: 'donor' | 'request' | 'hospital';
}

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
      <div #mapContainer class="w-full h-full z-0"></div>
      <div *ngIf="markers.length === 0"
           class="absolute inset-0 bg-white/70 dark:bg-dark-card/80 backdrop-blur-xs flex items-center justify-center pointer-events-none">
        <p class="text-sm font-medium text-gray-500">No geo-coordinates available for markers</p>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
  `]
})
export class InteractiveMapComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @Input() markers: MapMarker[] = [];
  @Input() centerLat: number = 28.6139; // Default New Delhi
  @Input() centerLng: number = 77.2090;
  @Input() zoom: number = 11;

  private map: L.Map | null = null;
  private markerLayer: L.LayerGroup | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markers'] && this.map) {
      this.updateMarkers();
    }
  }

  private initMap(): void {
    if (this.map) return;

    this.map = L.map(this.mapContainer.nativeElement).setView([this.centerLat, this.centerLng], this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.markerLayer = L.layerGroup().addTo(this.map);
    this.updateMarkers();
  }

  private updateMarkers(): void {
    if (!this.map || !this.markerLayer) return;

    this.markerLayer.clearLayers();

    if (this.markers.length === 0) return;

    const bounds: L.LatLngExpression[] = [];

    this.markers.forEach(m => {
      if (!m.lat || !m.lng) return;

      const markerColor = m.type === 'hospital' ? '#1E40AF' : '#DC2626';
      const icon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color: ${markerColor}; width: 26px; height: 26px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">
                 ${m.type === 'hospital' ? '🏥' : '🩸'}
               </div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const popupContent = `
        <div style="font-family: Inter, sans-serif; font-size: 12px; padding: 2px;">
          <h4 style="font-weight: 700; margin: 0 0 4px; color: #111827;">${m.title}</h4>
          ${m.subtitle ? `<p style="margin: 0; color: #4B5563;">${m.subtitle}</p>` : ''}
          ${m.badge ? `<span style="display: inline-block; margin-top: 4px; background: #FEE2E2; color: #991B1B; font-weight: 700; padding: 2px 6px; border-radius: 4px;">${m.badge}</span>` : ''}
        </div>
      `;

      const marker = L.marker([m.lat, m.lng], { icon }).bindPopup(popupContent);
      this.markerLayer?.addLayer(marker);
      bounds.push([m.lat, m.lng]);
    });

    if (bounds.length > 0) {
      this.map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 14 });
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
