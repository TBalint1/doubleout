import { Injectable } from '@angular/core';
import { WorldRanking } from '../shared/models/WorldRanking';
import { sample_WorldRanking } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor() { }

  getAll():WorldRanking[]{
    return sample_WorldRanking;
  }

}
