namespace sn {
    export interface GlideElement {
        /**
         * Gets the object label.
         * @returns {string} The object label.
         */
        getLabel(): string;

        // getModifiedBy(): string;

        /**
         * Gets the name of the field.
         * @returns {string} The name of the field.
         */
        getName(): string;

        /**
         * Determines if a field is null.
         * @returns {boolean} True if the field is null or an empty string, false if not.
         */
        nil(): boolean;

        /**
         * Sets the value of a field.
         * @param {*} value Object value to set the field to.
         */
        setValue(value: any): void;

        /**
         * Converts the value to a string.
         * @returns {string} The value as a string
         */
        toString(): string;
    }

    export interface GlideRecord {
        readonly sys_id: GlideElement;
        [key: string]: GlideElement | any;

        /**
         * Retrieves the string value of an underlying element in a field.
         * @param {string} name The name of the field to get the value from.
         * @returns {string|null|undefined} The value of the field.
         */
        getValue(name: string): string | null | undefined;

        /**
         * Indicates whether the user's role permits them to read the associated GlideRecord.
         * @returns {boolean} True if the field can be read, false otherwise.
         */
        canRead(): boolean;

        /**
         * Determines whether the user's role permits them to write to the associated GlideRecord.
         * @returns {boolean} True if the user can write to the field, false otherwis.
         */
        canWrite(): boolean;

        /**
         * Retrieves the string value of an underlying element in a field.
         * @param {string} name The name of the field to get the value from.
         * @returns {string|null|undefined} The value of the field.
         */
        getValue(name: string): string | null | undefined;

        /**
         * Checks if the current record is a new record that has not yet been inserted into the database.
         * @returns {boolean} True if the record is new and has not been inserted into the database.
         */
        isNewRecord(): boolean;
    }

    export interface GlideSession {
        isInteractive(): boolean;
        isLoggedIn(): boolean;
    }

    class Emulated_GlideSession implements GlideSession {
        private _errorMessages: string[] = [];
        private _infoMessages: string[] = [];
        private _logCache: { level: "debug"|"error"|"warn"|"info", message: string }[] = [];
        private _service: app.NotificationMessageService | undefined;
        constructor(private _isInteractive: boolean, private _isLoggedIn: boolean) { }
        isInteractive(): boolean { return this._isInteractive; }
        isLoggedIn(): boolean { return this._isLoggedIn; }
        addErrorMessage(message: any): void {
            this._errorMessages.push(message);
            let service: app.NotificationMessageService = this._service;
            if (typeof service === "object" && service != null)
                service.addNotificationMessage(message, "Emulated Glide Session Message", app.NotificationMessageType.error);
        }
        addInfoMessage(message: any): void {
            this._infoMessages.push(message);
            let service: app.NotificationMessageService = this._service;
            if (typeof service === "object" && service != null)
                service.addNotificationMessage(message, "Emulated Glide Session Message", app.NotificationMessageType.info);
        }
        debug(message: any): void {
            let service: app.NotificationMessageService = this._service;
            if (typeof service === "object" && service != null)
                service.$log.debug({ type: "Emulated Glide Session Log Message", message: message });
            else
                this._logCache.push({ level: "debug", message: message });
        }
        error(message: any): void {
            let service: app.NotificationMessageService = this._service;
            if (typeof service === "object" && service != null)
                service.$log.error({ type: "Emulated Glide Session Log Message", message: message });
            else
                this._logCache.push({ level: "error", message: message });
        }
        warn(message: any): void {
            let service: app.NotificationMessageService = this._service;
            if (typeof service === "object" && service != null)
                service.$log.warn({ type: "Emulated Glide Session Log Message", message: message });
            else
                this._logCache.push({ level: "warn", message: message });
        }
        info(message: any): void {
            let service: app.NotificationMessageService = this._service;
            if (typeof service === "object" && service != null)
                service.$log.info({ type: "Emulated Glide Session Log Message", message: message });
            else
                this._logCache.push({ level: "info", message: message });
        }
        getErrorMessages(clear?: boolean): string[] {
            let result: string[] = this._errorMessages;
            if (clear === true)
                this._errorMessages = [];
            return result;
        }
        getInfoMessages(clear?: boolean): string[] {
            let result: string[] = this._infoMessages;
            if (clear === true)
                this._infoMessages = [];
            return result;
        }
        attachNotificationMessageService(service: app.NotificationMessageService) {
            this._service = service;
            if ((typeof service !== "object") || service == null)
                return;
            let logCache: { level: "debug" | "error" | "warn" | "info", message: string }[] = this._logCache;
            this._logCache = [];
            let errorMessages: string[] = this._errorMessages;
            let infoMessages: string[] = this._infoMessages;
            logCache.forEach((value: { level: "debug" | "error" | "warn" | "info", message: string }) => {
                switch (value.level) {
                    case "error":
                        service.$log.error({ type: "Emulated Glide Session Log Message", message: value.message });
                        break;
                    case "warn":
                        service.$log.warn({ type: "Emulated Glide Session Log Message", message: value.message });
                        break;
                    case "info":
                        service.$log.info({ type: "Emulated Glide Session Log Message", message: value.message });
                        break;
                    default:
                        service.$log.debug({ type: "Emulated Glide Session Log Message", message: value.message });
                        break;
                }
            });
            errorMessages.forEach((message: string) => service.addNotificationMessage(message, "Emulated Glide Session Message", app.NotificationMessageType.error));
            infoMessages.forEach((message: string) => service.addNotificationMessage(message, "Emulated Glide Session Message", app.NotificationMessageType.info));
        }
    }

    export interface GlideSystem {
        /**
         * Adds an error message for the current session.
         * @param {*} message The message to add.
         */
        addErrorMessage(message: any): void;

        /**
         * Adds an info message for the current session. This method is not supported for asynchronous business rules.
         * @param {*} message An info message object.
         */
        addInfoMessage(message: any): void;

        /**
         * Adds an info message for the current session. This method is not supported for asynchronous business rules.
         * @param {string} message The log message with place holders for any variable arguments.
         * @param {*} [parm1] First variable argument.
         * @param {*} [parm2] Second variable argument.
         * @param {*} [parm3] Third variable argument.
         * @param {*} [parm4] Fourth variable argument.
         * @param {*} [parm5] Fifth variable argument.
         */
        debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

        /**
         * Writes an error message to the system log.
         * @param {string} message The log message with place holders for any variable arguments.
         * @param {*} [parm1] First variable argument.
         * @param {*} [parm2] Second variable argument.
         * @param {*} [parm3] Third variable argument.
         * @param {*} [parm4] Fourth variable argument.
         * @param {*} [parm5] Fifth variable argument.
         */
        error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

        /**
         * Returns the list of error messages for the session that were added by addErrorMessage().
         * @returns {string[]} List of error messages.
         */
        getErrorMessages(): string[];

        /**
         * Gets a reference to the current Glide session.
         * @returns {GlideSession} A reference for the current session.
         */
        getSession(): GlideSession;

        /**
         * Writes an info message to the system log.
         * @param {string} message The log message with place holders for any variable arguments.
         * @param {*} [parm1] First variable argument.
         * @param {*} [parm2] Second variable argument.
         * @param {*} [parm3] Third variable argument.
         * @param {*} [parm4] Fourth variable argument.
         * @param {*} [parm5] Fifth variable argument.
         */
        info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

        /**
         * Determines if debugging is active for a specific scope.
         * @returns {boolean} True if either session debugging is active or the log level is set to debug for the specified scope.
         */
        isDebugging(): boolean;

        /**
         * Checks if the current session is interactive. An example of an interactive session is when a user logs in normally. An example of a non-interactive session is using a SOAP request to retrieve data.
         * @returns {boolean} True if the session is interactive.
         */
        isInteractive(): boolean;


        /**
         * Determines if the current user is currently logged in.
         * @returns {boolean} True if the current user is logged in.
         */
        isLoggedIn(): boolean;

        /**
         * Queries an object and returns true if the object is null, undefined, or contains an empty string.
         * @param {*} o The object to be checked.
         * @returns {boolean} True if the object is null, undefined, or contains an empty string; otherwise, returns false.
         */
        nil<T>(o?: T | null): o is null | undefined;

        /**
         * Writes a warning message to the system log.
         * @param {string} message The log message with place holders for any variable arguments.
         * @param {*} [parm1] First variable argument.
         * @param {*} [parm2] Second variable argument.
         * @param {*} [parm3] Third variable argument.
         * @param {*} [parm4] Fourth variable argument.
         * @param {*} [parm5] Fifth variable argument.
         */
        warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    }

    class Emulated_GlideSystem implements GlideSystem {
        constructor(private _session: Emulated_GlideSession) { }
        addErrorMessage(message: any): void { this._session.addErrorMessage(message); }
        addInfoMessage(message: any): void { this._session.addInfoMessage(message); }
        debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void { this._session.debug(sys.stringFormat(message, parm1, parm2, parm3, parm4, parm5));  }
        error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void { this._session.error(sys.stringFormat(message, parm1, parm2, parm3, parm4, parm5)); }
        getErrorMessages(): string[] { return this._session.getErrorMessages(); }
        getSession(): GlideSession { return this._session; }
        info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void { this._session.info(sys.stringFormat(message, parm1, parm2, parm3, parm4, parm5)); }
        isDebugging(): boolean { return true; }
        isInteractive(): boolean { return this._session.isInteractive(); }
        isLoggedIn(): boolean { return this._session.isLoggedIn(); }
        nil<T>(o?: T | null): o is null | undefined { return sys.isNil(o); }
        warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void { this._session.warn(sys.stringFormat(message, parm1, parm2, parm3, parm4, parm5)); }
    }
    
    export const gs = new Emulated_GlideSystem(new Emulated_GlideSession(true, true));
}

namespace sn_emulation_helpers {
    export class Emulated_GlideElement implements sn.GlideElement {
        private readonly _label: string;
        constructor(private readonly _gr: sn.GlideRecord, private _value: any | null | undefined, private _name: string, label?: string) {
            this._label = ((typeof label === "string") && (label = label.trim()).length > 0) ? label : _name;
        }
        getLabel(): string { return this._label; }
        getName(): string { return this._name; }
        canRead(): boolean { return true; }
        canWrite(): boolean { return true; }
        setValue(value: any): void { this._value = (isGlideElement(value)) ? ((value instanceof Emulated_GlideElement) ? value._value : value.toString()) : value; }
        nil(): boolean { return sys.isNil(this._value); }
        toString(): string {
            let value: any | null | undefined = this._value;
            return (sys.isNil(value)) ? "" : ((typeof value === "string") ? value : value + "");
        }

        belongsToEmulatedRecord(gr: Emulated_GlideRecord): boolean {
            return Emulated_SysId.areSame(<Emulated_SysId>gr.sys_id, this._gr.sys_id);
        }
    }

    function isGlideElement(obj: any | null | undefined): obj is sn.GlideElement {
        return (typeof obj === "object") && obj !== null && !Array.isArray(obj) && (typeof (<{ [key: string]: any }>obj)["getLabel"] === "function") && (typeof (<{ [key: string]: any }>obj)["getName"] === "function") && (typeof (<{ [key: string]: any }>obj)["nil"] === "function");
    }

    export class Emulated_SysId extends Emulated_GlideElement {
        private readonly _instance: Symbol;
        static toSysIdString(obj: any | null | undefined, newIfNotValid?: boolean): string {
            let sys_id: string = (isGlideElement(obj)) ? obj.toString() : ((typeof obj === "string") ? obj : ((sys.isNil(obj)) ? "" : obj + ""));
            if ((sys_id = sys_id.trim()).length == 32 && sys_id.match(/^[\da-f]+$/i))
                return sys_id.toLowerCase();
            if (newIfNotValid === true)
                return Emulated_SysId.NewSysId();
        }
        static NewSysId(): string {
            let value: string = "";
            let rand: RandomSource = new RandomSource();
            let arr: Int8Array = new Int8Array(32);
            rand.getRandomValues(arr).forEach((v: number) => value += (v >> 4).toString(16));
            return value;
        }
        constructor(gr: sn.GlideRecord, value?: string) {
            super(gr, Emulated_SysId.toSysIdString(value, true), "sys_id", "Sys ID");
            this._instance = Symbol();
        }
        static areSame(x: Emulated_SysId, y: sn.GlideElement): y is Emulated_SysId {
            return (typeof x === "object") && (typeof y === "object") && ((x === null) ? y === null : (y != null && (y instanceof Emulated_SysId) && x._instance === y._instance));
        }
    }
    export class Emulated_GlideRecord implements sn.GlideRecord {
        private _sys_id: Emulated_SysId;
        private _labels: { [key: string]: string; } = {};

        [key: string]: sn.GlideElement | any;
        get sys_id(): sn.GlideElement { return}
        constructor(values?: { [key: string]: any | null | undefined; }) {
            let sys_id: any | null | undefined;
            if (typeof values === "object" && values !== null && !Array.isArray(values)) {
                for (let n in values) {
                    let obj: any | null | undefined = values[n];
                    if (n === "sys_id")
                        sys_id = values[n];
                    else if (isGlideElement(obj)) {
                        let o: any | null | undefined = obj.getName();
                        if (sys.isNil(o) || o === n) {
                            let label: string = obj.getLabel();
                            this._labels[n] = ((typeof label === "string") && label.trim().length > 0) ? label : n;
                        } else
                            this._labels[n] = n;
                        this[n] = new Emulated_GlideElement(this, obj.toString(), n, this._labels[n]);
                    } else {
                        this._labels[n] = n;
                        this[n] = new Emulated_GlideElement(this, obj, n, n);
                    }
                }
            }
            this._sys_id = new Emulated_SysId(this, sys_id);
            this._labels[this._sys_id.getName()] = this._sys_id.getLabel();
        }
        protected __addElement(name: string, value: any | null | undefined, label?: string) {
            if (typeof label === "string" && label.trim().length > 0)
                this._labels[name] = label;
            else if (typeof this._labels[name] !== "string")
                this._labels[name] = name;
            if (isGlideElement(value)) {
                if (value instanceof Emulated_GlideElement && value.belongsToEmulatedRecord(this) && value.getName() === name)
                    this[name] = value;
                else
                    this[name] = new Emulated_GlideElement(this, value.toString(), name, this._labels[name]);
            } else
                this[name] = new Emulated_GlideElement(this, value, name, this._labels[name]);
        }
        protected __getElement(name: string): Emulated_GlideElement | undefined {
            if (typeof name === "string" && (name = name.trim()).length > 0) {
                let obj: any | null | undefined = this[name];
                let label: string;
                if (typeof obj !== "undefined") {
                    let result: Emulated_GlideElement | undefined;
                    if ((typeof obj === "object") && obj !== null && isGlideElement(obj)) {
                        if (obj instanceof Emulated_GlideElement && obj.belongsToEmulatedRecord(this) && obj.getName() === name)
                            label = (result = obj).getLabel();
                        else {
                            if (obj.getName() === name) {
                                let label: string = obj.getLabel();
                                if (typeof label === "string" && label.trim().length == 0)
                                    label = this._labels[name];
                            } else
                                label = this._labels[name];
                            result = new Emulated_GlideElement(this, null, name, (typeof label === "string") ? label : name);
                            this[name] = result;
                        }
                    } else {
                        label = this._labels[name];
                        result = new Emulated_GlideElement(this, obj, name, (typeof label === "string") ? label : name);
                        this[name] = result;
                    }
                    if (typeof this._labels[name] !== "string")
                        this._labels[name] = label;
                    return result;
                }
            }
        }
        getValue(name: string): string {
            let element: Emulated_GlideElement | undefined = this.__getElement(name);
            if (typeof element !== null)
                return element.toString();
        }
        canRead(): boolean { return true; }
        canWrite(): boolean { return false; }
        setValue(name: string, value: any): void {
            let element: Emulated_GlideElement | undefined = this.__getElement(name);
            if (typeof element !== null)
                element.setValue(value);
            else
                this.__addElement(name, value);
        }
        isNewRecord(): boolean { return false; }
    }
}
