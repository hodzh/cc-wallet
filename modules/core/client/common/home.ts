import { StatisticsComponent } from '../admin/statistics/statistics.component';

export class HomePage {
  public content = [
    {
      factory: StatisticsComponent,
      role: 'admin'
    }
  ];

  constructor() {
  }
}

export const HOME_PAGE = new HomePage();
