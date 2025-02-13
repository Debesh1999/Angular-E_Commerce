import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string ='';
  userName:string="";
  searchResult:undefined|product[];
  cartItems=0;

  constructor(private route:Router, private product:ProductService){}  

  ngOnInit(): void{
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore=localStorage.getItem('seller');
          let sellerData =sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          console.warn("in seller area")
          this.menuType = "Seller"
        }else{
          console.warn("outside seller area")
          this.menuType = "default"
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  // searchProduct(query:KeyboardEvent){
  //   if(query){
  //     const element = query.target as HTMLInputElement;
  //     this.product.searchProduct(element.value).subscribe((result)=>{
        
  //       console.warn(result)
  //       if(result.length>5){
  //         result.length=length
  //       }
  //       this.searchResult=result;
  //     })
  //   }
  // }

  searchProduct(query: KeyboardEvent) {
    if (query?.target) {
      const element = query.target as HTMLInputElement;
      const searchText = element.value.trim();
  
      if (searchText.length === 0) {
        this.searchResult = []; // Reset results if input is empty
        return;
      }
  
      this.product.searchProduct(searchText).subscribe((result) => {
        console.warn(result);
        
        // Ensure we only take the first 5 results
        this.searchResult = result.slice(0, 5);
      });
    }
  }

  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }

  hideSearch(){
    this.searchResult=undefined
  }

  submitSearch(val:string){
    console.warn(val)
  this.route.navigate([`search/${val}`]);
  }

}
