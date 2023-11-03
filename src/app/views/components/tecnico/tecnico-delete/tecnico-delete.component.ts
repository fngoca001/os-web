import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/Models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {


  id_tec = ''

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }


  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
      console.log(this.tecnico)
    })
  }

  delete():void{
    this.service.delete(this.id_tec).subscribe(resposta => {
      this.router.navigate(['tecnicos'])
      this.service.massage('Técnico deletado com sucesso!')
    }, err => {
      if(err.error.error.match('possui Ordens de serviço')){
        this.service.massage(err.error.error)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }
}

