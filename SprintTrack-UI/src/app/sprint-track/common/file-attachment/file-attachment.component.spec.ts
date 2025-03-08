import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachmentComponent } from './file-attachment.component';

describe('FileAttachmentComponent', () => {
  let component: FileAttachmentComponent;
  let fixture: ComponentFixture<FileAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAttachmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
