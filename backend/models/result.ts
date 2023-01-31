export default class Result<T> {

    public success: boolean;
    public value: T;
    public error: any;

    public constructor(success: boolean, value: T = null, error: any = null) {
        this.success = success;
        this.value = value;
        this.error = error;

    }
}
