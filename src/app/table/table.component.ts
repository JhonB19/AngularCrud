import { Component, OnDestroy, OnInit } from '@angular/core';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { DataService } from '../service/DataService';


interface Inspeccion {
  IdInspeccionVehiculo: number;
  fecha: string;
  nombrec: string;
  apellidoc: string;
  edad: string;
  nombrev: string;
  placav: string;
  marcav: string;
  propietario: string;
  kilometraje: string;
  direccionalesd: string;
  direccionalest: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy{
  data: Inspeccion[] = [];
  selectedRow: Inspeccion | null = null;
  isModalOpen = false;
  private dataUpdatedSubscription: Subscription = new Subscription();


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getDataFromAPI();
    this.dataUpdatedSubscription = this.dataService.dataUpdated$.subscribe(() => {
      this.getDataFromAPI();
    });
  }

  ngOnDestroy(): void {
    this.dataUpdatedSubscription.unsubscribe();
  }

  async getDataFromAPI(): Promise<void> {
    try {
      const response = await axios.get<Inspeccion[]>('http://localhost:90/inspecciones/get');
      this.data = response.data;
      
    } catch (error) {
      console.error('Error al obtener inspecciones:', error);
    }
  }

  async deleteItem(id: number): Promise<void> {
    try {
      await axios.delete(`http://localhost:90/inspecciones/${id}`);
      this.data = this.data.filter(inspeccion => inspeccion.IdInspeccionVehiculo !== id);
    } catch (error) {
      console.error('Error al borrar inspección:', error);
    }
  }

  handleActualizarClick(rowData: Inspeccion): void {
    this.selectedRow = rowData;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  
  handleDataUpdated(): void {
    this.getDataFromAPI(); // Vuelve a cargar los datos después de la actualización
  }


}
