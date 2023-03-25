import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  Readmore: boolean = false;
  longText:string ="";

  ngOnInit() {
  this.longText = `This is long paragraph text containing several words continued. An example of implementing dynamically limit long text Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita optio temporibus laborum? Atque deleniti autem nam vero in corrupti, ipsam praesentium doloribus nulla numquam cum, inventore nisi exercitationem quisquam et mollitia? Corrupti, libero blanditiis fugiat quae, repellat molestiae iure aut incidunt reprehenderit, sequi eius eveniet ipsum dolore quia! Sunt consequuntur veniam reiciendis optio quas doloribus ipsam iste repudiandae, iure natus illo ea magnam ducimus excepturi ipsum possimus fugit sint unde aperiam qui consectetur quisquam ut aut esse. Adipisci dignissimos, soluta autem nesciunt quis repellendus dolore voluptates laborum placeat sed? Quasi iusto accusantium molestias perferendis. Repellendus harum natus magni dignissimos? Reprehenderit.`;
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.longText += "This is create by om"
      event.target.complete();
    }, 2000);
  };

  onLogout() {
    this.authService.signOut().subscribe(()=> {
      this.router.navigate(['auth/login'])
    })
  }


}
