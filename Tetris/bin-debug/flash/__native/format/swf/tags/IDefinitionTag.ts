namespace flash.__native.format.swf.tags
{
	
	export  interface IDefinitionTag extends ITag
	{
		characterId:number;
		/*function set characterId(value:uint):void;*/
		
		clone():IDefinitionTag;
	}
}