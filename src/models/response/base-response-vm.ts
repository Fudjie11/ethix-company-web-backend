import { ContextualError } from '../../shared/service/contextual-error';

export class BaseResponseVm<TData = any> extends ContextualError {
  success = true;
  data: TData;
}
