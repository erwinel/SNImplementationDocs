declare abstract class GlideList2 {
    addFilter(filter: string): void;
    get(ListID: string): GlideList2 | null;
    get(DOMelement: object): GlideList2 | null;
    getChecked(): string;
}
