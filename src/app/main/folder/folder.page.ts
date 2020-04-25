import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { ListServiceService } from "src/app/services/list-service.service";
import { Plugins } from '@capacitor/core';
import { Router, NavigationExtras } from '@angular/router';

const { Storage } = Plugins;

@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    public listService: ListServiceService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.listService.load();
  }

   clear() {
    this.listService.clear();
  }

  goTo(title,id,contentId){
  console.log('title,id :', title,id);
    let navigationExtras: NavigationExtras = {
      state: {
        title: title,
        id: id,
        contentId: contentId
      }
    };
    this.router.navigateByUrl("/showlistpage", navigationExtras);
  }

  addNote() {
    this.alertCtrl
      .create({
        header: "New Note",
        message: "What should the title of this note be?",
        inputs: [
          {
            type: "text",
            name: "title",
          },
        ],
        buttons: [
          {
            text: "Cancel",
          },
          {
            text: "Save",
            handler: (data) => {
              this.listService.createList(data.title);
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
