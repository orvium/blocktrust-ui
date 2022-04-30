import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Paper } from '../../../core/interfaces/paper.interface';
import { PapersService } from '../../../core/services/papers/papers.service';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {
  public papers: Paper[] = [];

  constructor(
    private papersService: PapersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.papersService.getAllPapers$().pipe(
      tap((list: Paper[]) => this.papers = list)
    ).subscribe();
  }

  public createPaper(): void {
    this.router.navigate(['papers', 'create']);
  }

  searchPapers(event: Event): void {
    this.papersService.getPapers$({ query: (event.target as HTMLInputElement).value }).subscribe(
      papers => {
        this.papers = papers;
      }
    );
  }
}
