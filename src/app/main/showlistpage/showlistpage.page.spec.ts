import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowlistpagePage } from './showlistpage.page';

describe('ShowlistpagePage', () => {
  let component: ShowlistpagePage;
  let fixture: ComponentFixture<ShowlistpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowlistpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowlistpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
