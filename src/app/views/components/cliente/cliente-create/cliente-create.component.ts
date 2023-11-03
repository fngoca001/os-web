import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {
  
  clientes: Cliente = {
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
    private service: ClienteService) { }


  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

  create(): void {
    this.service.create(this.clientes).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.massage('Cliente criado com sucesso!')
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
