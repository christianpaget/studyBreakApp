import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlaylistFormComponent } from './new-playlist-form.component';

describe('NewPlaylistFormComponent', () => {
  let component: NewPlaylistFormComponent;
  let fixture: ComponentFixture<NewPlaylistFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlaylistFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlaylistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
