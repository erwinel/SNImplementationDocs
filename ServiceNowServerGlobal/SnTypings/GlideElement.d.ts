/// <reference path="JavaTypes.d.ts" />

declare interface IGlideElement {

}

declare abstract class GlideElement implements IGlideElement {

}

declare namespace com {
    export namespace glide {
        export namespace script {
            export abstract class FieldGlideDescriptor extends GlideElement {
            }
        }
    }
}
