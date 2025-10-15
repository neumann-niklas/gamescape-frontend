import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateGamePage } from './update-game.page';

describe('UpdateGamePage', () => {
  let component: UpdateGamePage;
  let fixture: ComponentFixture<UpdateGamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGamePage]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
