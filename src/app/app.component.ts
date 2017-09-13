import {Component, OnInit, ViewChild, AfterViewInit, Inject} from '@angular/core';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {MdIconRegistry} from '@angular/material';
import {DataComponent} from './data/data.component';
import {APP_CONFIG, AppConfig} from './app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, AfterViewInit {
  title = '首页';

  @ViewChild('data')
  private dataComponent: DataComponent;

  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer,
              @Inject(APP_CONFIG) config) {
    console.log(config.title + ' === ' + config.apiEndpoint);
    iconRegistry.addSvgIcon(
      'back',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/back.svg')
    );
  }

  ngOnInit(): void {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .mergeMap(route => route.data)
      .subscribe((event) => {
        console.log('NavigationEnd:', event['title']);
        this.titleService.setTitle(event['title']);
        this.title = event['title'];
      });

  }

  ngAfterViewInit(): void {
    console.log('app-ngOnInit', 'get child value from parent at ts ：' + this.dataComponent.name);
  }

  showChildClick(name: string) {
    console.log('app-showChildClick', name);
  }
}


