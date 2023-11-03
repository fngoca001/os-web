import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Tecnico } from 'src/app/Models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent {

  tecnicos: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(5)])
  telefone = new FormControl('', [Validators.minLength(5)])

  constructor(
    private router: Router,
    private service: TecnicoService) { }


  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

  create(): void {
    this.service.create(this.tecnicos).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.massage('Técnico criado com sucesso!')
    }, err => {

      if (err.error.error.match('já cadastrado')) {
        this.service.massage(err.error.error)
      } else if (err.error.errors[0].message == "invalid Brazilian individual taxpayer registry number (CPF)") {

        this.service.massage("CPF Inválido!")

      }
    })
  }

  errrorValidNome() {
    if (this.nome.invalid) {
      return 'O nome deve ter entre 5 e 50 caracteres!';
    }
    return false;
  }

  errrorValidCPF() {
    if (this.cpf.invalid) {
      return 'O CPF deve ter entre 11 e 15 caracteres!';
    }
    return false;
  }

  errrorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O telefone deve ter entre 11 e 18 caracteres!';
    }
    return false;
  }
}
