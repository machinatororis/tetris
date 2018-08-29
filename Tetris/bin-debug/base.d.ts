// original
declare let __vanilla__:any;

// system
declare function __load__(list:string[]);
declare function __provide__(name:string);
declare function __initialize__();

// static init
declare function __sti__(ins:any, prop:string, dep:string[], fn:Function);
declare function __stb__ (ins:any, dep:string[], fn:Function);

// casting
declare function is(v: any, t:any):boolean;
declare function as(v: any, t:any):any;
declare function strict(v: any, t:any):any;

// casting errors
declare function e2e(e: any):any;

// iterators
declare function forIn(v: any):any;
declare function forOf(v: any):any;

// global class
declare class int { constructor( v?: any ); }
declare class uint { constructor( v?: any ); }

// global function
declare function trace(...a): void;
declare function escape(value: string): string;
declare function unescape(value: string): string;
declare function unbind(value:any): Function;