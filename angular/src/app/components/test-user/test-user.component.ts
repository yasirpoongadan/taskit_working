import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-test-user',
  templateUrl: './test-user.component.html',
  styleUrls: ['./test-user.component.css']
})
export class TestUserComponent implements OnInit {
  displayedColumns = ['id', 'project_name', 'project_type', 'project_code'];
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

export interface Project {
  id: number,
  project_name: string,
  project_type: string,
  project_code: string,
  status: string
}

const ELEMENT_DATA: Project[] = [
  {
    id: 61,
    project_name: 'sss',
    project_type: 'ss Billable',
    project_code: 'sysPR/032/3/29/2018',
    status: 'Drafted'
  },
  {
    id: 60,
    project_name: 'aaa',
    project_type: ' aa Billable',
    project_code: 'sysPR/031/3/29/2018',
    status: 'Drafted'
  },
  {
    id: 80,
    project_name: 'dd',
    project_type: 'ABc',
    project_code: 'daPR/44/3/29/34',
    status: 'Comple'
  }
];
