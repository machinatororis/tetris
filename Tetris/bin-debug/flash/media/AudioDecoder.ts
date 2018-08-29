/// <reference path="../../base.d.ts" />
﻿
namespace flash.media
{
	
	/**
	 * The AudioDecoder class enumerates the types of multichannel audio that a system can support.
	 * Use one of the constants defined in this class as the parameter to the hasMultiChannelAudio() method of the Capabilities class.
	 * 
	 * AIR profile support: Multichannel audio is supported only on AIR for TV devices. 
	 * On all other devices, hasMultiChannelAudio() always returns false. See AIR Profile Support for more information regarding API 
	 * support across multiple profiles.
	 * 
	 * @author pkulikov
	 */
	export  class AudioDecoder
	{
		/**
		 * Dolby Digital Audio, which is also known as AC-3.
		 */		
		public static DOLBY_DIGITAL : string = "DolbyDigital";

		/**
		 * Dolby Digital Plus Audio, which is also known as Enhanced AC-3 and Enhanced Dolby Digital.
		 */
		public static DOLBY_DIGITAL_PLUS : string = "DolbyDigitalPlus";

		/**
		 * DTS Audio, which is also known as DTS Coherent Acoustics, DTS Digital Surround, and DTS core.
		 */
		public static DTS : string = "DTS";

		/**
		 * DTS Express Audio, which is also known as DTS Low Bit Rate (LBR).
		 */
		public static DTS_EXPRESS : string = "DTSExpress";

		/**
		 * DTS-HD High Resolution Audio, which is also known as DTS-HD HR.
		 */
		public static DTS_HD_HIGH_RESOLUTION_AUDIO : string = "DTSHDHighResolutionAudio";

		/**
		 * DTS-HD Master Audio, which is also known as DTS-HD MA.
		 */
		public static DTS_HD_MASTER_AUDIO : string = "DTSHDMasterAudio";
	}	
}