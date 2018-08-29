namespace mx.core
{
	
   export  interface IRepeaterClient
   {
       
      
      instanceIndices : any[];
      
      /*function set instanceIndices(param1:Array) : void;*/
      
      isDocument : boolean;
      
      repeaters:any[];
      
      initializeRepeaterArrays(param1:IRepeaterClient) : void;
      
      /*function get repeaters() : Array;*/
      
      repeaterIndices:any[];
      
      /*function get repeaterIndices() : Array;*/
   }

}