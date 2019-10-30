import Result from '../models/result';

export default abstract class BaseController {
    public executeAction<T>(action): Result<T> {
        try {
            return action();
        } catch (error) {
            return new Result<T>(false, null, error);
        }
    }
}
