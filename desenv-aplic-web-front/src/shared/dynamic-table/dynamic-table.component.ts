import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Column } from '../interfaces/column';
import { Actions } from '../interfaces/actions';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActionClickEvent } from '../interfaces/action-click-event';
import { Subject } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort as MaterialSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnDestroy, OnChanges {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() displayedColumns: Column[] = [];
  @Input() data: any[] = [];
  @Input() actions: Actions[] = [];
  @Input() header: boolean = true;  

  @Output() actionClick = new EventEmitter<ActionClickEvent>();
  
  headers!: string[];
  dataSource!: MatTableDataSource<any>;
  columns: any = [];
  rightActions: Actions[] = [];
  public actionColumnName = 'actions';
  private destroy$ = new Subject();

  constructor() {
    // this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {  
    console.log("[ngOnChanges]", changes);
    if (changes) {
      this.createTable();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.createTable();
  }

  onSortChange(event: MaterialSort) {
    // this.menuIndex = undefined;
    // this.sortChange.emit(event);
  }

  onActionClick($event: any, element: any) {
    this.actionClick.emit({
      element: element,
      name: $event.name 
    });
  }

  private createTable() {
    this.dataSource = new MatTableDataSource(this.data);
    this.columns = this.displayedColumns.map(c => c.name);
    this.columns.push(this.actionColumnName);
  }
}
