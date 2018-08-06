import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'project'
})
export class ProjectPipe implements PipeTransform {

  transform(project: any, searchTerm: any): any {
    if(searchTerm ===  undefined){
      return project;

    }
    return project.filter(function(pro){
      // console.log(pro);
      return pro.project_name.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }

}
