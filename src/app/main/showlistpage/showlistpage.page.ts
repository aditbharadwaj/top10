import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Listing } from "src/app/interfaces/show-list.interface";
import { ListServiceService } from "src/app/services/list-service.service";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Plugins } from "@capacitor/core";
import { ToastController } from '@ionic/angular';
const { Storage } = Plugins;
@Component({
  selector: "app-showlistpage",
  templateUrl: "./showlistpage.page.html",
  styleUrls: ["./showlistpage.page.scss"],
})
export class ShowlistpagePage implements OnInit {
  public list: Listing;
  public anArray = [];
  public itemArray = [];
  public newArray = [];
  public inputValue: any;
  data: boolean;
  extraData:any;
  id:any;
  constructor(
    private route: ActivatedRoute,
    private listService: ListServiceService,
    private navCtrl: NavController,
    private storage: NativeStorage,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private router:Router
  ) {
    // Initialise a placeholder note until the actual note can be loaded in
    if (this.router.getCurrentNavigation().extras.state) {
      this.extraData = this.router.getCurrentNavigation().extras.state;
      console.log('this.extraData :', this.extraData.id , this.extraData.title);
      
    }
    this.list = {
      id: "",
      title: "",
      content: [],
    };
    
  }

  ngOnInit() {
    this.getObject(this.extraData.id);
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  // JSON "set" example
  async setObject() {
    this.listService.setObject(this.extraData.id,this.extraData.title, this.anArray);
    const message="New List Saved";
    this.showToast(message);
  }

  //Update
  async updateObject(){
    this.listService.update(this.extraData.contentId,this.newArray);
    console.log('this.anArray :', this.anArray);
    const message=" List Updated";
    this.showToast(message);
  }

  // JSON "get" example
  async getObject(id) {
    const ret = await Storage.get({ key: "user" });
    const user = JSON.parse(ret.value);
    console.log('user :', user);
    console.log('user.content :', user[id].content);
    if(ret.value){
      this.newArray.push(...user[id].content);
      this.data = true;
      console.log('user[id].content :', user[id].content);
    }
    
    console.log("Got item: ", user);
    
  }

  //clear
  async clear() {
    this.listService.clearList(this.extraData.id);
    this.newArray.splice(0);
   /*  await Storage.remove({ key: 'input' });
     */
  }

  goTo() {
    console.log("this.anArray", this.anArray);
    this.data = true;
    this.getObject(this.extraData.id);
  }

  addMore(){
    const test = this.newArray.push({ value: "" });
   const newTest=  this.list.content.push(...this.newArray);
   console.log('newTestConcat :', newTest);
   // this.setObject();
    console.log(" test Concat:", test);  
  }

  Add() {
    const test = this.anArray.push({ value: "" });
   const newTest=  this.list.content.push(...this.anArray);
   console.log('newTest :', newTest);
   // this.setObject();
    console.log(" test:", test);
  }

  noteChanged() {
    /* this.listService.save();
    this.listService.saveInputArray(this.anArray); */
    this.setObject();
  }

  delete(index) {
    /* this.anArray.splice(index, 1);
    this.listService.saveInputArray(this.anArray); */
  }

  deleteNote() {
    this.listService.deleteList(this.list);
    this.navCtrl.navigateBack("/folder/Home");
  }
}
