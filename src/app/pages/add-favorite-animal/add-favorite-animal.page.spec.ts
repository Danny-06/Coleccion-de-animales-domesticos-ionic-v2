import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFavoriteAnimalPage } from './add-favorite-animal.page';

describe('AddFavoriteAnimalPage', () => {
  let component: AddFavoriteAnimalPage;
  let fixture: ComponentFixture<AddFavoriteAnimalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFavoriteAnimalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFavoriteAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
