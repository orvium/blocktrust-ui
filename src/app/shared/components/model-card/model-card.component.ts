import { Component, Input } from '@angular/core';
import { ReputationModelDTO } from '../../../core/interfaces/reputation-model.interface';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.scss'],
})
export class ModelCardComponent {

  @Input() model: ReputationModelDTO;

  constructor(private userService: UserService, private router: Router) {
  }

  public edit(): void {
    this.router.navigate([`reputation-models/edit/${this.model._id}`]);
  }


}
