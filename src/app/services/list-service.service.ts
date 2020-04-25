import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Listing } from "../interfaces/show-list.interface";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
const { Storage } = Plugins;
@Injectable({
  providedIn: "root",
})
export class ListServiceService {
  public listing: Listing[] = [];
  public loaded: boolean = false;
  public item1: any[] = [];
  constructor(private storage: NativeStorage) {}
    

  async load() {
     await Storage.get({ key: 'user' }).then((list) => {
      if(list.value != null){
        this.listing = JSON.parse(list.value);
        console.log('Got item: ', this.listing);
      }
    });  
  }

  async clear() {
    await Storage.clear();
    this.listing.splice(0);
  }
  clearList(id){
    this.listing[id].content = [];
    this.save();
  }

  saveInputArray(item: any[] = []): void {
    // Saving item array instead of res value.
    this.storage.setItem("item", item).then(
      () => {
        console.log("Item Stored");
      },
      (error) => console.error("Error storing item", error)
    );
  }

  async save() {
    // Save the current array of notes to storage
    //this.storage.setItem('list', this.listing);
    await Storage.set({
      key: "user",
      value: JSON.stringify(this.listing),
    });
    console.log('Got item: ', this.listing);
  }

  update(contentId,anArray) {
  console.log('anArray :', anArray);
    // Return the note that has an contentId matching the contentId passed in
    var content = this.listing.find((list) => list.id === contentId);
    if(content){
      content.content = anArray;
      console.log('content :', content);
      this.save();
    }
  }

  createList(title): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.listing.map((list) => parseInt(list.id)), 0) + 1;

    this.listing.push({
      id: id.toString(),
      title: title,
      content: [],
    });

    this.save();
  }

  
  async setObject(id:any,title:any,anArray:any) {
    this.listing[id].content = anArray;
    this.save();
  }

  deleteList(list): void {
    // Get the index in the array of the list that was passed in
    let index = this.listing.indexOf(list);

    // Delete that element of the array and resave the data
    if (index > -1) {
      this.listing.splice(index, 1);
      this.save();
    }
  }
}
