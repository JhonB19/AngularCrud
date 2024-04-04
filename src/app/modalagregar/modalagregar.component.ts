import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import axios from 'axios';
import { NgForm } from '@angular/forms'; // Importa NgForm
import { DataService } from '../service/DataService';



@Component({
  selector: 'app-modalagregar',
  templateUrl: './modalagregar.component.html',
  styleUrls: ['./modalagregar.component.css']
})
export class ModalAgregarComponent {
  // Referencia al formulario utilizando ViewChild
  @Output() dataUpdated = new EventEmitter<void>();
  @ViewChild('inspeccionForm') inspeccionForm!: NgForm;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  formData: any = {}; // Objeto para almacenar los valores del formulario

  constructor(private dataService: DataService) {}

  onSubmit(): void {
    // Realizar solicitud POST a la API utilizando Axios
    axios.post('http://localhost:90/inspecciones/post', this.formData)
      .then(response => {
        console.log(response.data);
        this.dataService.announceDataUpdated();
        // Aquí puedes manejar la respuesta de la API según tus necesidades
        alert('Inspección agregada exitosamente');
      })
      .catch(error => {
        console.error(error);
        // Manejar errores aquí
        alert('Error al agregar inspección');
      });
      this.closeModal.emit();
      this.dataUpdated.emit();

  }
  limpiarCampos(form: any): void {
    form.reset(); // Restablecer los valores del formulario
  }
}
