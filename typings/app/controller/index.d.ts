// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSignin from '../../../app/controller/signin';
import ExportSignup from '../../../app/controller/signup';

declare module 'egg' {
  interface IController {
    signin: ExportSignin;
    signup: ExportSignup;
  }
}
