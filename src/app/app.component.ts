import {Component, OnInit} from '@angular/core';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = '首页';

  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
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
}


