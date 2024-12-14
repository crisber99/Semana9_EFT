import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PiePaginaComponent } from "./components/pie-pagina/pie-pagina.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PiePaginaComponent, MenuComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Libros';

}
