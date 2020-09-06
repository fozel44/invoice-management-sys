import { HttpHeaders } from '@angular/common/http';

export const AuthUrl = "http://localhost:8080/oauth/token?grant_type=password";

export const BasicToken = {
    headers: new HttpHeaders(
      { "Authorization": "Basic ZW52aXlvOjEyMzQ1Ng==" }
    )
  };