/// <reference path="ServiceNowLegacy.d.ts" />
/// <reference path="ServiceNowScoped.d.ts" />

// gs.include("j2js");
declare function j2js(javaObject: Boolean): boolean;
declare function j2js(javaObject: String): string;
declare function j2js(javaObject: Packages.java.lang.Integer): number
declare function j2js(javaObject: Packages.java.lang.Long): number
declare function j2js(javaObject: Packages.java.lang.Double): number
declare function j2js(javaObject: Packages.java.lang.Byte): number
declare function j2js(javaObject: Packages.java.lang.Float): number
declare function j2js(javaObject: Packages.java.lang.Short): number
declare function j2js(javaObject: Packages.java.lang.Character): number
declare function j2js(javaObject: Packages.java.util.List): any[];
declare function j2js(javaObject: Packages.java.util.Map): { [key: string]: any; };
declare function j2js(javaObject: Packages.java.util.Set): any[];
declare function j2js(javaObject: Object): any;