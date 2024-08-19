import { Component, OnInit } from '@angular/core';
import { Actions } from 'src/shared/interfaces/actions';
import { Column } from 'src/shared/interfaces/column';
import { UsuarioService } from './services/usuario.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  pagination: any = {
    pageStart: 0,
    pageSize: 10,
    currentPage: 1,
  };
  totalElements!: number;
  rows: any[] = [];

  tableColumns: Column[] = [
    {
      name: "nome",
      title: "Nome do usuário"
    },
    {
      name: "email",
      title: "E-mail"
    },
    {
      name: "tipo",
      title: "Tipo do usuário"
    }
  ]

  // tableColumns = ['nome', 'tipo', 'email'];

  actions: Actions[] = [
    {
      name: "edit",
      tooltip: "Editar",
      icon: "edit",
      class: "edit"
    },
    {
      name: "delete",
      tooltip: "Excluir",
      icon: "delete_forever",
      class: "delete"
    }
  ]

  private destroy$ = new Subject();
  constructor(
    private service: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  private getList() {
    this.service.getAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        console.log("[getList]", response)
        this.rows = response;
      },
      error: (error) => {
        console.error("[getList] Error fetching list:", error);
      }
    })
  }

  onActionClick(event: any) {
    console.log("[onActionClick]", event);
    if (event.name === "delete") {
      this.service.delete(event.element.id).pipe(finalize(() => this.getList())).subscribe({
        next: (response) => {
          // this.getList();
        }
      })
    }
  }
}
