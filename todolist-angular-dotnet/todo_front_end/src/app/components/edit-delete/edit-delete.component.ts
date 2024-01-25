import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.css']
})
export class EditDeleteComponent {
  @Input() doItem: number = 0;
  @Input() color: string = '';
  @Input() text: string = '';
  @Input() url: string = '';
  @Input() execDelete: boolean = true;
  @Input() editClick: () => void = () => {};
  @Output() deleteClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onDeleteClick(): void {
    this.deleteClick.emit();
  }

  onEditClick(): void {
    if (this.doItem && this.doItem !== undefined) {
      this.router.navigate(['edit', this.doItem]);
    } else {
      console.error('DoId is undefined or null. Cannot navigate.');
    }
  }
  
}
