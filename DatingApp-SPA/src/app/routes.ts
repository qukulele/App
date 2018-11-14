import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AutchGuard } from './guards/autch.guard';


export const appRoutes: Routes = [
    // tutaj opisuje routing , czyli nazwę ścierzki i jaki komponent jej odpowiada
    // działa to na zasadzie pierwsze dopasowanie wygrywa
    // ostatnia opcja jest opcją kiedy zapytanie nie pasuje do żadnego z powyższych
    // w propertis canActivate ustawiamy co sprawdza czy można otworzyć link, stworzona klasa która sprawdza czy użytkownik jest zalogowany
    {path: '', component: HomeComponent},
        {
            path: '', // jestu pusty ponieważ będzie dopasowywał adres z ponizszych adresów,
                     // jak bysmy coś dodali to każdy adres trzeba by było od tego zaczynać
            runGuardsAndResolvers: 'always',
            canActivate: [AutchGuard], // tutaj sprawdzamy czy możemy wyświetlić daną stronę
            children: [
                {path: 'members', component: MemberListComponent, canActivate: [AutchGuard]},
                {path: 'messages', component: MessagesComponent},
                {path: 'lists', component: ListsComponent},
            ]
        },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
