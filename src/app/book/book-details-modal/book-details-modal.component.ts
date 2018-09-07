import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Books } from '../../shared/models/bookModel';


@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.css']
})
export class BookDetailsModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BookDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Books ) { }

  ngOnInit() {
    console.log(this.data)
  }
  // onNoClick(): void {
  //   this.dialogRef.close(null);
  // }
  modalButton(request){
    console.log(request)
    this.dialogRef.close(request);
  }
}
