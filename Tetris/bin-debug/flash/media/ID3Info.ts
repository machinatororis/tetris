/// <reference path="../../base.d.ts" />

namespace flash.media
{
	
	/**
	 * The ID3Info class contains properties that reflect ID3 metadata. 
	 * You can get additional metadata for MP3 files by accessing the id3 property of the Sound class; 
	 * for example, mySound.id3.TIME. For more information, see the entry for Sound.id3 and the ID3 tag definitions at http://www.id3.org. 
	 * @author pkulikov
	 * 
	 */	
	export  class ID3Info
	{
		/**
		 * The name of the song; corresponds to the ID3 2.0 tag TIT2. 
		 */		
		public songName:string = null;
		
		/**
		 * The name of the artist; corresponds to the ID3 2.0 tag TPE1. 
		 */		
		public artist:string = null;
		
		/**
		 * The name of the album; corresponds to the ID3 2.0 tag TALB. 
		 */		
		public album:string = null;
		
		/**
		 * The year of the recording; corresponds to the ID3 2.0 tag TYER. 
		 */		
		public year:string = null;
		
		/**
		 * A comment about the recording; corresponds to the ID3 2.0 tag COMM. 
		 */		
		public comment:string = null;
		
		/**
		 * The genre of the song; corresponds to the ID3 2.0 tag TCON. 
		 */		
		public genre:string = null;
		
		/**
		 * The track number; corresponds to the ID3 2.0 tag TRCK. 
		 */		
		public track:string = null;
	}
}