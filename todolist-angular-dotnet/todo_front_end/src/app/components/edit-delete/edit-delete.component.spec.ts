import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteComponent } from './edit-delete.component';

describe('EditDeleteComponent', () => {
  let component: EditDeleteComponent;
  let fixture: ComponentFixture<EditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
