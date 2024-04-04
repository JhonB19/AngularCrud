import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ModalAgregarComponent } from './modalagregar/modalagregar.component';
import { TableComponent } from './table/table.component';
import { ModalActualizarComponent } from './modalactualizar/modalactualizar.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalAgregarComponent,
    TableComponent,
    ModalActualizarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }