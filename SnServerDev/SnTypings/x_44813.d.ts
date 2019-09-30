/**
 * GlideElement values from the Physical Network table.
 * @interface Ix_44813_phys_net_networkFields
 * @extends {Icmdb_ciFields}
 */
declare interface Ix_44813_phys_net_networkFields extends Icmdb_ciFields { }
declare interface Ix_44813_phys_net_networkGlideRecord extends Icmdb_ciGlideRecord, Ix_44813_phys_net_networkFields { }
declare interface Ix_44813_phys_net_networkGlideElement extends Icmdb_ciGlideElementBase<Ix_44813_phys_net_networkGlideRecord>, Ix_44813_phys_net_networkFields { }
/**
 * GlideElement values from the Security Classification table.
 * @interface Ix_44813_sec_clsif_definitionFields
 * @extends {Isys_metadataFields}
 */
declare interface Ix_44813_sec_clsif_definitionFields extends Isys_metadataFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Ix_44813_sec_clsif_definitionFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Ix_44813_sec_clsif_definitionFields
	 */
    name: IStringGlideElement;
	/**
	 * Order
	 * @type {INumberGlideElement}
	 * @memberof Ix_44813_sec_clsif_definitionFields
	 * @description Internal type is integer
	 */
    order: INumberGlideElement;
	/**
	 * Portion Marking
	 * @type {IStringGlideElement}
	 * @memberof Ix_44813_sec_clsif_definitionFields
	 */
    portion_marking: IStringGlideElement;
}
declare interface Ix_44813_sec_clsif_definitionGlideRecord extends Isys_metadataGlideRecordBase, Ix_44813_sec_clsif_definitionFields { }
declare interface Ix_44813_sec_clsif_definitionGlideElement extends Isys_metadataGlideElementBase<Ix_44813_sec_clsif_definitionGlideRecord>, Ix_44813_sec_clsif_definitionFields { }