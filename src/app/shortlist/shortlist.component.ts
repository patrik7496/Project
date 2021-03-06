import { Component, OnDestroy } from '@angular/core';

import { Person } from '../models/person.model';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fu-app-shortlist',
  templateUrl: './shortlist.component.html',
  styleUrls: ['./shortlist.component.scss']
})
export class ShortlistComponent implements OnDestroy {
  people: Person[];
  heroesSub: Subscription;

  constructor(private personService: PersonService) {
    this.heroesSub = this.personService.getPeople().subscribe(people => this.people = people);
  }

  ngOnDestroy(): void {
    this.heroesSub.unsubscribe();
  }

  getImage(image: string): string {
    return `url(${image})`;
  }

  getTotal(): number {
    return this.people.reduce((acc, item ) => acc + item.costPerPost, 0);
  }
}
