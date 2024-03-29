import { Injectable } from '@angular/core';
import { Tournament } from '../shared/models/Tournament';
import { sample_tournaments } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  constructor() { }

  getAll():Tournament[]{
    return sample_tournaments;
  }
}
