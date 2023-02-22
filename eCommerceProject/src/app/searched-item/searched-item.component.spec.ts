import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedItemComponent } from './searched-item.component';

describe('SearchedItemComponent', () => {
  let component: SearchedItemComponent;
  let fixture: ComponentFixture<SearchedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
