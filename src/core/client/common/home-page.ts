import { StatisticsComponent } from '../admin/statistics/statistics.component';
import { Type } from '@angular/core';

export interface HomePageContent {
  factory: Type<any>;
  role: string;
}

export const HOME_PAGE: HomePageContent[] = [
  {
    factory: StatisticsComponent,
    role: 'admin'
  }
];
