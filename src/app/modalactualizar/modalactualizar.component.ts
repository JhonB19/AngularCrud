import { Component, EventEmitter, Input, Output } from '@angular/core';
import axios from 'axios';
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
  selector: 'app-modalactualizar',
  templateUrl: './modalactualizar.component.html',
  styleUrls: ['./modalactualizar.component.css']
})
export class ModalActualizarComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() dataUpdated = new EventEmitter<void>();
  @Input() isOpen = false;
  @Input() rowData: Inspeccion | null = null; // Recibe la fila seleccionada como entrada

  formData: Partial<Inspeccion> = {}; // Inicializa el formulario con un objeto vacío

  constructor(private dataService: DataService) { }

  ngOnChanges(): void {
    // Cuando cambia la fila seleccionada, actualiza el formulario
    if (this.rowData) {
      this.formData = { ...this.rowData }; // Copia los datos de la fila seleccionada al formulario
    }
    this.isOpen = true;
  }

  async onSubmit(): Promise<void> {
    try {
      // Realiza la solicitud de actualización
      await axios.put(`http://localhost:90/inspecciones/put/${this.rowData?.IdInspeccionVehiculo}`, this.formData);
      this.dataService.announceDataUpdated();// Emitir evento de actualización
      this.close();
      // Cierra el modal después de la actualización
      // Puedes emitir un evento para que el componente padre maneje el cierre del modal
    } catch (error) {
      console.error("Error al actualizar inspección:", error);
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}