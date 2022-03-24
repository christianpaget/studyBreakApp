export class newPlaylist{
	constructor(
		public title: string,
		public focusPlaylist: string,
		public relaxPlaylist: string,
		public focusTime: number,
		public relaxShortTime: number,
		public relaxLongTime: number,
		public roundsNumber: number,
		public playlistID: number,
		public focusPlaylistID: string,
		public relaxPlaylistID: string,
		public userID: string
		){}
}