import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import {ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  apiForm: FormGroup;

  method: string[] = [
    
    'get',
    'post',
    'put',
    'delete'
  ];

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.apiForm = this._fb.group({
      
      path:'',
      httpMethod:'',
      schema:'',
    });
  }

  ngOnInit(): void {
    this.apiForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.apiForm.valid) {
      if (this.data) {
        this._apiService
          .updateApi(this.data.id, this.apiForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('api detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._apiService.addApi(this.apiForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('api added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}