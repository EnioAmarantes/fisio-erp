import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidemenuComponent } from "./components/sidemenu/sidemenu.component";
import { PanelMenuModule } from 'primeng/panelmenu';
import { SplitterModule } from 'primeng/splitter';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, FooterComponent, SidemenuComponent, PanelMenuModule, DrawerModule,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fisio-erp');
  titleText = 'Fisio ERP da Mirella';
  drawerVisible = false;
}
