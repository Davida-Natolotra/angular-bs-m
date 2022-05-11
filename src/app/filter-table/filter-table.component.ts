import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { PeriodicElement, ELEMENT_DATA } from './data';
import * as e from 'express';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
})
export class FilterTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  readonly formControl: FormGroup;
  element: PeriodicElement | undefined;

  constructor(formBuilder: FormBuilder) {
    this.dataSource.filterPredicate = ((data: PeriodicElement, filter: any) => {
      const a = !filter.position || data.position === filter.position;
      const b = !filter.name || data.name.toLowerCase().includes(filter.name);
      const c = !filter.symbol || data.symbol === filter.symbol;
      return a && b && c;
    }) as (arg0: PeriodicElement, arg1: string) => boolean;

    this.formControl = formBuilder.group({
      name: '',
      position: '',
      symbol: '',
    });
    this.formControl.valueChanges.subscribe((value) => {
      console.log(value);
      const filter = {
        ...value,
        name: value.name.trim().toLowerCase(),
      } as string;
      this.dataSource.filter = filter;
    });
  }
  detailElements(element: PeriodicElement) {
    this.dataSource.filteredData.forEach((e) =>
      e.name !== element.name ? (e.isClicked = false) : (e.isClicked = true)
    );
    this.element = element;
  }

  clearSelection() {
    this.element = undefined;
    this.dataSource.filteredData.forEach((e) => (e.isClicked = false));
  }

  get results() {
    return this.dataSource.filteredData.length;
  }
}
