/**
 * GlideElement values from the Physical Network table.
 * @interface Ix_44813_phys_net_networkFields
 * @extends {Icmdb_ciFields}
 */
declare interface Ix_44813_phys_net_networkFields extends Icmdb_ciFields { }
declare interface Ix_44813_phys_net_networkGlideRecord extends Icmdb_ciGlideRecord, Ix_44813_phys_net_networkFields { }
declare interface Ix_44813_phys_net_networkGlideElement extends Icmdb_ciGlideElementBase<Ix_44813_phys_net_networkGlideRecord>, Ix_44813_phys_net_networkFields { }