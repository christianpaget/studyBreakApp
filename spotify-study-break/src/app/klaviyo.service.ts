import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KlaviyoService {
  private klaviyoPublicKey = "VC8jcn"; //Safe to expose

  // Logs to Klaviyo that user has accessed playlist creation
  sendPlaylistScreenTrackingToKlaviyo(){
		let publicKey = this.klaviyoPublicKey;
		let userEmail = window.localStorage.getItem("email")
		console.log(userEmail)
    let userName = window.localStorage.getItem('user')
		const options = {
			method: 'POST',
			headers: { Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				data: '{"token":"' + publicKey + '" ,"event": "accessed playlist creation", "customer_properties": {"$email":"' + userEmail + '", "full_name":"' + userName + '"}}'
			})
		};
    // Calls API
    this.trackingApi(options);
  }
  // Logs to Klaviyo that user has accessed spotify player screen and sends playlist info
  sendPlayerAccessToKlaviyo(playlist){
    let publicKey = this.klaviyoPublicKey;
    let tempPlaylist = JSON.stringify(playlist);
    tempPlaylist = tempPlaylist.substring(1, tempPlaylist.length - 1)
    console.log(tempPlaylist)
    let userName = window.localStorage.getItem('user')
		let userEmail = window.localStorage.getItem("email")
		const options = {
			method: 'POST',
			headers: { Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				data: '{"token":"' + publicKey + '" ,"event": "accessed listening screen", "customer_properties": {"$email":"' + userEmail + '", "full_name":"' + userName + '", '+ tempPlaylist + '}}'
        //data: '{"token":"' + publicKey + '" ,"event": "accessed listening screen", "customer_properties": {"$email":"' + userEmail + '"}, "properties": ' + tempPlaylist + '}'

      })
		};
    console.log('{"token":"' + publicKey + '" ,"event": "accessed listening screen", "customer_properties": {"$email":"' + userEmail + '", '+ tempPlaylist + '}}')
    console.log(options.body)
    // Calls API
    this.trackingApi(options);
  }

  // Method to call API given passed in options
  trackingApi(options){
    fetch('https://a.klaviyo.com/api/track', options)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));
  }

  constructor() { }
}
