import { TestBed } from '@angular/core/testing';
import { GamePreferenceStoreService } from './game-preference-store.service';

describe('GamePreferenceStoreService', () => {
  let service: GamePreferenceStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePreferenceStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
