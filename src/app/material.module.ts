import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatDatepickerModule,
  MatGridListModule, 
  MatTableModule, 
  MatFormFieldModule,
  MatInputModule,
  MatPaginator,
  MatPaginatorModule,
  MatDialogModule, 
  MatIconModule, 
  MatMenuModule,
  MatDialog,
  MatIconRegistry,
  MatChipInputEvent,
  MatChipsModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatNativeDateModule

  } from '@angular/material'

import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';

import { NgModule } from '@angular/core'
  
  @NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule, 
        MatCardModule, 
        MatGridListModule, 
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatDialogModule,
        MatIconModule,
        MatIconModule, 
        MatMenuModule,
        MatStepperModule,
        MatDividerModule,
        MatChipsModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        
        MatNativeDateModule,
        MatExpansionModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule, 
        MatCardModule, 
        MatGridListModule, 
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatDialogModule,
        MatIconModule,
        MatIconModule, 
        MatMenuModule,
        MatStepperModule,
        MatDividerModule,
        MatChipsModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
    ],
  })
  export class MaterialModule {}