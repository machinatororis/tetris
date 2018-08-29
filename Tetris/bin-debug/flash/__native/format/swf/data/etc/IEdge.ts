
namespace flash.__native.format.swf.data.etc
{
	
	export  interface IEdge
	{
		getFromX () : number;
		getFromY () : number;
		getToX () : number;
		getToY () : number;
		getLineStyleIdx () : number;
		getFillStyleIdx () : number;
		reverseWithNewFillStyle (newFillStyleIdx:number) : IEdge;
	}

}