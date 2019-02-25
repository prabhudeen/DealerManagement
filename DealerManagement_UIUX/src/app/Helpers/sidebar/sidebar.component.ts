import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router } from '@angular/router';
import { SessionService } from '../../shared/session.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/table',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
     },
     {
        path: '/report',
        title: 'Report',
        type: 'link',
        icontype: 'bar_chart'
     },
     
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',

})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(private router:Router, private sessionService: SessionService){

    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    logout(){
        this.sessionService.remove('userName');
        this.router.navigate(['login']);
    }

    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
