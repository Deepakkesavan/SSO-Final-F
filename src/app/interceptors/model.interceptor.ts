import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

// Functional HTTP interceptor to modify response data before it reaches subscribers
export const modelInterceptor: HttpInterceptorFn = (req, next) => {
  // Pass the request to the next interceptor or backend and handle the response observable
  const modifiedReq = req.clone({
    withCredentials: true,
  });
  return next(modifiedReq).pipe(
    map((httpResp: any) => {
      // httpResp represents the HttpResponse event from the server

      // Check if response has a body and if the body contains a 'result' property
      if (httpResp.body && httpResp.body.result !== undefined) {
        // Clone the HttpResponse, replacing the body with the value inside 'result'
        // This means only the model data will be returned to the caller, instead of the whole wrapper object
        console.log(
          'resposne from model intercepto........................-----------------------------------, ',
          httpResp
        );

        return httpResp.clone({ body: httpResp.body.result });
      }

      // If no 'result' property is present, return the response unchanged
      return httpResp;
    })
  );
};
